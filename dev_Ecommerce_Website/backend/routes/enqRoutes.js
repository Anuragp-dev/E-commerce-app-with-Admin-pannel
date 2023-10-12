import express from "express"
import { authMiddleware, isAdmin } from "../middlewares/authMiddileware.js";
import { createEnquiry, deleteEnquiry, getAllEnquiry, getEnquiry, updateEnquiry } from "../controller/enqCtrl.js";



const router = express.Router();

router.post("/",createEnquiry);
router.put("/:id",authMiddleware, isAdmin,updateEnquiry);
router.delete("/:id",authMiddleware, isAdmin,deleteEnquiry);
router.get("/:id",getEnquiry);
router.get("/", getAllEnquiry );



export {router as EnquiryRouter};