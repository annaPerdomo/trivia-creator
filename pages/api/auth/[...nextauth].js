import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import Adapters from 'next-auth/adapters';
import prisma from '../../../lib/prisma.ts';

const GOOGLE_AUTHORIZATION_URL =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    prompt: "consent",
    access_type: "offline",
    response_type: "code",
  });

  async function refreshAccessToken(token) {
    console.log("top of refreshAccessToken")
    try {
      const url =
        "https://oauth2.googleapis.com/token?" +
        new URLSearchParams({
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          grant_type: "refresh_token",
          refresh_token: token.refreshToken,
        });

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "POST",
      });

      const refreshedTokens = await response.json();

      if (!response.ok) {
        throw refreshedTokens;
      }

      return {
        ...token,
        accessToken: refreshedTokens.access_token,
        accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
        refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
      };
    } catch (error) {
      console.log(error);

      return {
        ...token,
        error: "RefreshAccessTokenError",
      };
    }
  }

export default NextAuth({
  providers: [
    Providers.Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl: GOOGLE_AUTHORIZATION_URL,
    })
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
  secret: process.env.SECRET,
  database: process.env.DATABASE_URL,
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60
  },
  jwt: {
  },
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      if (Date.now() > token.accessTokenExpires) {
        return refreshAccessToken(token);
      } else {
        return token;
      }
    },
    async session(session, token) {
      session.user.id = token.sub;
      if (token.accessToken) {
        session.accessToken = token.accessToken;
        session.accessTokenExpires = token.accessTokenExpires;
        session.refreshToken = token.refreshToken;
      }
      return session;
    },
  },
  debug: true,
})

