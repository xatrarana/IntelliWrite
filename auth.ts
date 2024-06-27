import NextAuth from "next-auth"
import { db } from "./lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { getUserById } from "./data/user"


export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
    pages:{
      signIn:"/auth/login",
      error: "/auth/error",
    },
    // events are similar to callbacks logs or sideeffects 
    // were are interested in linkAccount so when ever user login or sign up with account we want to change the email verified
    events: {
      async linkAccount({user}) {
          await db.user.update({
            where: { id: user.id },
            data: { emailVerified: new Date() }
          })
      }
    },
  //callbacks 
  callbacks: {
    // async signIn({user}){
    //   const userFromDb = await getUserById(user.id as string);
    //   if(!userFromDb || !userFromDb.emailVerified){
    //     return false;
    //   }
    //   return true;
    // },

    
    async session({session, token}){
      if(token.sub && session.user){
        session.user.id = token.sub
      }
      return session;
    },
    async jwt({token}){
      return token
    },
  }
})

// before extednding sesison
// we have to modify jwt