import credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

import { LoginSchema } from "./schemas"
import { getUserByEmail } from "./data/user"
import github from "next-auth/providers/github"
import google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"

export default { 
    providers: [
        credentials({
        async authorize(credentials){
            try {
                const validatedFields =  LoginSchema.safeParse(credentials);

                if(!validatedFields.success) return null;

                const user = await getUserByEmail(validatedFields.data.email);
                if(!user || !user.passwordHash)return null;


                const isValidPassword = await verifyPasswordhash(validatedFields.data.password,user.passwordHash);
                if(!isValidPassword) return null;

                return user;
            } catch (error) {
                return null;
            }
        }
    }),

    github({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
    google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
] 
} satisfies NextAuthConfig


/**
 * This method is used to verify the password hash
 * @param password 
 * @param hash 
 * @returns {Promise<boolean>}
 */
export const verifyPasswordhash = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
}