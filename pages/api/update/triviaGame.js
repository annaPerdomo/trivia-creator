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
    const { triviaId } = req.body
    const updatedTriviaGame = await prisma.triviaGame.update({
      where: {
        id: triviaId
      },
      data: {
        playedAt: new Date()
      }
    })
    res.json(updatedTriviaGame)
  } catch (err) {
    if (err) console.log(err)
  }
}