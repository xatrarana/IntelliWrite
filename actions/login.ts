"use server";
import { DEFAULT_LOGIN_REDIRECT_URL } from '@/routes';
import { LoginSchema } from '@/schemas';
import { AuthError } from 'next-auth';
import { signIn } from '@/auth';
import * as z from 'zod';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/token';
import { sendVerificationEmail } from '@/lib/mail';

export const login = async (values:z.infer<typeof LoginSchema>) => {
    
    const validatedFields = LoginSchema.safeParse(values);
    if(!validatedFields.success) {
        
        return {error: "Invalid Fields!"};
    }


    const {email, password} = validatedFields.data;

    const existingUser = await getUserByEmail(email);
    if(!existingUser || !existingUser.email || !existingUser.passwordHash) {
        return {error: "No associated account found!"};
    }

    if(!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email);
        await sendVerificationEmail(verificationToken?.email!, verificationToken?.token!);
        return {success: "Email not verified! Confirmation email sent!"};
    }

    try {

       await signIn("credentials",{
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT_URL,
            redirect: true
        })
    } catch (error) {
        if(error instanceof AuthError) {
            switch(error.type){
                case "CredentialsSignin": 
                    return {error: "Invalid Credentials!"};
                case "CallbackRouteError": 
                    return {error: "Unable to Login! Re-check your credentials!"};
                default: 
                    return {error: "Something went wrong!"}
            }
        }
        throw error;
    }
    
}

