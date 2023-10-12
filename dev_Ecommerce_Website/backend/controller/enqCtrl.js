import Enquiry from "../models/enqModel.js";
import asyncHandler from "express-async-handler";
import { validdateMongoDbId } from "../utils/validateMongodbid.js";



export const createEnquiry = asyncHandler(async (req,res) => {
    try{

        const createEnquiry = await Enquiry.create(req.body);
        res.json(createEnquiry);
    }catch(error) {
        throw new Error(error);
    }
});



export const updateEnquiry = asyncHandler(async (req,res) => {
    const { id } = req.params;
    validdateMongoDbId(id)
    try {
        const updateEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, { new:true });
        res.json(updateEnquiry);

    }catch(error) {
        throw new Error(error)
    }

});


export const deleteEnquiry = asyncHandler(async(req,res)=> {
const { id } = req.params;
validdateMongoDbId(id);

    try{
        const deleteEnquiry = await Enquiry.findByIdAndDelete(id);
        res.json(deleteEnquiry);

    }catch(error) {
        throw new Error(error);
    }
});


export const getEnquiry = asyncHandler(async (req,res) => {
    const { id } = req.params;
    validdateMongoDbId(id)
    try {
        const getaEnquiry = await Enquiry.findById(id);
        res.json(getaEnquiry);

    }catch(error) {
        throw new Error(error)
    }

});


export const getAllEnquiry = asyncHandler(async (req,res) => {
    try{

        const getallEnquiry = await Enquiry.find();
        res.json(getallEnquiry);
    }catch(error) {
        throw new Error(error);
    }
});
