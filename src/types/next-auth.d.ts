import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    expires: string; 
    user: {
      email: string;
      id: string | number;
      image?: string, 
      name: null | string
    }
  }
}