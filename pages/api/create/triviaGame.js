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

function getFourLetterRandomString() {
  let text = "";

  const charset = "abcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < 4; i++)
    text += charset.charAt(Math.floor(Math.random() * charset.length));

  return text;
}

export default async function handle(req, res) {
  try {
    await runMiddleware(req, res, cors);
    const newTriviaGame = await prisma.triviaGame.create({
      data: {
        hostId: 1,
        joinCode: getFourLetterRandomString(),
      },
    })
    res.json(newTriviaGame);
  } catch (err) {
    if (err) console.log(err);
  }
}