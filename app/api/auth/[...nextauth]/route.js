import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { checkUser, checkEmail } from "@/lib/prisma/users";

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

        user[0].name = user[0].username;
        user[0].fullName = user[0].name;

        return user[0];
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        return profile.email_verified;
      }
      return true;
    },
    async jwt({ token, account, profile, user }) {
      //   token.id = profile.id;
      if (account) {
        token.accessToken = account.access_token;
      }

      const email = await checkEmail(profile?.email || user?.email);

      if (profile && email) {
        token.username = email[0]?.username;
      }

      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      session.user.username = token.username;

      // console.log(token);
      // console.log(session);
      // console.log(user);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
