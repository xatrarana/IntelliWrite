import NextAuth from "next-auth"
import { db } from "@/lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "@/auth.config"
import { checkUserHasUsername, getUserById } from "@/data/user"



export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  // events are similar to callbacks logs or sideeffects 
  // were are interested in linkAccount so when ever user login or sign up with account we want to change the email verified
  events: {
    async linkAccount({ user}) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date(), IsFirstLogin: false }
      })
    },

  },
  //callbacks 
  callbacks: {
    async signIn({ user,account}) {
      // Allow OAuth without email verification
      if(account?.provider !== "credentials") return true;
      const existingUser = await getUserById(user.id as string);

      // prevent login if user is not verified
      if (!existingUser || !existingUser.emailVerified) return false;
      // TODO 2FA cehck

      // set first login to the false
      await db.user.update({
        where: { id: user.id },
        data: { IsFirstLogin: false }
      })
      return true;
    },


    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      // check if user has username
     
      return session;
    },
    async jwt({ token }) {
      return token
    },
  }
})

// before extednding sesison
// we have to modify jwt