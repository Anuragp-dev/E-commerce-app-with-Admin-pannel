import axios from "axios";
import { base_url, config } from "../../Utils/axiosConfig";



const register = async (userData) => {
    const response = await axios.post(`${base_url}user/register`, userData);
    if (response.data) {
        return response.data;
    }
};

const login = async (userData) => {
    const response = await axios.post(`${base_url}user/login`, userData);
    if (response.data) {
        localStorage.setItem('customer', JSON.stringify(response.data));
    }
    return response.data;
}


const getUserWishlist = async () => {
    const response = await axios.get(`${base_url}user/wishlist`, config)
    if (response.data) {
        return response.data;
    }
}

const addToCart = async (cartData) => {
    const response = await axios.post(`${base_url}user/cart`, cartData, config)
    if (response.data) {
        return response.data;
    }
}

const getCart = async () => {
    const response = await axios.get(`${base_url}user/getcart`,config);
    if (response.data) {
        return response.data;
    }
}


const updateProductFromCart = async (cartDetail) => {
    
    const response = await axios.delete(`${base_url}user/updatecart/${cartDetail.cartItemId}/${cartDetail.quantity}`, config);
    if (response.data) {
        return response.data;
    }
}

const removeProductFromCart = async (data) => {

    const response = await axios.delete(`${base_url}user/deleteproductcart/${data.id}`, data.config2);
    if (response.data) {
        return response.data;
    }
}


const createOrder = async (orderDetail) => {
    const response = await axios.post(
      `${base_url}user/cart/createorder`,
      orderDetail,
      config
    );
    if (response.data) {
      return response.data;
    }
  };
  

  const getUserOders = async () => {

    const response = await axios.get(`${base_url}user/getmyorders`, config);
    if (response.data) {
        return response.data;
    }
}


const updateProfile = async (data) => {
    
    const response = await axios.put(`${base_url}user/updateuser`, data.data, data.config2 );
    if (response.data) {
        return response.data;
    }
}



const forgotPassToken = async (data) => {
    
    const response = await axios.post(`${base_url}user/forgotpassword`, data);
    if (response.data) {
        return response.data;
    }
}


const resetPass = async (data) => {
    
    const response = await axios.put(`${base_url}user/resetpassword/${data.token}`, {password: data?.password});
    if (response.data) {
        return response.data;
    }
}


const emptyCart = async () => {
    
    const response = await axios.delete(`${base_url}user/emptycart`, config);
    if (response.data) {
        return response.data;
    }
}






export const authService = {
    register,
    login,
    getUserWishlist,
    addToCart,
    getCart,
    removeProductFromCart,
    updateProductFromCart,
    createOrder,
    getUserOders,
    updateProfile,
    forgotPassToken,
    resetPass,
    emptyCart,
}
