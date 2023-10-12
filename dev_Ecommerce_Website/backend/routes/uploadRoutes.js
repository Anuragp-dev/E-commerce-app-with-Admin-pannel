import express from "express";
import { productImgResize, upload } from "../middlewares/uploadImages.js";
import { deleteImages, uploadImages } from "../controller/uploadCtrl.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddileware.js";

// import { authMiddleware, isAdmin } from "../middlewares/authMiddileware.js";
// import { productImgResize, uploadPhoto } from '../middlewares/uploadImages.js';
// import { delteImages, uploadImages } from "../controller/uploadCtrl.js";



const router = express.Router();






router.post("/uploadimage", authMiddleware, isAdmin ,upload.array("images",10), productImgResize, uploadImages);

router.delete("/deleteimage/:id", authMiddleware, isAdmin, deleteImages);




export {router as uploadRouter};