import { getSession } from 'next-auth/client'

export async function userSessionIfLoggedIn(context) {
  const session = await getSession(context)
  if (session?.user) {
    return session
  } else {
    return null
  }
}

export async function getTriviaIdFromJoinCode(joinCode, prisma) {
  try {
    const triviaGame = await prisma.triviaGame.findUnique({
      where: {
        joinCode
      }
    })
    const currentGameId = triviaGame.id;
    return currentGameId;
  } catch (err) {
    if (err) console.log(err)
  }
}

//not needed until answers are needed
function convertAnswersSubmittedAtPropertyToString(fetchedQuestions) {
  return fetchedQuestions.map(question => {
    if (question?.answers?.submittedAt) {
      return {
        ...question, 
        submittedAt: question.answers.submittedAt.toString()
      }
    } else {
      return {
        ...question
      }
    }
  })
}
export async function getQuestionsForCurrentRound(triviaGameId, roundNum, prisma) {
  try {
    const fetchedQuestions = await prisma.question.findMany({
      where: {
        triviaId: triviaGameId,
        roundNum
      },
    });
    if (fetchedQuestions) {
      return fetchedQuestions;
    } else {
      return [];
    }
  } catch(err) {
    if (err) console.log(err)
  }
}