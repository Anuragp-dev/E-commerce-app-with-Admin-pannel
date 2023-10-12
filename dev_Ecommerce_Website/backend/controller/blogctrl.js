import Blog from "../models/blogModel.js";
import asyncHandler from "express-async-handler";
import { validdateMongoDbId } from "../utils/validateMongodbid.js";
// import { cloudinaryUploadImg } from "../utils/cloudinary.js";
// import fs from "fs";



export const createBlog = asyncHandler(async(req,res) => {
    try {
        const newBlog = await Blog.create(req.body);
        res.json(newBlog);
    }catch(error) {
        throw new Error(error);
    };
});



export const upadateBlog = asyncHandler(async(req,res) => {
    const  { id } = req.params;
    validdateMongoDbId(id);
    try {
        const updateblog = await Blog.findByIdAndUpdate(id, req.body, {
            new :true,
        });
        res.json(updateblog);
    }catch(error) {
        throw new Error(error);
    }

});


export const getBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validdateMongoDbId(id);
    try {
      const getBlog = await Blog.findById(id)
        .populate("likes")
        .populate("dislikes")
     await Blog.findByIdAndUpdate(
        id,
        {
          $inc: { numViews: 1 },
        },
        { new: true }
      );
      res.json(getBlog);
    } catch (error) {
      throw new Error(error);
    }
  });



export const getAllBlog = asyncHandler(async(req,res) => {
  
    try {
        const getallblog = await Blog.find();
        res.json(getallblog);
    }catch(error) {
        throw new Error(error);
    }

});


export const deleteBlog = asyncHandler(async(req,res) => {
    const { id } = req.params;
    validdateMongoDbId(id);
    try {
        const deleteblog = await Blog.findByIdAndDelete(id);
        res.json(deleteblog);
    }catch(error) {
        throw new Error(error);
    }


});



export const likeBlog = asyncHandler(async(req,res) => {
    const { blogId } = req.body;
    validdateMongoDbId(blogId);

    //FIND THE BLOG WHICH U WANT TO FIND
    const blog = await Blog.findById(blogId);
    //find the  login user
    const loginUserId = req?.user?._id;
    //find if the user has liked the blog
     const isLiked  = blog?.isLiked;
 //find the user if the user is disliked the blog
 const alreadyDisliked = blog?.dislikes?.find(
    (userId) => userId?.toString() === loginUserId?.toString());

 if(alreadyDisliked) {
    const blog = await Blog.findByIdAndUpdate(blogId, {
        $pull: { dislikes : loginUserId },
        isDisliked:false,
    },{new:true,} 
    );
    res.json(blog);

 }
 if(isLiked) {
    const blog = await Blog.findByIdAndUpdate(
        blogId, {
        $pull: { likes : loginUserId },
        isLiked:false,
    },{new:true,} 
    );
    res.json(blog);

 }else {

    const blog = await Blog.findByIdAndUpdate(blogId, {
        $push: { likes : loginUserId },
        isLiked:true,
    },{new:true,} 
    );
    res.json(blog);
}

});


export const dislikeBlog = asyncHandler(async(req,res) => {
    const { blogId } = req.body;
    validdateMongoDbId(blogId);

    //FIND THE BLOG WHICH U WANT TO FIND
    const blog = await Blog.findById(blogId);
    //find the  login user
    const loginUserId = req?.user?._id;
    //find if the user has liked the blog
     const isDisLiked  = blog?.isDisliked;
 //find the user if the user is disliked the blog
 const alreadyLiked = blog?.likes?.find(
    (userId) => userId?.toString() === loginUserId?.toString());

 if(alreadyLiked) {
    const blog = await Blog.findByIdAndUpdate(blogId, {
        $pull: { likes : loginUserId },
        isLiked:false,
    },{new:true,} 
    );
    res.json(blog);

 }
 if(isDisLiked) {
    const blog = await Blog.findByIdAndUpdate(
        blogId, {
        $pull: { dislikes : loginUserId },
        isDisliked:false,
    },{new:true,} 
    );
    res.json(blog);

 }else {

    const blog = await Blog.findByIdAndUpdate(blogId, {
        $push: { dislikes : loginUserId },
        isDisliked:true,
    },{new:true,} 
    );
    res.json(blog);
}

});




