import BlogCatagory from "../models/blogCatagoryModel.js";
import asyncHandler from "express-async-handler";
import { validdateMongoDbId } from "../utils/validateMongodbid.js";



export const createBlogCatagory = asyncHandler(async (req,res) => {
    try{

        const createblogcatagory = await BlogCatagory.create(req.body);
        res.json(createblogcatagory);
    }catch(error) {
        throw new Error(error);
    }
});


export const updateBlogCatagory = asyncHandler(async (req,res) => {
    const { id } = req.params;
    validdateMongoDbId(id)
    try {
        const updateblogcatagory = await BlogCatagory.findByIdAndUpdate(id, req.body, { new:true });
        res.json(updateblogcatagory);

    }catch(error) {
        throw new Error(error)
    }

});


export const deleteBlogCatagory = asyncHandler(async(req,res)=> {
const { id } = req.params;
validdateMongoDbId(id);

    try{
        const deleteblogcatagory = await BlogCatagory.findByIdAndDelete(id);
        res.json(deleteblogcatagory);

    }catch(error) {
        throw new Error(error);
    }
});


export const getBlogCatagory = asyncHandler(async (req,res) => {
    const { id } = req.params;
    validdateMongoDbId(id)
    try {
        const getablogcatagory = await BlogCatagory.findById(id);
        res.json(getablogcatagory);

    }catch(error) {
        throw new Error(error)
    }

});


export const getAllBlogCatagory = asyncHandler(async (req,res) => {
    try{

        const getallblogcatagory = await BlogCatagory.find();
        res.json(getallblogcatagory);
    }catch(error) {
        throw new Error(error);
    }
});
