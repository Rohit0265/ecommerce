import { Request,Response } from "express"
import {Prisma,prisma} from "@repo/product-db"
import { producer } from "../utils/kafka";
import { StripeProductType } from "@repo/types";



//creating product
export const createProduct = async (req:Request, res:Response)=>{
    const data: Prisma.ProductCreateInput= req.body;
    
    const {colors,images} = data;
    if(!colors || !Array.isArray(colors) ||colors.length === 0){
        return res.status(400).json({message: "Color Is Required"})
    }
    
    if(!images || typeof images !== "object"){
        return res.status(400).json({message: "Images Is Required"})
    }
    
    const missingColors = colors.filter((color)=> !(color in images))
    if(missingColors.length > 0){
        return res.status(400).json({message: "Missing Images For Colors!",missingColors});
    }

    const product = await prisma.product.create({data});

    const stripeProducts:StripeProductType = {
        id:product.id.toString(),
        name:product.name,
        price:product.price
    }
    producer.send("product.created",{value:stripeProducts});

    res.status(201).json(product);
    
}


//updating product
export const updateroduct = async (req:Request, res:Response)=>{
    const {id} = req.params;
    const data:Prisma.ProductUpdateInput = req.body;

    const updatedproduct = await prisma.product.update({
        where:{
            id: Number(id)
        },data,
    })
    return res.status(200).json(updatedproduct)
}



//deleting product
export const deleteProduct = async (req:Request, res:Response)=>{
    const {id} = req.params;

    const deletedproduct = await prisma.product.delete({
        where:{
            id: Number(id)
        }
    })

        producer.send("product.deleted",{value:Number(id)});

    return res.status(200).json(deletedproduct)
}



//getting all product
export const getProducts = async (req:Request, res:Response)=>{

    const {sort,category,search,limit} = req.query;
    const orderBy = (()=>{
        switch(sort){
            case "aesc":
                return {price:Prisma.SortOrder.asc}
                break;
            case "desc":
                return {price:Prisma.SortOrder.desc}
                break;
            case "oldest":
                return {createdAt:Prisma.SortOrder.asc}
                break;
            default:
                return {createdAt:Prisma.SortOrder.desc}
                break;
        }
    })();

    const where: Prisma.ProductWhereInput = {};

    if (category && category !== "all") {
        where.category = {
            slug: category as string,
        };
    }

    if (search) {
        where.name = {
            contains: search as string,
            mode: "insensitive"
        };
    }

    const products = await prisma.product.findMany({
        where,
        orderBy,
        take:limit ? Number(limit):undefined,
    });
    res.status(200).json(products);
}


//get product by specific id
export const getProduct = async (req:Request, res:Response)=>{
    const {id} = req.params;
    const product = await prisma.product.findUnique({
        where:{id:Number(id)},
    })
    return res.status(200).json(product);
}