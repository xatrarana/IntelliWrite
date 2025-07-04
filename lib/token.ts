import {v4 as uuidv4} from 'uuid';
import { db } from './db';

import { getVerificationTokenByEmail } from '@/data/verification-token';
export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);


    try {
        const existingToken = await getVerificationTokenByEmail(email);

        if(existingToken){
            await db.verificationToken.delete({
                where:{
                    id: existingToken.id
                }
            })
        
        }

        const verificationToken = await db.verificationToken.create({
            data:{
                token,
                email,
                expires
            }
        })
        return verificationToken;
    } catch (error) {
        return null;
    }
}