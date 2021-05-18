import prisma from '../../../lib/prisma.ts';

export default async function handle(req, res) {
  try {
    const {
      content,
      correctAnswer,
      questionNum,
      roundNum,
      triviaId,
      type,
    } = req.body;
    const newQuestion = await prisma.question.create({
      data: {
        roundNum,
        questionNum,
        content,
        type,
        correctAnswer,
        trivia: { connect: { id: triviaId } },
      },
    });
    console.log('newQuestion', JSON.stringify(newQuestion))
    res.json(newQuestion);
  } catch (err) {
    if (err) console.log(err);
  }
}