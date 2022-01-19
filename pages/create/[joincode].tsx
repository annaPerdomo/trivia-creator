// @ts-check
import * as React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { useSession, getSession } from "next-auth/client";
import { useRouter } from "next/router";
import Head from "next/head";
import CreateGame from "../../src/components/CreateGame/CreateGame";
import { QuestionType } from "../../src/redux/reducers/createGameSlice";
import prisma from "../../lib/prisma";
import type { Session } from "next-auth";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const joinCode = context.params.joincode;
  if (joinCode === "undefined") {
    return {
      props: {
        joinCode: null,
      },
    };
  }
  const joinGameCode = Array.isArray(joinCode) ? joinCode[0] : joinCode;
  const triviaGame = await prisma.triviaGame.findUnique({
    where: {
      joinCode: joinGameCode,
    },
  });
  const currentGameId = triviaGame.id;

  const roundsAndQuestions = await prisma.round.findMany({
    where: {
      triviaId: Number(currentGameId),
    },
    include: {
      questions: true,
    },
  });
  return {
    props: {
      currentGameId,
      joinCode,
      roundsAndQuestions,
      session,
    },
  };
};
interface RoundsAndQuestions {
  id: number;
  roundNum: number;
  hasBeenScored: Boolean;
  triviaId: number;
  bonusPoints: string | null;
  questions: QuestionType[];
}

type Props = {
  currentGameId: string;
  joinCode: string;
  roundsAndQuestions: RoundsAndQuestions[];
  session: Session;
};

const CreatePage: NextPage<Props> = (props) => {
  const { session } = props;
  const router = useRouter();
  const title =
    "Trivia Creator | Create trivia questions & answers and then play with a group | Trivia";
  const desc =
    "Trivia creator allows you to host trivia nights with your friends!";
  const keywords = "trivia";
  const robots = "index, follow";

  const pageIsLoadedOnClient = typeof window !== "undefined";
  const userIsLoggedIn = session ? true : false;
  const joinCodeErrorThrown = props.joinCode === null;

  if (pageIsLoadedOnClient) {
    if (joinCodeErrorThrown) {
      router.push("/dashboard");
    } else {
      if (userIsLoggedIn) {
        return (
          <React.Fragment>
            <Head>
              <title>{title}</title>
              <meta content={desc} name="description" />
              <meta content={keywords} name="keywords" />
              <meta content={robots} name="robots" />
            </Head>
            <CreateGame {...props} />
          </React.Fragment>
        );
      } else {
        router.push("/");
      }
    }
  }
  return null;
};

export default CreatePage;
