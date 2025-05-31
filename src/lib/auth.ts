import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    pages: {
        signIn: '/signin', // Optional: Custom sign-in page
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt", // ✅ very important for getToken() to work
    },
    callbacks: {
        async session({ token, session }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.sub
                }
            };
        }
    }
}