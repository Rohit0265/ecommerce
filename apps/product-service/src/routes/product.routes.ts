import {Router} from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateroduct } from "../controller/product.controller";
import { shouldBeAdmin } from "../middleware/authMiddleware";

const router :Router =  Router();

router.get("/test",(req,res)=>{
    res.json({message : "works"});
})

router.post("/",shouldBeAdmin,createProduct)
router.put("/:id",shouldBeAdmin,updateroduct)
router.delete("/:id",shouldBeAdmin,deleteProduct)
router.get("/:id",getProduct)
router.get("/",getProducts)


export default router;