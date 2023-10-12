import express from "express";
import { authMiddleware, isAdmin } from "../middlewares/authMiddileware.js";
import {  createProductCatagory, deleteProductCatagory, getAllProductCatagory, getProductCatagory, updateProductCatagory } from "../controller/productCatagoryCtrl.js";

const router = express.Router();


router.post("/",authMiddleware, isAdmin, createProductCatagory);
router.put("/:id",authMiddleware, isAdmin, updateProductCatagory);
router.delete("/:id",authMiddleware, isAdmin, deleteProductCatagory);
router.get("/:id", getProductCatagory);
router.get("/", getAllProductCatagory);



export {router as productCatagoryRouter}