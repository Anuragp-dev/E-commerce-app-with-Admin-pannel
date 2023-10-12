import mongoose from "mongoose";

// Declare the Schema of the Mongo model
const couponSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        uppercase:true,
    },
    expiry:{
        type:String,
        required:true,
        unique:true,
    },
   
    discount:{
        type:Number,
        required:true,
    },
});

//Export the model
export default mongoose.model('Coupon', couponSchema);