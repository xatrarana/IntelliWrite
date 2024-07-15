import NextAuth, { DefaultSession } from "next-auth";
import "next-auth/jwt"

export type ExtendedUser = DefaultSession["user"] & {
    username?: string;
    emailVerified?: boolean;
    IsFirstLogin?: boolean;
}


declare module "next-auth" {
    interface Session{
        user: ExtendedUser;
    }
}



declare module '@auth/core/jwt' {
	interface JWT {
		id: string
		custom1: string
		custom2: string
	}
}