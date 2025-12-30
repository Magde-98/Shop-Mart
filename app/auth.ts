import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import type { JWT } from "next-auth/jwt";
import type { Session, User } from "next-auth";

export const authOptions = {
  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },

      authorize: async (credentials) => {
        try {
          const response = await fetch(
            `${process.env.API}/api/v1/auth/signin`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          );

          const payload = await response.json();

          if (response.ok && payload.message === "success") {
            const decoded = jwtDecode<{ id: string }>(payload.token);

            return {
              id: decoded.id,
              user: payload.user,
              token: payload.token,
            };
          }

          return null;
        } catch {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user?: User;
    }) {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }
      return token;
    },

    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }) {
      session.user = token.user;
      return session;
    },
  },
};
