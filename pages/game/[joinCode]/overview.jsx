import * as React from 'react'
import Head from 'next/head'
import { signIn } from 'next-auth/client'
import RoundOverview from '../../../src/components/PlayGame/RoundOverview/RoundOverview'
import WaitBetweenRounds from '../../../src/components/PlayGame/RoundOverview/WaitBetweenRounds'
import prisma from '../../../lib/prisma'
import {
  getAllQuestionsAndAnswers,
  getTriviaIdFromJoinCode,
  userSessionIfLoggedIn
} from '../../../lib/helperFunctions/Prisma/runOnServer'

export async function getServerSideProps(context) {
  const {joinCode} = context.params;
  const session = await userSessionIfLoggedIn(context)
  const triviaGameId = await getTriviaIdFromJoinCode(joinCode, prisma);
  const questions = await getAllQuestionsAndAnswers(triviaGameId, prisma)
  return {
    props: { session, questions }
  }
}

export default function GameOverviewPage(props) {
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
          <RoundOverview {...props} />
          {/* <WaitBetweenRounds /> */}
        </React.Fragment>
      );
    } else {
      return (
        <div>
          <button onClick={() => signIn()}>Sign in</button>
        </div>
      )
    }
  }
  return null;
}

