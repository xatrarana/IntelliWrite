"use server";

import { auth } from "@/auth";
import { getUserByUsername } from "@/data/user";
import { db } from "@/lib/db";
import { UserNameSchema } from "@/schemas";
import * as z from 'zod';

export const addUsername = async (values: z.infer<typeof UserNameSchema>) => {
    const session = await auth();
    const validatedFields = UserNameSchema.safeParse(values);
    if(!validatedFields.success) {
        
        return {error: "Invalid Fields!"};
    }
    try {
        const userId = session?.user?.id;
       const isUserNameExist = await getUserByUsername(validatedFields.data.username);
         if(isUserNameExist) {
              return {error: "Username already exists!"}
         }

        await db.user.update({
            where: { id: userId },
            data: {
                username: validatedFields.data.username
            }
        })
         return {success: true}
    } catch (error) {
        return {error: "Something went wrong!"};
    }
}