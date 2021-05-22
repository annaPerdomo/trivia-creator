import React from "react";
import Head from "next/head";
import Create from '../components/Create/Create';
import prisma from '../lib/prisma.ts';


export default function CreatePage({questions}) {
  const title =
    "Trivia Creator | Create trivia questions & answers and then play with a group | Trivia";
  const desc =
    "Trivia creator allows you to host trivia nights with your friends!";
  //You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
  //getting error above trying to change this
  // const image = require(`../public/testBrain.jpg`);
  // const url = "www.notsure.help";
  const keywords = "trivia";
  const robots = "index, follow";
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

      <Create questions={questions}/>
    </React.Fragment>
  );
}

export async function getServerSideProps() {
  const questions = await prisma.question.findMany({
    where: {
      triviaId: 1,
    }
  });
  return {
    props: { questions }, // will be passed to the page component as props
  }
}

