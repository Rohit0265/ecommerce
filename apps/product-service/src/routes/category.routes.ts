import {Router} from "express";
import { createcategory, deletecategory, getcategoryies, updatecategory } from "../controller/category.controller";
import { shouldBeAdmin } from "../middleware/authMiddleware";

const router :Router =  Router();

router.post("/",shouldBeAdmin,createcategory)
router.put("/:id",shouldBeAdmin,updatecategory)
router.delete("/:id",shouldBeAdmin,deletecategory)
router.get("/",getcategoryies)
// router.get("/",getProducts)


export default router;