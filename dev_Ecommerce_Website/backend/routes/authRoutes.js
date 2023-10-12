import express from "express";
import { applyCoupon, blockUser, createOrder, createUser, deleteProductFromCart, deleteUser,emptyCart,forgotPasswordToken,  getAllOrders, getMonthWiseOrderIncome,  getMyOrders,  getOrderByUserId,  getSingleOrders,  getUserCart, getWishlist, getYearlyTotalOrders, getaUser, getallUser,  handleRefreshToken,  loginAdmin,  loginUser, logout, resetPassword, saveAddress, unblockUser,  updateOrder,updatePassword, updateProductQuantityFromCart, updateUser, userCart} from "../controller/userCtrl.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddileware.js";
import { checkout, paymentVerification } from "../controller/paymentCtrl.js";

const router = express.Router();



router.post("/register",createUser);
router.post("/forgotpassword",forgotPasswordToken);
router.put("/resetpassword/:token",resetPassword);
router.put("/password", authMiddleware , updatePassword );
// router.put("/order/updateorder/:id", authMiddleware,isAdmin, updateOrderStaus);
router.put("/updateuser", authMiddleware, updateUser);
router.put("/saveaddress", authMiddleware, saveAddress);
router.put("/blockuser/:id", authMiddleware,isAdmin, blockUser);
router.put("/unblockuser/:id", authMiddleware,isAdmin, unblockUser);

router.post("/login",loginUser);
router.post("/adminlogin",loginAdmin);
router.post("/cart",authMiddleware, userCart);
router.post("/order/checkout",authMiddleware, checkout);
router.post("/order/paymentVerification",authMiddleware,paymentVerification);
router.post("/cart/applycoupon",authMiddleware,applyCoupon);
router.post("/cart/createorder",authMiddleware, createOrder);
router.post("/getaorder/:id", authMiddleware, isAdmin, getOrderByUserId);



router.get("/getalluser",getallUser);
router.get("/getcart", authMiddleware, getUserCart);
router.get("/getmonthincome",authMiddleware, getMonthWiseOrderIncome);
router.get("/getyearlyorders",authMiddleware, getYearlyTotalOrders);
router.get('/wishlist', authMiddleware, getWishlist);
router.get("/getmyorders", authMiddleware, getMyOrders);
router.get("/getallorders", authMiddleware, isAdmin, getAllOrders);
router.get("/getaorder/:id", authMiddleware, isAdmin, getSingleOrders);
router.put("/updateorder/:id", authMiddleware, isAdmin, updateOrder);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authMiddleware , getWishlist);
router.get("/:id", authMiddleware ,isAdmin, getaUser);



router.delete("/emptycart", authMiddleware,emptyCart);
router.delete("/deleteproductcart/:cartItemId", authMiddleware,deleteProductFromCart);
router.delete("/updatecart/:cartItemId/:newQuantity", authMiddleware, updateProductQuantityFromCart);
router.delete("/:id",deleteUser);




 






export {router as authRouter}