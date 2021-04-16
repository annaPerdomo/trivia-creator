import React from "react";
import Head from "next/head";
import WaitBetweenRounds from '../components/WaitBetweenRounds';


export default function WaitPage() {
  const title =
    "Trivia Creator | Create trivia questions & answers and then play with a group | Trivia";
  const desc =
    "Trivia creator allows you to host trivia nights with your friends!"
  const keywords = "trivia";
  const robots = "index, follow";

  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta content={desc} name="description" />
        <meta content={keywords} name="keywords" />
        <meta content={robots} name="robots" />
      </Head>

    <WaitBetweenRounds/>
    </React.Fragment>
  );
}
