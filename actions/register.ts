"use server";
import {  RegisterSchema } from '@/schemas';
import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/token';
import { sendVerificationEmail } from '@/lib/mail';

export const register = async (values:z.infer<typeof RegisterSchema>) => {
    
    const validatedFields = RegisterSchema.safeParse(values);
    if(!validatedFields.success) {
        
        return {error: "Invalid Fields!"};
    }
    if(validatedFields.data.password !== validatedFields.data.confirmPassword) {
        return {error: "Password and Confirm Password does not match!"};
    }

    const {email,password,name} = validatedFields.data;

    try {
        const hashPassword = await bcrypt.hash(password, 10);

        const existingUser = await getUserByEmail(email);

        if(existingUser) {
            return {error: "User already exists!"}
        }

        await db.user.create({
            data: {
                email,
                passwordHash: hashPassword,
                name
            }
        })

        // Generate the verification token
        const verificationToken = await generateVerificationToken(email);
        console.log(verificationToken);
        // TODO: send verification email token
        await sendVerificationEmail(verificationToken?.email!, verificationToken?.token!);

        
        return {success: "Confirmation email sent!"};
    } catch (error) {
        
        return {error: "Something went wrong!"};
    }

}