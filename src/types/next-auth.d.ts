// src/types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      /** ID i përdoruesit nga JWT callback */
      id: string;
      /** role: "ADMIN" | "SUPERADMIN" */
      role: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    /** Kur krijohet user te authorize, NextAuth e merge me JWT */
    id: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    /** i sapo-ngarkuar në jwt callback */
    id: string;
    role: string;
  }
}
