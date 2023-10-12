import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";



const getProducts = async () => {
    const response = await axios.get(`${base_url}product/`);
    return response.data;
}

const createProducts = async (product) => {
    const response = await axios.post(`${base_url}product/`, product, config);
    return response.data;
}


const productService = {
    getProducts,
    createProducts,
    
};


export default productService;