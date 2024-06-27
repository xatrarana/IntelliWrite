"use server";
import { DEFAULT_LOGIN_REDIRECT_URL } from '@/routes';
import { LoginSchema, RegisterSchema } from '@/schemas';
import { AuthError } from 'next-auth';
import { signIn } from '@/auth';
import * as z from 'zod';

export const login = async (values:z.infer<typeof LoginSchema>) => {
    
    const validatedFields = LoginSchema.safeParse(values);
    if(!validatedFields.success) {
        
        return {error: "Invalid Fields!"};
    }


    const {email, password} = validatedFields.data;

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

