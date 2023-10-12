import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import customerReducer from "../features/customers/customerSlice.js";
import productReducer from "../features/product/productSlice.js";
import brandReducer from "../features/brand/brandSlice.js";
import pcategoryReducer from "../features/productCategory/pcategorySlice.js";
import colorReducer from "../features/color/colorSlice.js";
import blogReducer from "../features/blogs/blogSlice.js";
import bcategoryReducer from "../features/blogcategory/bcategorySlice.js";
import enquiryReducer from "../features/enquiry/enquirySlice.js";
import uploadReducer from "../features/upload/uploadSlice.js";
import couponReducer from "../features/coupon/couponSlice.js";









export const store = configureStore({
    reducer : { 
        auth: authReducer ,
        customer : customerReducer, 
        product : productReducer,
        brand : brandReducer,
        pcategory : pcategoryReducer,
        color : colorReducer,
        blog: blogReducer,
        bcategory : bcategoryReducer,
        enquiry : enquiryReducer,
        upload : uploadReducer,
        coupon : couponReducer,
        
    },

});
                        



