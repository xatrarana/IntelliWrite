import { chat, getCompletion, run } from '@/lib/openai-config';
import { NextRequest,NextResponse } from 'next/server';
import React from 'react';


export async function GET (request:NextRequest){
    return new Response(
        JSON.stringify(
    {lookup: request.nextUrl.searchParams.get('nameLookup')}

        )
    )
} 
type MyData ={
    prompt:string
}
// export async function POST(request: NextRequest) {
//     const { nameLookup }: MyData = await request.json();
  
//     if (!nameLookup) {
//       return new NextResponse(
//         JSON.stringify({ name: "Please provide something to search for" }),
//         { status: 400 }
//       );
//     }
    
//     return new NextResponse(JSON.stringify({ answer: "John Doe" }), {
//       status: 200,
//     });
//   }
export async function POST(request: NextRequest) {
    const { prompt }: MyData = await request.json();
  
    if (!prompt) {
      return new NextResponse(
        JSON.stringify({ name: "Please provide something to search for" }),
        { status: 400 }
      );
    }
    //  let response = await run(prompt)
    let response = await chat(prompt)
    console.log(response)
    return new NextResponse(JSON.stringify({ answer: response }), {
      status: 200,
    });
  }