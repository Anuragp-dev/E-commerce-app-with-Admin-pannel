import mongoose from "mongoose";

// Declare the Schema of the Mongo model
const productCatagorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
  
},{
    timestamps: true,
}
);

//Export the model
export default mongoose.model('ProCatagory', productCatagorySchema);