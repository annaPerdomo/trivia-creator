import prisma from '../../../lib/prisma.ts';

export default async function handle(req, res) {
  try {
    const {
      roundNum,
      questionNum,
      content,
      type,
      correctAnswer
    } = req.body;
    if (roundNum && questionNum === 1) {
      const result = await prisma.triviaGame.create({
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
      res.json(result);
    } else {
      const result = await prisma.question.create({
        data: {
          roundNum,
          questionNum,
          content,
          type,
          correctAnswer,
          trivia: { connect: { id: 3 } },
        },
      });
      res.json(result);
    }
  } catch (err) {
    if (err) console.log(err);
  }
}