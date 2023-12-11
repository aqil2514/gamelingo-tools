import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { checkUser, checkEmail } from "@/lib/prisma/users";
import prisma from "@/lib/prisma/prisma";

async function OAuthHandler(profile) {
  const user = "Kamu siapa?";

  return console.log(user);
}

async function credentialsHandler(user) {
  return user;
}

async function syncHandler(user, profile) {
  if (user) {
    return await credentialsHandler(user);
  } else if (profile) {
    return await OAuthHandler(profile);
  }
}

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials, request) {
        const user = await checkUser(credentials.username);

        if (user.length === 0) {
          alert("User tidak terdaftar");
          return;
        }

        return user[0];
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile, user }) {
      console.log(profile);
      if (account.provider === "google") {
        const check = await checkEmail(profile.email);

        if (check.length === 0) {
          await prisma.usersLogin.create({
            data: {
              name: profile.name,
              email: profile.email,
              image: profile.picture,
              OAuthId: profile.sub,
            },
          });
        } else if (check.length === 1) {
          await prisma.usersLogin.update({
            where: {
              email: profile.email,
            },
            data: {
              image: profile.picture,
              OAuthId: profile.sub,
            },
          });
        }

        return profile.email_verified;
      }
      return true;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
