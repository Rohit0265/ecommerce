import { prisma, Prisma } from "@repo/product-db";
import { Request,Response } from "express"


export const createcategory = async (req: Request, res: Response) => {
  try {
    const data: Prisma.CategoryCreateInput = req.body;
    const category = await prisma.category.create({ data });
    return res.status(201).json(category);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res.status(409).json({ message: "Category slug already exists" });
    }
    throw error;
  }
};

export const updatecategory = async (req:Request, res:Response)=>{
  const {id} = req.params;
  try {
    const data: Prisma.CategoryUpdateInput = req.body

    const category = await prisma.category.update({
      where:{id:Number(id)},data
    })
    return res.status(200).json(category)
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res.status(409).json({ message: "Category slug already exists" });
    }
    throw error;
  }
}

export const deletecategory = async (req:Request, res:Response)=>{
    const {id} = req.params;

  const category = await prisma.category.delete({
    where:{id:Number(id)}
  })
  return res.status(200).json(category)
}


export const getcategoryies = async (req:Request, res:Response)=>{
  const categories = await prisma.category.findMany()
  return res.status(200).json(categories)
}
