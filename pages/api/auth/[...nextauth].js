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
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      console.log('💟💟💟💟', {token, user, account, profile, isNewUser})
      // Initial sign in
      if (account && user) {
        return {
          accessToken: account.accessToken,
          accessTokenExpires: Date.now() + account.expires_in * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session(session, token) {
      // console.log('before if token declaration', {session})
      console.log('❕❕before if token declaration', {token: token.user})
      console.log
      if (token) {
        session.user = token.user;
        session.accessToken = token.accessToken;
        session.error = token.error;
      }
      // console.log('❕❕❕❕❕❕', {token, tokenUser: token.user}, );
      // console.log('❗️❗️❗️❗️❗️❗️', {session});

      return session;
    },
  },
  secret: process.env.SECRET,
  database: process.env.DATABASE_URL,
})
