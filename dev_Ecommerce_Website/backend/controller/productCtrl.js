import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import slugify from "slugify";
import User from "../models/userModel.js";
import { validdateMongoDbId } from "../utils/validateMongodbid.js";




export const createProduct = asyncHandler(async(req,res)=> {
try {
    if(req.body.title) {
        req.body.slug = slugify(req.body.title);
    }
const newProduct = await  Product.create(req.body);
res.json(newProduct);
}catch (error) {
    throw new Error(error);
}
});

 

export const  updateProduct = asyncHandler(async(req,res) => {
    const { id } = req.params;
    validdateMongoDbId(id);
    

    try {
        if(req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
       
        const updateproduct = await Product.findByIdAndUpdate(id, req.body, {
            
            new:true,
        },
        );
        res.json(updateproduct);
 
     }catch (error) {
         throw new Error(error)
     }
});





export const deleteProduct = asyncHandler(async(req,res) => {
    const { id }  = req.params;
    validdateMongoDbId(id);
     try {
        const deleteproduct = await Product.findOneAndDelete(id);
        res.json(deleteproduct);
     }catch (error) {
         throw new Error(error)
     }
});




export const getaProduct = asyncHandler(async(req,res)=> {
    const { id } = req.params;
    validdateMongoDbId(id);
try {

const findProduct = await Product.findById(id).populate("color");
res.json(findProduct);
}catch(error) {
    throw new Error(error);
}

});


export const getAllProduct = asyncHandler(async(req,res) => {
    try {
        //filtering
        const queryObj = { ...req.query };
        const excludeFields = ['page','sort','limit','fields'];
      excludeFields.forEach((el) => delete queryObj[el]);
      

      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
      
  let query = Product.find(JSON.parse(queryStr));


      //sorting

      if(req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);

      }else{
        query = query.sort('-createdAt')

      }

      // limiting the fields

      if(req.query.fields) {
        const fields = req.query.fields.split(",").join(" ");
        query = query.select(fields);
      }else {

        query = query.select('-__v')
      }


      //pagination 

      const page = req.query.page;
      const limit = req.query.limit;
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);
      if(req.query.page) {
        const productCount = await Product.countDocuments();
        if(skip >= productCount) {
            throw new Error ("This page does not Exists");
        }
      }
      


 const product = await query;
 res.json(product)
    }catch (error) {
        throw new Error(error);
    }

});

export const addTowishlist = asyncHandler (async (req,res) => { 
    const { _id } = req.user;
    validdateMongoDbId(_id);
    const { prodId } = req.body;
    try {
        const user = await User.findById(_id);
        const alreadyadded = user.wishlist.find((id) =>id.toString() === prodId);
        if(alreadyadded) {
            let user = await User.findByIdAndUpdate(
                _id, 
                {
                $pull: { wishlist : prodId },
            },
            {
                new:true,
            },
                );
                res.json(user);
        }else {

            let user = await User.findByIdAndUpdate(
                _id, 
                {
                $push: { wishlist : prodId },
            },
            {
                new:true,
            },
                );
                res.json(user);

        }

    }catch(error) {
        throw new Error(error);
    }

});


export const rating = asyncHandler (async (req, res) => {
    const { _id } = req.user;
    validdateMongoDbId(_id);
    const { star, prodId, comment } = req.body;
    try {
    const product  = await Product.findById(prodId);
    let alreadyRated = product.ratings.find((userId) => userId.postedby.toString() === _id.toString());
   
    if(alreadyRated) {
        const updateRating = await Product.updateOne({
            ratings: { $elemMatch: alreadyRated },
                
            
        },
        { $set: { "ratings.$.star" : star, "ratings.$.comment" : comment } },
        { new : true},
        );
        

    }else {
        const rateProduct = await Product.findByIdAndUpdate(prodId, {
            $push: {
                ratings: {
                    star:star,
                    comment: comment,
                    postedby:_id,
                },
            },
        },
        { new:true },
        );
       
    } 
    const getallratings = await Product.findById(prodId);
    let totalRating = getallratings.ratings.length;
    let ratingsum = getallratings.ratings.map((item) => item.star)
    .reduce((prev, curr) => prev + curr, 0 );

    let actualRating = Math.round(ratingsum / totalRating);
    let finalproduct = await Product.findByIdAndUpdate(
        prodId, {
        totalrating : actualRating,

    },
    {new:true},
    );
    res.json(finalproduct);
    }catch(error) {
        throw new Error (error);
    }


});



