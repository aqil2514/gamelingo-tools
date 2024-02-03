import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { checkEmail, checkUser } from "@/lib/prisma/users";
import { supabase } from "@/lib/supabase";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      credentials: {
        username: { label: "Username" },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error("No credentials");

        const isThere = await supabase.from("userslogin").select("*").eq("username", credentials.username);
        if (!isThere || !isThere.data || isThere.data.length === 0) return null;

        const userData: Account.UsersLogin = isThere.data[0];
        const user: Account.User = {
          id: userData.id as string,
          name: userData.name as string,
          username: userData.username,
          email: userData.email,
          role: userData.role,
          image: userData.image as string,
        };

        if (!userData) return null;
        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        const isThere = await supabase
          .from("userslogin")
          .select("*")
          .eq("email", profile?.email);

        if (!isThere || !isThere.data || isThere.data.length === 0 || !isThere.data[0]) {
          await supabase.from("userslogin").insert([
            {
              name: profile?.name,
              image: profile?.image,
              email: profile?.email,
              oauthid: profile?.sub,
              role: "Pengguna",
              account_verified: true,
            },
          ]);
        }

        const userData: Account.UsersLogin = isThere.data![0];

        if (!userData.oauthid) {
          await supabase.from("userslogin").update({ oauthid: profile?.sub });
        }
      }
      return true;
    },
    async jwt(params) {
      let { token } = params;
      let user = params.user as Account.User;

      if (user) {
        return {
          ...token,
          role: user.role,
        };
      }
      return token;
    },
    async session(params) {
      let { session, token } = params;
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role,
        },
      };
    },
  },
  debug: process.env.NODE_ENV === "development",
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
