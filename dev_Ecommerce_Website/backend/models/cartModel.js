import mongoose from "mongoose";

// Declare the Schema of the Mongo model
const cartSchema = new mongoose.Schema(
    {
   userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Users"
   },
   productId :{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Products"
   },
   quantity:{
    type:Number,
    required:true,
   },
price:{
    type:Number,
    required:true,
},
color:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Color"
}
    },
    {
        timestamps:true,
    },
);

//Export the model
export default mongoose.model("Cart", cartSchema);