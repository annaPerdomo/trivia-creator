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
      questions,
      triviaId,
    } = req.body;

    //const questions = [
    //   {
    //     questionNum: 1,
    //     content, 
    //     type, 
    //     correctAnswer
    //   },
    //   {
    //     questionNum: 2,
    //     content, 
    //     type, 
    //     correctAnswer
    //   },
    // ]
    const newQuestion = await prisma.round.create({
      data: {
        trivia: { connect: { id: triviaId } },
        questions: {
          create: questions
        }
      },
    });
    res.json(newQuestion);
  } catch (err) {
    if (err) console.log(err);
  }
}