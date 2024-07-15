"use client";
import { useForm } from "react-hook-form"
import { CardWrapper } from "./card-wrapper"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form,FormItem,FormLabel,FormMessage,FormField, FormControl } from "../ui/form"
import { RegisterSchema } from "@/schemas"
import * as z from 'zod';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormErorr } from "../form-error";
import { FormSuccess } from "../form-success";
import { register } from "@/actions/register";
import { useState, useTransition } from "react";


export const RegisterForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            username: "",
            name: "",
            confirmPassword: ""
        }
    })

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            register(values).
            then((data) => { 

                if(data ){
                    if(data.error) {
                        return setError(data.error);
                    }
                 if(data.success) {
                     return setSuccess(data.success);
                }
            }
            })
        })
    }
    return <CardWrapper 
    headerLabel="Create an Account" 
    backButtonLabel="Already have account Login?" 
    backButtonHref="/auth/login" 
    showSocial
    >
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
                >
                    <div className="space-y-4">
                    <FormField 
                            control={form.control}
                            name="name"
                            render={({field}) =>(
                                <FormItem>
                                   <FormControl>
                                   <Input
                                    {...field}
                                    disabled={isPending}
                                    type="name"
                                    placeholder="Fullname"
                                    className="h-10 autofill-bg-blue focus-visible:border-blue-500   focus-visible:ring-blue-500"
                                    />
                                   </FormControl>
                                   <FormMessage/>
                                </FormItem>
                            )}
                          /> 
                          <FormField 
                            control={form.control}
                            name="username"
                            render={({field}) =>(
                                <FormItem>
                                   <FormControl>
                                   <Input
                                    {...field}
                                    disabled={isPending}
                                    type="text"
                                    placeholder="Username"
                                    className="h-10 autofill-bg-blue focus-visible:border-blue-500   focus-visible:ring-blue-500"
                                    />
                                   </FormControl>
                                   <FormMessage/>
                                </FormItem>
                            )}
                          /> 
                          <FormField 
                            control={form.control}
                            name="email"
                            render={({field}) =>(
                                <FormItem>
                                   <FormControl>
                                   <Input
                                    {...field}
                                    disabled={isPending}
                                    type="email"
                                    placeholder="Email"
                                    className="h-10 autofill-bg-blue focus-visible:border-blue-500   focus-visible:ring-blue-500"
                                    />
                                   </FormControl>
                                   <FormMessage/>
                                </FormItem>
                            )}
                          />  
                          <FormField 
                            control={form.control}
                            name="password"
                            render={({field}) =>(
                                <FormItem>
                                   <FormControl>
                                   <Input
                                    {...field}
                                    disabled={isPending}
                                    type="password"
                                    placeholder="Password"
                                    className="h-10 autofill-bg-blue focus-visible:border-blue-500   focus-visible:ring-blue-500"
                                    />
                                   </FormControl>
                                   <FormMessage/>
                                </FormItem>
                            )}
                          />  
                          <FormField 
                            control={form.control}
                            name="confirmPassword"
                            render={({field}) =>(
                                <FormItem>
                                   <FormControl>
                                   <Input
                                    {...field}
                                    disabled={isPending}
                                    type="password"
                                    placeholder="Confirm Password"
                                    className="h-10 autofill-bg-blue focus-visible:border-blue-500   focus-visible:ring-blue-500"
                                    />
                                   </FormControl>
                                   <FormMessage/>
                                </FormItem>
                            )}
                          />  
                    </div>

                    <FormErorr message={error}/>
                    <FormSuccess message={success}/>

                    <Button
                    type="submit"
                    className="w-full"
                    disabled={isPending}
                    size={"lg"}
                    >
                        Register Account
                    </Button>
            </form>
        </Form>
    </CardWrapper>
}