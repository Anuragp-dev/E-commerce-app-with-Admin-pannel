import ProductCatagory from "../models/productCatagoryModel.js";
import asyncHandler from "express-async-handler";
import { validdateMongoDbId } from "../utils/validateMongodbid.js";




export const createProductCatagory = asyncHandler(async(req,res) => {
    try {
        const newCatagory = await ProductCatagory.create(req.body);
        res.json(newCatagory);
    }catch(error) {
        throw new Error(error);
    }

});

export const updateProductCatagory = asyncHandler(async(req,res) => {
    const { id } = req.params;
    validdateMongoDbId(id)
    try {
        const updatedProCatagory = await ProductCatagory.findByIdAndUpdate(id, req.body, {
            new: true,
        }
            );
        res.json(updatedProCatagory);
    }catch(error) {
        throw new Error(error);
    }

});


export const deleteProductCatagory = asyncHandler(async(req,res) => {
    const { id } = req.params;
    validdateMongoDbId(id)
    try {
        const deletedProCatagory = await ProductCatagory.findByIdAndDelete(id);
        res.json(deletedProCatagory);
    }catch(error) {
        throw new Error(error);
    }

});


export const getProductCatagory = asyncHandler(async(req,res) => {
    const { id } = req.params;
    validdateMongoDbId(id)
    try {
        const getaProductCatagory = await ProductCatagory.findById(id);
        res.json(getaProductCatagory);
    }catch(error) {
        throw new Error(error);
    }

});


export const getAllProductCatagory = asyncHandler(async(req,res) => {
   
    try {
        const getallProductCatagory = await ProductCatagory.find();
        res.json(getallProductCatagory);
    }catch(error) {
        throw new Error(error);
    }

});
