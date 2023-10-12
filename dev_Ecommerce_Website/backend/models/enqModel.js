import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var enqSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        
    },
    email:{
        type:String,
        required:true,
        
    },
    mobile:{
        type:String,
        required:true,
       
    },
    comment:{
        type:String,
        required:true,
    },
    status: {
        type:String,
        default:"Submitted",
        enum: ["Submitted","Contacted","In Progress","Resolved"],
    }
});

//Export the model
export default mongoose.model("Enquiry,",enqSchema);