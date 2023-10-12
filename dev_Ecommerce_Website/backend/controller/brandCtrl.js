import Brand from "../models/brandModel.js";
import asyncHandler from "express-async-handler";
import { validdateMongoDbId } from "../utils/validateMongodbid.js";



export const createBrand = asyncHandler(async (req,res) => {
    try{

        const createbrand = await Brand.create(req.body);
        res.json(createbrand);
    }catch(error) {
        throw new Error(error);
    }
});


export const updateBrand = asyncHandler(async (req,res) => {
    const { id } = req.params;
    validdateMongoDbId(id)
    try {
        const updatebrand = await Brand.findByIdAndUpdate(id, req.body, { new:true });
        res.json(updatebrand);

    }catch(error) {
        throw new Error(error)
    }

});


export const deleteBrand = asyncHandler(async(req,res)=> {
const { id } = req.params;
validdateMongoDbId(id);

    try{
        const deletebrand = await Brand.findByIdAndDelete(id);
        res.json(deletebrand);

    }catch(error) {
        throw new Error(error);
    }
});


export const getBrand = asyncHandler(async (req,res) => {
    const { id } = req.params;
    validdateMongoDbId(id)
    try {
        const getabrand = await Brand.findById(id);
        res.json(getabrand);

    }catch(error) {
        throw new Error(error)
    }

});


export const getAllBrand = asyncHandler(async (req,res) => {
    try{

        const getallbrand = await Brand.find();
        res.json(getallbrand);
    }catch(error) {
        throw new Error(error);
    }
});
