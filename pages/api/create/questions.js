import prisma from '../../../lib/prisma.ts';
import Cors from 'cors';

const cors = Cors({
  origin: '*',
  methods: ['GET', 'POST', 'HEAD'],
})

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handle(req, res) {
  try {
    await runMiddleware(req, res, cors);
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
    res.json(newQuestion);
  } catch (err) {
    if (err) console.log(err);
  }
}