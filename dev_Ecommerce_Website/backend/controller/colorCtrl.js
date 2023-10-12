import Color from "../models/colorModel.js";
import asyncHandler from "express-async-handler";
import { validdateMongoDbId } from "../utils/validateMongodbid.js";



export const createColor = asyncHandler(async (req,res) => {
    try{

        const createColor = await Color.create(req.body);
        res.json(createColor);
    }catch(error) {
        throw new Error(error);
    }
});


export const updateColor = asyncHandler(async (req,res) => {
    const { id } = req.params;
    validdateMongoDbId(id)
    try {
        const updateColor = await Color.findByIdAndUpdate(id, req.body, { new:true });
        res.json(updateColor);

    }catch(error) {
        throw new Error(error)
    }

});


export const deleteColor = asyncHandler(async(req,res)=> {
const { id } = req.params;
validdateMongoDbId(id);

    try{
        const deleteColor = await Color.findByIdAndDelete(id);
        res.json(deleteColor);

    }catch(error) {
        throw new Error(error);
    }
});


export const getColor = asyncHandler(async (req,res) => {
    const { id } = req.params;
    validdateMongoDbId(id)
    try {
        const getaColor = await Color.findById(id);
        res.json(getaColor);

    }catch(error) {
        throw new Error(error)
    }

});


export const getAllColor = asyncHandler(async (req,res) => {
    try{

        const getallColor = await Color.find();
        res.json(getallColor);
    }catch(error) {
        throw new Error(error);
    }
});
