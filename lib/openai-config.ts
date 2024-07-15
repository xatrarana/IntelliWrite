import OpenAI from 'openai';

import {GoogleGenerativeAI} from "@google/generative-ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const GEMINI_API_KEY = process.env.GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)


const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function chat(prompt: string){
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const chatSession = model.startChat({
    generationConfig,
    history: [
    ],
  });

  const result = await chatSession.sendMessage(prompt);
  return result.response.text();

}
export async function getCompletion(prompt: string) {
  const gptResponse = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-3.5-turbo',
  });
  return gptResponse;
}

export async function run(prompt: string) {
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
  
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
  }
  