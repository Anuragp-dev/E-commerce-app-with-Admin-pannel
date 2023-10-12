import express from "express";
import { authMiddleware, isAdmin } from "../middlewares/authMiddileware.js";
import { createColor, deleteColor, getAllColor, getColor, updateColor } from "../controller/colorCtrl.js";



const router = express.Router();

router.post("/",authMiddleware, isAdmin,createColor);
router.put("/:id",authMiddleware, isAdmin,updateColor);
router.delete("/:id",authMiddleware, isAdmin,deleteColor);
router.get("/:id",getColor);
router.get("/", getAllColor);



export {router as ColorRouter};