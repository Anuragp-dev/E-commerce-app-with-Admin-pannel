import Coupon from "../models/couponModel.js";
import { validdateMongoDbId } from "../utils/validateMongodbid.js";
import asyncHandler from "express-async-handler";



export const  createCoupon = asyncHandler(async (req,res) => {
    try {
        const newCoupon = await Coupon.create(req.body);
        res.json(newCoupon);
    }catch (error) {
        throw new Error (error);
    }
});

export const  getAllCoupon = asyncHandler(async (req,res) => {
    try {
        const coupon = await Coupon.find();
        res.json(coupon);
    }catch (error) {
        throw new Error (error);
    }
});


export const  updateCoupon = asyncHandler(async (req,res) => {
    const { id } = req.params; 
    validdateMongoDbId(id);
    try {
        const updatecoupon = await Coupon.findByIdAndUpdate(id, req.body, {new:true});
        
        res.json(updatecoupon);
    }catch (error) {
        throw new Error (error);
    }
});

export const  getACoupon = asyncHandler(async (req,res) => {
    const { id } = req.params; 
    validdateMongoDbId(id);
    try {
        const getacoupon = await Coupon.findById(id);
        
        res.json(getacoupon);
    }catch (error) {
        throw new Error (error);
    }
});



export const  deleteCoupon = asyncHandler(async (req,res) => {
    const { id } = req.params; 
    validdateMongoDbId(id);
    try {
        const deletecoupon = await Coupon.findByIdAndDelete(id);
        
        res.json(deletecoupon);
    }catch (error) {
        throw new Error (error);
    }
});