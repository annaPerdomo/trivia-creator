import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import Adapters from 'next-auth/adapters';
import prisma from '../../../lib/prisma.ts';

// const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)
// export default authHandler

// const options = {
//   providers: [
//     Providers.GitHub({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//   ],
//   adapter: Adapters.Prisma.Adapter({ prisma }),
//   secret: process.env.SECRET,
// }

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    // ...add more providers here
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
  // A database is optional, but required to persist accounts in a database
  //database: process.env.DATABASE_URL,
  // secret: process.env.SECRET,
})