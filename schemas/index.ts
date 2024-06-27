import * as z from 'zod';
export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is Requried"
    }),
    password: z.string().min(1,{
        message: "Password is Required"
    })
})


export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is Requried"
    }),
    password: z.string().min(6,{
        message: "Minimun 6 character is Required"
    }),
    name: z.string().min(1,{
        message: "Name is Required"
    }),
    confirmPassword: z.string().min(6,{
        message: "Minimun 6 character is Required"
    })
});