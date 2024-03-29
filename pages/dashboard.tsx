// @ts-check
import * as React from 'react'
import { useSession, getSession } from 'next-auth/client'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Dashboard from '../src/components/Dashboard/Dashboard'
import { useRouter } from 'next/router'
import prisma from '../lib/prisma'
import type { Session } from "next-auth";

export interface DraftGames {
  createdAt: number,
  hostId: number,
  id: number,
  joinCode: string,
  playedAt: null,
  roundAmount: number | null,
}

export interface DashboardProps {
  draftGames: DraftGames[],
  session: Session | null,
}


export const getServerSideProps: GetServerSideProps<{
  session: Session | null
}> = async (context) => {
  const session = await getSession(context)
  const userIsNotLoggedIn = !session?.user
  if (userIsNotLoggedIn) {
    return {
      props: {
        session: null, 
        draftGames: []
      }
    }
  } else {
    const userId = Number(session.user.id);
    const getDraftGames = await prisma.triviaGame.findMany({  
      where: {
        hostId: userId,
        playedAt: null,
      }
    })
    const draftGames = getDraftGames.map(game => {
      return {
        ...game,
        createdAt: game.createdAt.toString()
      };
    });
    return {
      props: { session, draftGames }
    }
  }
}

const DashboardPage: NextPage<DashboardProps> = (props) => {
  const router = useRouter();
  const title =
    'Trivia Creator | Create trivia questions & answers and then play with a group | Trivia';
  const desc =
    'Trivia creator allows you to host trivia nights with your friends!';
  const url = 'www.notsure.help';
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
          <Dashboard {...props} />
        </React.Fragment>
      );
    } else {
      router.push('/')
    }
  }
  return null;
}

export default DashboardPage