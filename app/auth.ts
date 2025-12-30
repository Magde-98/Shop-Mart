import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/login"

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
                    } else {
                        return null;
                    }

                } catch (error) {
            
                    return null;
                }
            },

        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user?.user
                token.token = user?.token
            }
            return token
        },
        async session({ session, token }) {
            session.user = token?.user as {
                name: string,
                email: string,
                role: string
            }
            return session
        },
    }

};
