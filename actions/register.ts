"use server";
import {  RegisterSchema } from '@/schemas';
import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';

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


        // TODO: send verification email token
        return {success: "Email sent!"};
    } catch (error) {
        
        return {error: "Something went wrong!"};
    }

}