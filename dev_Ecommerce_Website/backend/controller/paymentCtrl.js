import Razorpay from "razorpay";

const instance = new Razorpay({
    key_id:"rzp_test_fy9XWwx6AjUWhm",
    key_secret:"CremWwW4879tLO0dp56IOWCm",
})


export const checkout = async (req,res) => {
    const {amount} = req.body
    const option = {
        amount : amount * 100,
        currency: "INR",
    }
    
    const order = await instance.orders.create(option)
    res.json({
        success : true,
        order,
    })
}


export const paymentVerification = async (req,res) => {
   const {razorpayOrderId, razorpayPaymentId} = req.body;
   res.json({
    razorpayOrderId,
    razorpayPaymentId,
   })
}