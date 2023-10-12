import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";



const getPcategory = async () => {
    const response = await axios.get(`${base_url}productcatagory/`);
    return response.data;
}

const createPcategory = async (pcategory) => {
    const response = await axios.post(`${base_url}productcatagory/`, pcategory, config);
    return response.data;
}

const getAProdCat = async (id) => {
    const response = await axios.get(`${base_url}productcatagory/${id}`, config);
    return response.data;
}

const updateProCat = async (category) => {
    const response = await axios.put(
        `${base_url}productcatagory/${category.id}`,
        {title: category.categoryData.title },
        config
        );
    return response.data;
}


const deleteProCat = async (id) => {
    const response = await axios.delete(`${base_url}productcatagory/${id}`, config);
    return response.data;
}





const pcategoryService = {
    getPcategory,
    createPcategory,
    getAProdCat,
    updateProCat,
    deleteProCat,
};


export default pcategoryService;