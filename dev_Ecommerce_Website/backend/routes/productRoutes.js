import express from "express";
import { addTowishlist, createProduct, deleteProduct,  getAllProduct, getaProduct, rating, updateProduct} from "../controller/productCtrl.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddileware.js";


const router = express.Router();



router.post("/", authMiddleware, isAdmin, createProduct);

router.get("/:id", getaProduct);
router.put("/wishlist", authMiddleware, addTowishlist);
router.put("/rating", authMiddleware, rating);


router.put("/:id",  authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

router.get("/", getAllProduct);








export {router as productRouter};