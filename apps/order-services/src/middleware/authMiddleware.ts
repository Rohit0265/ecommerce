import {getAuth} from "@clerk/fastify";
import { FastifyReply, FastifyRequest } from "fastify";
import type {CustomJwtSessionClaims} from "@repo/types"

declare module "fastify" {
    interface FastifyRequest{
    userId?:string;
}
}

export const shoulbeUser =async (request:FastifyRequest,reply:FastifyReply)=>{

    const {userId} =  getAuth(request);

    if (!userId) {
    return reply.code(401).send({ success: false, message: "Not authenticated" });
  }
  request.userId = userId;

}

export const shoulbeAdmin =async (request:FastifyRequest,reply:FastifyReply)=>{

    const auth =  getAuth(request);

    if (!auth.userId) {
    return reply.status(401).send({ success: false, message: "Not authenticated" });
  }

  const claims = auth.sessionClaims as CustomJwtSessionClaims

  if(claims?.metadata?.role !== "admin"){
    return reply.status(403).send({ success: false, message: "Unauthorized" });
  }
  request.userId = auth.userId;

} 