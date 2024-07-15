"use client";

import { CardWrapper } from "./card-wrapper";
import {BeatLoader} from 'react-spinners';
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormSuccess } from "../form-success";
import { FormErorr } from "../form-error";

export const NewVerificationForm = () => {
    const [error, setError] = useState<string>();
    const [success, setSuccess] = useState<string>();
    const searchParams =  useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(async () =>{
        if(success || error) return;
        if(!token) {
            setError("Invalid Token!");
            return;
        }
        newVerification(token).then(data =>{
           
                setError(data?.error);
                setSuccess(data?.success);
        
        }).catch(error => setError("Something went wrong!") );
    },[token,success,error])


    useEffect(() =>{onSubmit();},[onSubmit])
    return(
       <CardWrapper
       headerLabel="Confirming your email address!"
       backButtonHref="/auth/login"
       backButtonLabel="Back to Login"
       >
        <div className="flex items-center w-full justify-center">
           {
                !error && !success && <BeatLoader/>
           }
            <FormSuccess message={success}/>
             {
                !success && <FormErorr message={error}/>
             }
        </div>
        
       </CardWrapper>
    )
}