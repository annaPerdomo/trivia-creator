import prisma from '../../../lib/prisma'
import Cors from 'cors'

const cors = Cors({
  origin: '*',
  methods: ['GET', 'POST', 'HEAD'],
});

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
    const { teamName, triviaId, userId } = req.body
    const newTeam = await prisma.team.create({
      data: {
        teamName,
        members: {
          connect: [{id: userId}]
        },
        triviaGames: {
          connect: [{id: triviaId}]
        }
      }
    })
    console.log({newTeam})
    res.json(newTeam)
  } catch (err) {
    if (err) {
      res.send(err)
    }
  }
}