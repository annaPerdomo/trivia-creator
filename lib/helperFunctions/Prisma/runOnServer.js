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

function convertCreatedAtPropertyToString(triviaGame) {
  Object.keys(triviaGame).forEach(key => {
    if (key === 'createdAt') {
      triviaGame[key] = triviaGame[key].toString()
    }
  })
  return triviaGame
}


export async function getTriviaGameFromJoinCode(joinCode, prisma) {
  try {
    const triviaGame = await prisma.triviaGame.findUnique({
      where: {
        joinCode
      }
    })
    if (triviaGame) {
      const formattedTriviaGame = convertCreatedAtPropertyToString(triviaGame)
      return formattedTriviaGame
    } else {
      return {}
    }
  } catch (err) {
    if (err) console.log(err)
  }
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

function convertSubmittedAtPropertyToString(fetchedQuestions) {
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

export async function getAllQuestionsAndAnswers(triviaGameId, prisma) {
  const fetchedQuestions = await prisma.question.findMany({
    where: {
      triviaId: triviaGameId,
    },
    include: {
      answers: true
    }
  });
  if (fetchedQuestions) {
    const questionsWithFormattedAnswers = convertSubmittedAtPropertyToString(fetchedQuestions)
    return questionsWithFormattedAnswers;
  } else {
    return []
  }
}

export async function getQuestionsAndAnswersForCurrentRound(triviaGameId, roundNum, prisma) {
  try {
    const fetchedQuestions = await prisma.question.findMany({
      where: {
        triviaId: triviaGameId,
        roundNum
      },
      include: {
        answers: true
      }
    });
    if (fetchedQuestions) {
      const questionsWithFormattedAnswers = convertSubmittedAtPropertyToString(fetchedQuestions)
      return questionsWithFormattedAnswers;
    } else {
      return []
    }
  } catch (err) {
    if (err) console.log(err)
  }
}