import prisma from '../../../lib/prisma.ts';

export default async function handle(req, res) {
  try {
    const {
      content,
      correctAnswer,
      questionId,
      type,
    } = req.body;
    const updateQuestion = await prisma.question.update({
      where: {
        id: questionId
      },
      data: {
        content,
        type,
        correctAnswer,
      }
    })
    res.json(updateQuestion);
  } catch (err) {
    if (err) console.log(err);
  }
}
