import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { db } from "@/lib/db";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export async function logLoginEvent(userId: string, browser: string, ip: string) {

  try {
    const loginEntry = await db.loginHistory.create({
      data:{
        userId,
        browser: browser,
        ip: ip,
        createdAt: new Date(),
      }
    })
    return {success:true}
  } catch (error) {
    console.error("Error saving login event", error);
    return {error: "Something went wrong!"}
  }
}
