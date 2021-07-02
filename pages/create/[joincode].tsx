// @ts-check
import * as React from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import { useSession, getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Head from "next/head";
import CreateGame, {CreateProps} from '../../src/components/CreateGame/CreateGame';
import prisma from '../../lib/prisma';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const {joinCode} = context.params;
  const joinGameCode = Array.isArray(joinCode) ? joinCode[0] : joinCode;
  const triviaGame = await prisma.triviaGame.findUnique({
    where: {
      joinCode: joinGameCode
    }
  })
  const currentGameId = triviaGame.id;
  const questions = await prisma.question.findMany({
    where: {
      triviaId: currentGameId,
    }
  });
  return {
    props: { 
      questions, 
      session,
      currentGameId 
    },
  }
}

type Props = {
  questions: CreateProps[],
  currentGameId: string
}

const CreatePage: NextPage<Props> = ({ questions, currentGameId }) => {
  const [ session, loading ] = useSession()
  const router = useRouter()
  const title =
    "Trivia Creator | Create trivia questions & answers and then play with a group | Trivia";
  const desc =
    "Trivia creator allows you to host trivia nights with your friends!";
  const keywords = "trivia";
  const robots = "index, follow";

  const pageIsLoadedOnClient = typeof window !== 'undefined';
  const userIsLoggedIn = session ? true : false;

  const createGameProps = {
    questions: questions,
    currentGameId: currentGameId
  }

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
          <CreateGame {...createGameProps}/>
        </React.Fragment>
      );
    } else {
      router.push('/')
    }
  }
  return null;
}

export default CreatePage

