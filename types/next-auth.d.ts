import NextAuth, { DefaultSession, User as NextAuthUser } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: string;
    username?: string;
  }

  interface Session {
    user: {
      id: string;
      role: string;
      username?: string;
    } & DefaultSession["user"];
  }
}
