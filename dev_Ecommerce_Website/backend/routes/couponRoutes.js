import express from "express";
import { authMiddleware, isAdmin } from "../middlewares/authMiddileware.js";
import { createCoupon, deleteCoupon, getACoupon, getAllCoupon, updateCoupon } from "../controller/couponCtrl.js";

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCoupon);
router.get("/", authMiddleware, isAdmin, getAllCoupon);
router.get("/:id", authMiddleware, isAdmin, getACoupon);
router.put("/:id", authMiddleware, isAdmin, updateCoupon);
router.delete("/:id", authMiddleware, isAdmin,deleteCoupon);

export {router as couponRouter}