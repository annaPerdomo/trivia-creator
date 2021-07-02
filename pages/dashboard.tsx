// @ts-check
import * as React from 'react'
import { useSession, getSession } from 'next-auth/client'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import safeJsonStringify from 'safe-json-stringify';
import Dashboard from '../src/components/Dashboard/Dashboard'
import { useRouter } from 'next/router'
import prisma from '../lib/prisma'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session.user.id) {
    return {
      session: null, 
      draftGames: [],
      joinCode: undefined
    }
  }
  const userId = Number(session.user.id);
  console.log('🔦🔦🔦', {session, userId})
  const getDraftGames = await prisma.triviaGame.findMany({  
    where: {
      hostId: userId,
      playedAt: null,
    }
  })
  const parsedDraftGames = safeJsonStringify(getDraftGames);
  const draftGames = JSON.parse(parsedDraftGames);
  return {
    props: { session, draftGames }
  }
}

const DashboardPage: NextPage = ({draftGames}) => {
  const [ session, loading ] = useSession();
  const router = useRouter();
  const title =
    'Trivia Creator | Create trivia questions & answers and then play with a group | Trivia';
  const desc =
    'Trivia creator allows you to host trivia nights with your friends!';
  const url = 'www.notsure.help';
  const keywords = 'trivia';
  const robots = 'index, follow';

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
          <Dashboard draftGames={draftGames}/>
        </React.Fragment>
      );
    } else {
      router.push('/')
    }
  }
  return null;
}

export default DashboardPage