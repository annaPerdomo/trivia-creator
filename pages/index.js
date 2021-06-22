import React, {useState, useEffect} from 'react';
import { useSession, getSession } from 'next-auth/client'
import Head from 'next/head'
import Home from '../components/Home/Home';
import { useRouter } from 'next/router';


export default function HomePage() {
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
      router.push('/dashboard');
    } else {
      return (
        <React.Fragment>
          <Head>
            <title>{title}</title>
            <meta content={desc} name="description" />
            <meta content={keywords} name="keywords" />
            <meta content={robots} name="robots" />
          </Head>
          <Home />
        </React.Fragment>
      );
    }
  }
  return null;
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: { session }
  }
}