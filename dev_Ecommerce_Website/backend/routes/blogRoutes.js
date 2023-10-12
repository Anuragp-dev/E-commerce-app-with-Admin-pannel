import express from "express";
import { authMiddleware, isAdmin } from "../middlewares/authMiddileware.js";
import { createBlog, deleteBlog, dislikeBlog, getAllBlog, getBlog, likeBlog, upadateBlog} from "../controller/blogctrl.js";

const router = express.Router();

router.post("/",authMiddleware,isAdmin, createBlog);

router.put("/likes", authMiddleware, isAdmin, likeBlog);
router.put("/dislikes", authMiddleware, isAdmin, dislikeBlog);
router.put("/:id",authMiddleware,isAdmin, upadateBlog);
router.get("/:id", getBlog);
router.get("/",getAllBlog);
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);




export {router as blogRouter}