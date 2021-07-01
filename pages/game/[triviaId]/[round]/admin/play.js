import React from 'react';
import Head from 'next/head';
import PlayGame from '../../../../../src/components/PlayGame/PlayGame';
import prisma from '../../../../../lib/prisma.ts';

export default function AdminPlayPage({questions}) {
  const title =
    'Trivia Creator | Create trivia questions & answers and then play with a group | Trivia';
  const desc =
    'Trivia creator allows you to host trivia nights with your friends!';
  const keywords = 'trivia';
  const robots = 'index, follow';

  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta content={desc} name="description" />
        <meta content={keywords} name="keywords" />
        <meta content={robots} name="robots" />
      </Head>

      <PlayGame questions={questions}/>
    </React.Fragment>
  );
}

export async function getServerSideProps(context) {
  const roundParamString = context.params.round;
  const roundNum = Number(roundParamString.slice(roundParamString.length - 1));
  const questions = await prisma.question.findMany({
    where: {
      triviaId: 1,
      roundNum,
    },
  });
  return {
    props: { questions },
  }
}

