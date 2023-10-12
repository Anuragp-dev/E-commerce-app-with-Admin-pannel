import express from "express";
import { authMiddleware, isAdmin } from "../middlewares/authMiddileware.js";
import { createBrand, deleteBrand, getAllBrand, getBrand, updateBrand } from "../controller/brandCtrl.js";



const router = express.Router();

router.post("/",authMiddleware, isAdmin,createBrand);
router.put("/:id",authMiddleware, isAdmin,updateBrand);
router.delete("/:id",authMiddleware, isAdmin,deleteBrand);
router.get("/:id",getBrand);
router.get("/", getAllBrand);



export {router as brandRouter};