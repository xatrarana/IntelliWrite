import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { Card, CardFooter, CardHeader } from "../ui/card"
import { BackButton } from "./back-button"
import { CardWrapper } from "./card-wrapper"
import { Header } from "./header"

export const ErroCard = () => {
    return(
        // <Card className="w-[400px] shadow-sm">
        //     <CardHeader>
        //         <Header label="Opps! something went wrong"/>
        //     </CardHeader>
        //     <CardFooter>
        //         <BackButton
        //         href="/auth/login"
        //         label="Go back to login"
        //         key={1}
        //         />
        //     </CardFooter>
        // </Card>

        <CardWrapper
        headerLabel="Opps! something went wrong"
        backButtonHref="/auth/login"
        backButtonLabel="Go back to login"
        >
            <div className="w-full flex justify-center items-center">
                <ExclamationTriangleIcon className="h-10 w-10 text-red-500"/>
            </div>
        </CardWrapper>
    )
}