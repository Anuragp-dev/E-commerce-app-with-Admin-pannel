import axios from "axios";
import { base_url, config } from "../../Utils/axiosConfig";




const getProducts = async (data) => {
    const respone = await axios.get(`${base_url}product?${data?.brand ? `brand=${data?.brand}&&`: ""}${data?.tag ? `tags=${data?.tag}&&`: ""}${data?.category ? `category=${data?.category}&&`: ""}${data?.minPrice ? `price[gte]=${data?.minPrice}&&`: ""}${data?.maxPrice ? `price[lte]=${data?.maxPrice}&&`: ""}${data?.sort ? `sort=${data?.sort}&&`: ""} `);
    if(respone.data) {
        return respone.data;
    }
};

const getAProduct = async (id) => {
    const respone = await axios.get(`${base_url}product/${id}`,config);
    if(respone.data) {
        return respone.data;
    }
};


const addToWishlist = async (prodId) => {
    const respone = await axios.put(`${base_url}product/wishlist`, {prodId },config);
    if(respone.data) {
        return respone.data;
    }
};



const rateProduct = async (data) => {
    const respone = await axios.put(`${base_url}product/rating`,data,config);
    if(respone.data) {
        return respone.data;
    }
};



export const  productService = {
    getProducts,
    addToWishlist,
    getAProduct,
    rateProduct,
    
}
