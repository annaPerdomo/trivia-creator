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

const getFourLetterRandomString = () => {
  let text = "";
  const charset = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < 4; i++) {
    text += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return text;
}

export default async function handle(req, res) {
  try {
    await runMiddleware(req, res, cors);
    const { userId } = req.body
    const hostId = Number(userId);
    const newTriviaGame = await prisma.triviaGame.create({
      data: {
        hostId,
        joinCode: getFourLetterRandomString(),
      },
    })
    res.json(newTriviaGame);
  } catch (err) {
    if (err) {
      if (err.code === 'P2002') {
        definedJoinCode = getFourLetterRandomString();
        return await handle(req, res)
      } else {
        res.send(err);
      }
    };
  }
}