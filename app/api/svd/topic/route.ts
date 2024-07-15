import { NextRequest } from "next/server";

export async function GET(request:NextRequest){
    return new Response(
        JSON.stringify(
    {lookup: request.nextUrl.searchParams.get('nameLookup')}

        )
    )
    
}