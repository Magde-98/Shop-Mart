/*eslint disabled */
import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {

    interface User{
        user:{
            name:string,
            email:string,
            role:string
        },
        token:string,
    }

}



declare module "next-auth/jwt" {
  
  interface JWT extends User{
    /** OpenID ID Token */
    idToken?: string
  }
}