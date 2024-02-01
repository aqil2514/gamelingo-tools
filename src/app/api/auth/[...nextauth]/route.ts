import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { checkEmail, checkUser } from "@/lib/prisma/users";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error("No credentials");

        const isUser = await checkUser(credentials.username);

        const user = isUser[0];

        if (!isUser) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, credentials }) {
      if (account?.provider === "google") {
        const isThere = await checkEmail(user.email as string);
        if (!isThere[0]) {
          return false;
        }

        user = isThere[0];
      }
      //   console.log("user:", user);
      //   console.log("account:", account);
      //   console.log("credentials:", credentials);
      return true;
    },
  },
});

export { handler as GET, handler as POST };

// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { checkUser, checkEmail } from "@/lib/prisma/users";
// import prisma from "@/lib/prisma/prisma";
// import User from "@/models/Evertale/Users";
// import connectMongoDB from "@/lib/mongoose";

// const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID ?? "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
//       authorization: {
//         params: {
//           prompt: "consent",
//           access_type: "offline",
//           response_type: "code",
//         },
//       },
//     }),
//     CredentialsProvider({
//       name: "credentials",
//       async authorize(credentials) {
//         const user = await checkUser(credentials.username);

//         if (user.length === 0) {
//           alert("User tidak terdaftar");
//           return;
//         }

//         return user[0];
//       },
//     }),
//   ],
//   callbacks: {
//     async signIn({ account, profile, user }) {
//       if (account.provider === "google") {
//         await connectMongoDB();
//         const check = await checkEmail(profile.email);
//         const mongoCheck = await User.findOne({ email: profile.email });

//         if (!mongoCheck) {
//           await User.create({
//             name: profile.name,
//             email: profile.email,
//             avatar: profile.picture,
//             username: "Unsetting",
//           });
//         } else if (mongoCheck) {
//           await User.findOneAndUpdate({ email: profile.email }, { avatar: profile.image });
//         }
//         if (check.length === 0) {
//           await prisma.usersLogin.create({
//             data: {
//               name: profile.name,
//               email: profile.email,
//               image: profile.picture,
//               OAuthId: profile.sub,
//             },
//           });
//         } else if (check.length === 1) {
//           await prisma.usersLogin.update({
//             where: {
//               email: profile.email,
//             },
//             data: {
//               image: profile.picture,
//               OAuthId: profile.sub,
//             },
//           });
//         }

//         return profile.email_verified;
//       }
//       return true;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         return {
//           ...token,
//           id: user.id,
//         };
//       }

//       console.log("Jwt Callback", token);

//       return token;
//     },
//     async session({ session, token }) {
//       session.user.id = token.id;
//       console.log("Session callback", session);
//       return { ...session, user: { ...session.user, id: token.id } };
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: "jwt",
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
