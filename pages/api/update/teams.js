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
    const { newTeamId, originalTeamId, userId } = req.body
    if (originalTeamId) {
      const updateOldTeam = await prisma.team.update({
        where: {
          id: originalTeamId
        },
        data: {
          members: {
            disconnect: [{id: userId}]
          }
        }
      })
    }
    const updateNewTeam = await prisma.team.update({
      where: {
        id: newTeamId
      }, 
      data: {
        members: {
          connect: [{id: userId}]
        }
      }
    })
    res.json(updateNewTeam)
  } catch (err) {
    if (err) console.log(err)
  }
}