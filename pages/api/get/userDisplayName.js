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
      user
    } = req.body;
    const userDisplayName = await prisma.user.findUnique({
      where: {
        id: user.id
      },
      select: {
        displayName: true
      }
    });
    console.log({userDisplayName})
    res.json(userDisplayName);
  } catch (err) {
    if (err) console.log(err);
  }
}