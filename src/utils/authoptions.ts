import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/lib/supabase";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { Adapter } from "next-auth/adapters";
import { AuthOptions, User } from "next-auth";
import { User as MongoUser } from "@/models/General/User";

export const authOptions: AuthOptions = {
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
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  }) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        const isThere = await supabase.from("userslogin").select("*").eq("email", profile?.email);

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
            await MongoUser.create({
              name: profile?.name,
              username: "Belum Disetting",
              avatar: profile?.image,
              post: [],
            }),
          ]);
        }

        const userData: Account.UsersLogin = isThere.data![0];

        if (!userData.oauthid) {
          await supabase.from("userslogin").update({ oauthid: profile?.sub }).eq("email", userData.email);
        }
      }
      return true;
    },
    async jwt(params) {
      let { token, profile, account } = params;
      let user = params.user as Account.User;

      if (account?.provider === "credentials") {
        if (user) {
          return {
            ...token,
            role: user.role,
            id: user.id,
          };
        }
      }
      if (account?.provider === "google") {
        const isThere = await supabase.from("userslogin").select("*").eq("email", profile?.email);
        if (!isThere || !isThere.data || isThere.data.length === 0 || !isThere.data[0]) throw new Error("Ooppss. Something error");

        const userData: Account.UsersLogin = isThere.data![0];
        return {
          ...token,
          username: userData.username,
          image: userData.image,
          id: userData.id,
          role: userData.role,
          name: userData.name,
          email: userData.email,
        };
      }
      return token;
    },
    async session(params) {
      let { session, token } = params;
      interface BuildInUser extends User {
        role: string;
        id: string;
      }

      session = {
        ...session,
        user: {
          ...session.user,
          role: token.role,
          id: token.id,
        } as BuildInUser,
      };

      return session;
    },
  },
};
