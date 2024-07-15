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
    username: z.string().min(1,{
        message: "Username is Required"
    }),
    confirmPassword: z.string().min(6,{
        message: "Minimun 6 character is Required"
    })
});


export const UserNameSchema = z.object({
    username: z.string().min(1,{
        message: "Username is Required"
    })
});


export const BlogSchema = z.object({
    title: z.string().min(1,{
        message: "Title is Required"
    }),
    content: z.string().min(1,{
        message: "Content is Required"
    }),
    imageUrl: z.string().min(1,{
        message: "Image is Required"
    }),
    authorId: z.string().min(1,{
        message: "Author is Required"
    })
    
})