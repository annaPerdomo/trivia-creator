import * as React from 'react'
import Head from 'next/head'
import { signIn, getSession } from 'next-auth/client'
import PlayGame from '../../../../src/components/PlayGame/PlayGame'
import prisma from '../../../../lib/prisma'

export async function getServerSideProps(context) {
  const session = await getSession(context)
  const userIsNotLoggedIn = !session?.user
  if (userIsNotLoggedIn) {
    return {
      props: {
        session: null, 
        questions: []
      }
    }
  } else {
    const {joinCode, round} = context.params;
    const roundNum = Number(round.slice(round.length - 1));
    const triviaGame = await prisma.triviaGame.findUnique({
      where: {
        joinCode
      }
    })
    const currentGameId = triviaGame.id;
    const fetchedQuestions = await prisma.question.findMany({
      where: {
        triviaId: currentGameId,
        roundNum
      },
    });
    if (fetchedQuestions) {
      const questions = fetchedQuestions.map(question => {
        if (question?.answers?.submittedAt) {
          return {
            ...question, 
            submittedAt: question.answers.submittedAt.toString()
          }
        } else {
          return {
            ...question
          }
        }
      })
      return {
        props: { session, questions },
      }
    } else {
      return {
        props: { session, questions: [] }
      }
    }
  }
}

export default function PlayRound(props) {
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
    
          <PlayGame {...props}/>
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
}

