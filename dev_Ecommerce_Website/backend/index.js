import express from "express";
import dotenv from "dotenv/config";
import cors from "cors";
import dbConnect from "./config/dbConnect.js";
import { authRouter } from "./routes/authRoutes.js";
import bodyParser from "body-parser";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import { productRouter } from "./routes/productRoutes.js";
import morgan from "morgan";


import { blogRouter } from "./routes/blogRoutes.js";
import { productCatagoryRouter } from "./routes/productCatagoryRoutes.js";
import { blogCatagoryRouter } from "./routes/blogCatagoryRoutes.js";
import { brandRouter } from "./routes/brandRoutes.js";
import { couponRouter } from "./routes/couponRoutes.js";
import { ColorRouter } from "./routes/colorRoutes.js";
import { EnquiryRouter } from "./routes/enqRoutes.js";
import { uploadRouter } from "./routes/uploadRoutes.js";




const app = express()
const PORT = process.env.PORT || 4000;


dbConnect();
app.use(morgan('dev'))
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


app.use("/api/user",authRouter);
app.use("/api/product",productRouter);
app.use("/api/blog",blogRouter);
app.use("/api/productcatagory",productCatagoryRouter);
app.use("/api/blogcatagory",blogCatagoryRouter);
app.use("/api/brand",brandRouter);
app.use("/api/color",ColorRouter);
app.use("/api/coupon",couponRouter);
app.use("/api/enquiry",EnquiryRouter);
app.use("/api/upload",uploadRouter);




app.use(notFound);
app.use(errorHandler);

app.listen(PORT, ()=> {
    console.log(`Server is running at Port ${PORT}`);
})
