import { getAuth } from "@hono/clerk-auth"
import {createMiddleware} from "hono/factory"
import {CustomJwtSessionClaims} from "@repo/types"

export const shouldBeUser = createMiddleware<{
    Variables:{
        userId:string;
    }
}>(async (c,next)=>{
const auth = getAuth(c);

if(!auth?.userId){
    return c.json({
        message:"You are not logged in.",
    })
}
await next();
})

export const shouldBeAdmin = createMiddleware<{
    Variables:{
        userId:string;
    }
}>(async (c,next)=>{
const auth = getAuth(c);

if(!auth?.userId){
    return c.json({
        message:"You are not logged in.",
    })
}

  const claims = auth.sessionClaims as CustomJwtSessionClaims

  if(claims?.metadata?.role !== "admin"){
    return c.json({ success: false, message: "Unauthorized" });
  }

await next();
})