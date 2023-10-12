import express from "express";
import { authMiddleware, isAdmin } from "../middlewares/authMiddileware.js";
import { createBlogCatagory, deleteBlogCatagory, getAllBlogCatagory, getBlogCatagory, updateBlogCatagory } from "../controller/blogCatagoryCtrl.js";


const router = express.Router();

router.post("/",authMiddleware, isAdmin,createBlogCatagory);
router.put("/:id",authMiddleware, isAdmin,updateBlogCatagory);
router.delete("/:id",authMiddleware, isAdmin,deleteBlogCatagory);
router.get("/:id",getBlogCatagory);
router.get("/", getAllBlogCatagory);



export {router as blogCatagoryRouter}