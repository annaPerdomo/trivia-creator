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
    const { triviaId } = req.body
    await runMiddleware(req, res, cors);
    const currentGamesTeams = await prisma.triviaGame.findUnique({
      where: {
        id: Number(triviaId)
      },
      include: {
        teams: {
          select: {
            members: true,
            teamName: true,
            id: true,
          }
        },
      }
    })
    res.send(currentGamesTeams)
  } catch (err) {
    if (err) {
      res.send(err)
    }
  }
}