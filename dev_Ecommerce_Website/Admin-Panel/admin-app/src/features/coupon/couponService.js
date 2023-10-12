import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";




const getCoupons = async () => {
    const response = await axios.get(`${base_url}coupon/`,config);
    return response.data;
}



const createCoupons = async (coupon) => {
    const response = await axios.post(`${base_url}coupon/`, coupon, config);
    return response.data;
}

const getCoupon = async (id) => {
    const response = await axios.get(`${base_url}coupon/${id}`,config);
    return response.data;
}

const updateCoupon = async (coupon) => {
    const response = await axios.put(`${base_url}coupon/${coupon.id}`,
    {
        name: coupon.couponData.name,
        expiry: coupon.couponData.expiry,
        discount: coupon.couponData.discount,
    },
    config
    );
    return response.data;
}


const deleteCoupons = async (id) => {
    const response = await axios.delete(`${base_url}coupon/${id}`,config);
    return response.data;
}





const couponService  = {
   getCoupons,
   createCoupons,
   getCoupon,
   updateCoupon,
   deleteCoupons,
};


export default couponService;