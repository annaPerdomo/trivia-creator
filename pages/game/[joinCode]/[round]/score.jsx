import * as React from 'react'
import Head from 'next/head';
import { signIn } from 'next-auth/client'
import ScoreAnswers from '../../../../src/components/PlayGame/Host/ScoreAnswers';
import prisma from '../../../../lib/prisma'
import {
  getQuestionsAndAnswersForCurrentRound, 
  getTriviaGameFromJoinCode,
  getTriviaIdFromJoinCode, 
  userSessionIfLoggedIn
} from '../../../../lib/helperFunctions/Prisma/runOnServer'

export async function getServerSideProps(context) {
  const { joinCode, round } = context.params;
  const session = await userSessionIfLoggedIn(context);
  const triviaGame = await getTriviaGameFromJoinCode(joinCode, prisma);
  const triviaGameId = triviaGame.id;
  const roundNum = Number(round.slice(round.length - 1));
  console.log(session);
  if (Number(session?.user?.id) === Number(triviaGame.hostId)) {
    const questions = await getQuestionsAndAnswersForCurrentRound(
      triviaGameId,
      roundNum,
      prisma
    );
    return {
      props: { session, questions, triviaGame },
    };
  } else {
    return {
      redirect: {
        destination: `/game/${joinCode}/round-${roundNum}/overview`,
        permanent: false,
      },
    };
  }
}

export default function HostScorePage(props) {
  const title =
    'Trivia Creator | Create trivia questions & answers and then play with a group | Trivia';
  const desc =
    'Trivia creator allows you to host trivia nights with your friends!';
  const keywords = 'trivia';
  const robots = 'index, follow';

  const pageIsLoadedOnClient = typeof window !== 'undefined';
  const userIsLoggedIn = props.session ? true : false;
  
  if (pageIsLoadedOnClient) {
    if (userIsLoggedIn) {      
      return (
        <React.Fragment>
          <Head>
            <title>{title}</title>
            <meta content={desc} name="description" />
            <meta content={keywords} name="keywords" />
            <meta content={robots} name="robots" />
          </Head>
    
          <ScoreAnswers {...props} />
        </React.Fragment>
      );
    } else {
      return (
        <div>
          <button onClick={() => signIn()}>Sign in</button>
        </div>
      );
    }
  }
  return null;
}

