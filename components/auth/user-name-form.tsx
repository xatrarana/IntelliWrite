"use client";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form,FormItem,FormField, FormControl, FormMessage } from "../ui/form"
import {  UserNameSchema } from "@/schemas"
import * as z from 'zod';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormErorr } from "../form-error";
import { FormSuccess } from "../form-success";
import { useState, useTransition } from "react";
import { addUsername } from "@/actions/username";
import { UserNameCardWrapper } from "./user-name-card-wrapper";
import { useRouter } from "next/navigation";


export const UserNameForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | boolean | undefined>(undefined);
    const router = useRouter();
    const form = useForm<z.infer<typeof UserNameSchema>>({
        resolver: zodResolver(UserNameSchema),
        defaultValues: {
            username: "",
        }
    })

    const onSubmit = (values: z.infer<typeof UserNameSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            addUsername(values).
            then((data) => { 
                 setError(data.error);
                 

                    if(data.success) {
                        setSuccess("Username added successfully!");
                        router.push("/feed-settings")
                    }
            })
        })
    }
    return <UserNameCardWrapper 
        headerLabel="Enter your username"
    >
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
                >
                    <div className="space-y-4">
                 
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
                        
                    </div>

                    <FormErorr message={error}/>
                    <FormSuccess message={success}/>

                    <Button
                    type="submit"
                    className="w-full"
                    disabled={isPending}
                    size={"lg"}
                    >
                        Proceed
                    </Button>
            </form>
        </Form>
    </UserNameCardWrapper>
}