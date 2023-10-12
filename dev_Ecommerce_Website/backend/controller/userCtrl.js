import { generateToken } from "../config/jwtToken.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import uniqid from "uniqid";

import { validdateMongoDbId } from "../utils/validateMongodbid.js";
import { generateRefreshToken } from "../config/refreshToken.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "./emailCtrl.js";
import crypto from "crypto";
import Product from "../models/productModel.js";
import Cart from "../models/cartModel.js";
import Coupon from "../models/couponModel.js";
import Order from "../models/orderModel.js";



export const createUser = asyncHandler(async (req, res) => {
    const email = req.body?.email;
    const findAdmin = await User.findOne({ email: email });
    if (!findAdmin) {
        const newUser = await User.create(req.body)
        res.json(newUser);

    } else {
        throw new Error("User Already Exists")
    }

});


export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const findAdmin = await User.findOne({ email });
    if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
        const refreshToken = await generateRefreshToken(findAdmin?._id);
        const updateuser = await User.findByIdAndUpdate(findAdmin.id, {
            refreshToken: refreshToken,
        },
            { new: true }
        );
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        res.json({
            _id: findAdmin?._id,
            firstname: findAdmin?.firstname,
            lastname: findAdmin?.lastname,
            email: findAdmin?.email,
            mobile: findAdmin?.mobile,
            token: generateToken(findAdmin?._id),
        });

    } else {
        throw new Error("Invaild Credentilas");
    }
});


export const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const findAdmin = await User.findOne({ email });
    if (findAdmin.role !== 'admin') throw new Error("You are not Admin");

    if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
        const refreshToken = await generateRefreshToken(findAdmin?._id);
        const updateadmin = await User.findByIdAndUpdate(findAdmin.id, {
            refreshToken: refreshToken,
        },
            { new: true }
        );
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        res.json({
            _id: findAdmin?._id,
            firstname: findAdmin?.firstname,
            lastname: findAdmin?.lastname,
            email: findAdmin?.email,
            mobile: findAdmin?.mobile,
            token: generateToken(findAdmin?._id),
        });

    } else {
        throw new Error("Invaild Credentilas");
    }
});











export const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;

    if (!cookie?.refreshToken) throw new Error("No Refresh Token In Cookies");
    const refreshToken = cookie.refreshToken;

    const user = await User.findOne({ refreshToken });
    if (!user) throw new Error("No Refresh token present in Db or not matched");
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err || user.id !== decoded.id) {
            throw new Error("There is  something wrong with refresh token")
        }
        const accessToken = generateToken(user?._id)
        res.json({ accessToken });
    });


});



export const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });

        return res.sendStatus(204);
    }
    await User.findOneAndUpdate({ refreshToken }, {
        refreshToken: "",
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    });
    res.sendStatus(204);
});





export const getallUser = asyncHandler(async (req, res) => {
    try {
        const getaUsers = await User.find()
        res.json(getaUsers);

    } catch (error) {
        throw new Error(error)

    }
});



export const getaUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validdateMongoDbId(id);
    try {

        const getaUser = await User.findById(id);
        res.json({
            getaUser,
        })

    } catch (error) {
        throw new Error(error)
    }
});



export const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validdateMongoDbId(_id);

    try {

        const updateaUser = await User.findByIdAndUpdate(_id, {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
            mobile: req?.body?.mobile
        },
            {
                new: true,
            }

        );
        res.json(updateaUser);

    } catch (error) {
        throw new Error(error)
    }


});

//save user address 

export const saveAddress = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    validdateMongoDbId(_id);
    try {

        const updateaUser = await User.findByIdAndUpdate(
            _id,
            {
                address: req?.body?.address,

            },
            {
                new: true,
            }

        );
        res.json(updateaUser);

    } catch (error) {
        throw new Error(error)
    }



})






export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    validdateMongoDbId(id);
    try {
        const deleteaUser = await User.findByIdAndDelete(id);
        res.json({
            deleteaUser,
        })
    } catch (error) {
        throw new Error(error)
    }
});


export const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validdateMongoDbId(id);
    try {
        const block = await User.findByIdAndUpdate(id, {
            isBlocked: true,
        },
            {
                new: true,
            }
        );
        res.json({
            message: "User Blocked"
        });
    } catch (error) {
        throw new Error(error);
    }

})



export const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validdateMongoDbId(id);
    try {
        const unblock = await User.findByIdAndUpdate(id, {
            isBlocked: false,
        },
            {
                new: true,
            }
        );
        res.json({
            message: "User UnBlocked"
        });

    } catch (error) {
        throw new Error(error);
    }

});



export const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;
    validdateMongoDbId(_id);
    const user = await User.findById(_id);
    if (password) {
        user.password = password;
        const updatedPassword = await user.save();
        res.json(updatedPassword);
    } else {
        res.json(user);
    }
});



export const forgotPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found with this email");
    try {
        const token = await user.createPasswordResetToken();
        await user.save();
        const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:3000/resetpassword/${token}'>Click Here</>`;
        const data = {
            to: email,
            text: "Hey User",
            subject: "Forgot Password Link",
            htm: resetURL,
        };
        sendEmail(data);

        res.json(token);
    } catch (error) {
        throw new Error(error);
    }
});


export const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const hashedToken = crypto.createHash('sha256').update(token).digest("hex");
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    });
    if (!user) throw new Error("Token Exipred, Please Try Again Later");
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user);
});


export const getWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validdateMongoDbId(_id);
    try {
        const findUser = await User.findById(_id).populate("wishlist");
        res.json(findUser);

    } catch (error) {
        throw new Error(error);
    }

});


export const userCart = asyncHandler(async (req, res) => {
    const { productId, color, quantity, price } = req.body;
    const { _id } = req.user;

    validdateMongoDbId(_id)
    try {

        let newCart = await new Cart({
            userId: _id,
            productId,
            color,
            price,
            quantity,
        }).save();
        res.json(newCart)
    } catch (error) {
        throw new Error(error);
    }

});


export const getUserCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validdateMongoDbId(_id);
    try {
        const cart = await Cart.find({ userId: _id }).populate("productId")
            .populate("color");
        res.json(cart);

    } catch (error) {
        throw new Error(error);
    }

});

export const updateProductQuantityFromCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { cartItemId, newQuantity } = req.params;
    console.log(cartItemId);
    validdateMongoDbId(_id);
    try {
        const cartItem = await Cart.findOne({ userId: _id, _id: cartItemId })
        cartItem.quantity = newQuantity;
        cartItem.save();
        res.json(cartItem);
    } catch (error) {
        throw new Error(error);
    }
})


export const deleteProductFromCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { cartItemId } = req.params;
    validdateMongoDbId(_id);
    try {
        const deleteproductfromcart = await Cart.deleteOne({ userId: _id, _id: cartItemId })

        res.json(deleteproductfromcart);

    } catch (error) {
        throw new Error(error);
    }

});


export const createOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const {
      shippingInfo,
      orderItems,
      totalPrice,
      totalPriceAfterDiscount,
      paymentInfo,
    } = req.body;
  
    try {
      const order = await Order.create({
        shippingInfo,
        orderItems,
        totalPrice,
        totalPriceAfterDiscount,
        paymentInfo,
        user: _id,
      });
      res.json({ order, success: true });

    } catch (error) {
      throw new Error(error);
    }
  });


 export const getMyOrders = asyncHandler(async(req ,res)=> {
    const {_id} = req.user;
    try {
        const orders = await Order.find({user:_id}).populate("user").populate("orderItems.product").populate("orderItems.color")
         
        res.json ({
            orders
        })


    }catch (error) {
        throw new Error(error)
    }
})


export const getAllOrders = asyncHandler(async(req ,res)=> {

    try {
        const orders = await Order.find().populate("user")
         
        res.json ({
            orders
        })


    }catch (error) {
        throw new Error(error)
    }
})


export const getSingleOrders = asyncHandler(async(req ,res)=> {
const {id} = req.params
    try {
        const orders = await Order.findOne({_id:id}).populate('orderItems.product').populate('orderItems.color')
         
        res.json ({
            orders
        })


    }catch (error) {
        throw new Error(error)
    }
})



export const updateOrder = asyncHandler(async(req ,res)=> {
    const {id} = req.params
        try {
            const orders = await Order.findById(id)
            orders.orderStatus = req.body.status;
            await orders.save()
             
            res.json ({orders})
    
    
        }catch (error) {
            throw new Error(error)
        }
    })
    

export const emptyCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validdateMongoDbId(_id);

    try {
        const deletecart = await Cart.deleteMany({ userId : _id});
        res.json(deletecart);

    } catch (error) {
        throw new Error(error);
    }
});


export const applyCoupon = asyncHandler(async (req, res) => {
    const { coupon } = req.body;
    const { _id } = req.user;
    validdateMongoDbId(_id);
    try {
        const validCoupon = await Coupon.findOne({ name: coupon });
        if (validCoupon === null) {
            throw new Error(" Invaild Coupon");
        }
        const user = await User.findOne({ _id });
        let { cartTotal } = await Cart.findOne({ orderby: user._id }).populate("products.product");
        let totalAfterDiscount = (cartTotal - (cartTotal * validCoupon.discount) / 100).toFixed(2);
        await Cart.findOneAndUpdate({ orderby: user._id }, { totalAfterDiscount }, { new: true },
        )
        res.json(totalAfterDiscount);

    } catch (error) {
        throw new Error(error);
    }

});




export const getOrderByUserId = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const userorders = await Order.findOne({ _id: id })
            .populate("products.product")
            .populate("orderby")
            .exec();
        res.json(userorders);

    } catch (error) {
        throw new Error(error)
    }
});




export const getMonthWiseOrderIncome = asyncHandler(async (req, res) => {
    let monthNames = ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
            let d = new Date();
            let endDate = "";
            d.setDate(1)
            for (let index = 0; index < 11; index++) {
               d.setMonth(d.getMonth() - 1)
               endDate = monthNames[d.getMonth()] + "" + d.getFullYear()
               
            }
            const data = await Order.aggregate([
                {
                    $match: {
                        createdAt : {
                            $lte: new Date(),
                            $gte : new Date(endDate),
                        }
                    }
                },{ 
                    $group : {
                    _id: {
                        month : "$month",
                    },amount : {$sum:"$totalPriceAfterDiscount"},
                    count : {$sum: 1}
                }
            }
            ]);
            res.json(data);
 });


 export const getYearlyTotalOrders = asyncHandler(async (req, res) => {
    let monthNames = ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
            let d = new Date();
            let endDate = "";
            d.setDate(1)
            for (let index = 0; index < 11; index++) {
               d.setMonth(d.getMonth() - 1)
               endDate = monthNames[d.getMonth()] + "" + d.getFullYear()
               
            }
            const data = await Order.aggregate([
                {
                    $match: {
                        createdAt : {
                            $lte: new Date(),
                            $gte : new Date(endDate),
                        }
                    }
                },{ 
                    $group : {
                    _id:null,
                    count : {$sum: 1 },
                    amount : {$sum:"$totalPriceAfterDiscount"},
                }
            }
            ]);
            res.json(data);
 });