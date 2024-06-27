"use client";
import { useForm } from "react-hook-form"
import { CardWrapper } from "./card-wrapper"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form,FormItem,FormLabel,FormMessage,FormField, FormControl } from "../ui/form"
import { LoginSchema } from "@/schemas"
import * as z from 'zod';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormErorr } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";

export const LoginForm = () => {
    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different provider!" : "";
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            login(values).
            then((data) => { 
                if(data && data.error){
                 setError(data.error);
                }
                if(data && data.success){
                    setSuccess(data.success);
                }
               
            })
        })
    }
    return <CardWrapper headerLabel="Welcome back" backButtonLabel="Don't have an account?" backButtonHref="/auth/register" showSocial>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
                >
                    <div className="space-y-4">
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
                                    className="h-10"
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
                                    className="h-10"
                                    />
                                   </FormControl>
                                   <FormMessage/>
                                </FormItem>
                            )}
                          />  
                    </div>

                    <FormErorr message={error || urlError}/>
                    <FormSuccess message={success}/>

                    <Button
                    type="submit"
                    className="w-full"
                    disabled={isPending}
                    size={"lg"}
                    >
                        {
                            isPending ? <span className="loading loading-dots loading-md"></span> : "Login"
                        }
                    </Button>
            </form>
        </Form>
    </CardWrapper>
}