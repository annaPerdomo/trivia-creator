import * as React from 'react'
// import type { GetServerSideProps, NextPage } from 'next'
import { signIn } from 'next-auth/client'
import Head from 'next/head'
import RoundOverview from '../../../../src/components/RoundOverview/RoundOverview'
import prisma from '../../../../lib/prisma'
import {
  getQuestionsAndAnswersForCurrentRound,
  getTriviaIdFromJoinCode,
  userSessionIfLoggedIn
} from '../../../../lib/helperFunctions/Prisma/runOnServer'

export async function getServerSideProps(context) {
  const {joinCode, round} = context.params;
  const session = await userSessionIfLoggedIn(context)
  const triviaGameId = await getTriviaIdFromJoinCode(joinCode, prisma);
  const roundNum = Number(round.slice(round.length - 1));
  const questions = await getQuestionsAndAnswersForCurrentRound(triviaGameId, roundNum, prisma);
  return {
    props: { session, questions },
  }
}

export default function RoundOverviewPage(props) {
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

