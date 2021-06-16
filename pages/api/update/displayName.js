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
    const {displayName, userId} = req.body;
    const updateDisplayName = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        displayName
      }
    })
    console.log({updateDisplayName});
    res.json(updateDisplayName);
  } catch (err) {
    if (err) console.log(err);
  }
}
