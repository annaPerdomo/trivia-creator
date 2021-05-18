import prisma from '../../../lib/prisma.ts';

export default async function handle(req, res) {
  try {
    const {
      content,
      correctAnswer,
      questionNum,
      roundNum,
      type,
    } = req.body;
    const newTriviaGame = await prisma.triviaGame.create({
      data: {
        hostId: 1,
        roundAmount: 5,
        questions: {
          create: [
            {
              roundNum,
              questionNum,
              content,
              type,
              correctAnswer,
            },
          ],
        },
      },
    });
    res.json(newTriviaGame);
  } catch (err) {
    if (err) console.log(err);
  }
}