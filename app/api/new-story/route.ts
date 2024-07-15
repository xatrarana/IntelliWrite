import { getCompletion, run } from '@/lib/openai-config';
import { NextRequest,NextResponse } from 'next/server';
import React from 'react';

export async function POST(request: NextRequest) {
    const { prompt } = await request.json();
  
    if (!prompt) {
      return new NextResponse(
        JSON.stringify({ name: "Please provide something to search for" }),
        { status: 400 }
      );
    }
     let response = await run(prompt)
    return new NextResponse(JSON.stringify({ answer: response }), {
      status: 200,
    });
  }