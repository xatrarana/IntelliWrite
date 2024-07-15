import { NewVerificationForm } from "@/components/auth/new-verification-form"
import { Suspense } from "react"

const NewVerifyEmailPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <NewVerificationForm/>
        </Suspense>
    )
}

export default NewVerifyEmailPage