import { Router } from "express";
import clerkClient from "../utils/clerk";
import { producer } from "../utils/kafka";
const router:Router = Router();

router.get("/",async(req,res)=>{
    const users = await clerkClient.users.getUserList();
    res.status(200).json(users);
})



router.get("/:id",async(req,res)=>{
    const {id} = req.params;
    const users = await clerkClient.users.getUser(id);
    res.status(200).json(users);
})

router.post("/",async(req,res)=>{
    type CreateParams = Parameters<typeof clerkClient.users.createUser>[0];
    const newUser:CreateParams = req.body;
    const users = await clerkClient.users.createUser(newUser);
    producer.send("user.created",{
        value:{
            username:users.username,
            email:users.emailAddresses[0]?.emailAddress,
        },
    })
    res.status(200).json(users);
})

router.post("/:id",async(req,res)=>{

    const {id} = req.params;
    const users = await clerkClient.users.deleteUser(id);
    res.status(200).json(users);
})

export default router;