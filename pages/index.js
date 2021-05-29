import React, {useState, useEffect} from 'react';
import { useSession, getSession } from 'next-auth/client'
import Head from 'next/head'
import Home from '../components/Home';


export default function HomePage() {
  const title =
    'Trivia Creator | Create trivia questions & answers and then play with a group | Trivia';
  const desc =
    'Trivia creator allows you to host trivia nights with your friends!';
  const url = 'www.notsure.help';
  const keywords = 'trivia';
  const robots = 'index, follow';
  // const [ session, loading ] = useSession();
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta content={desc} name="description" />
        <meta content={keywords} name="keywords" />
        <meta content={robots} name="robots" />
        {/*
        <meta content={title} property="og:title" />
        <meta content="website" property="og:type" />
        <meta content={url} property="og:url" />
        <meta content={desc} property="og:description" />
        <meta content={image} property="og:image" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="getjobfit.com" name="twitter:domain" />
        <meta content={title} name="twitter:title" />
        <meta content={desc} name="twitter:description" />
        <meta content={image} name="twitter:image" />
        <meta content={url} name="twitter:url" /> */}
      </Head>
      {/* <Home loading={loading} session={session}/> */}
      <Home loading={{}} session={{}}/>
    </React.Fragment>
  );
}

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       session: await getSession(context)
//     }
//   }
// }