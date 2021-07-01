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
  const questions = await prisma.question.findMany({
    where: {
      triviaId: 1,
    }
  });
  return {
    props: { questions, session },
  }
}

type Props = {
  questions: CreateProps[]
}

const CreatePage: NextPage<Props> = ({ questions }) => {
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
          <CreateGame questions={questions}/>
        </React.Fragment>
      );
    } else {
      router.push('/')
    }
  }
  return null;
}

export default CreatePage
