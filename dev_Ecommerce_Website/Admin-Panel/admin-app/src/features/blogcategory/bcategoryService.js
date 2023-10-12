import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";


const createBlogcategory = async (blogcategory) => {
    const response = await axios.post(`${base_url}blogcatagory/`,blogcategory,config);
    return response.data;
}

const getBcategories = async () => {
    const response = await axios.get(`${base_url}blogcatagory/`);
    return response.data;
}

const getBCategory = async (id) => {
    const response = await axios.get(`${base_url}blogcatagory/${id}`, config);
    return response.data;
}

const updateBCategory = async (bcategory) => {
    const response = await axios.put(
        `${base_url}blogcatagory/${bcategory.id}`,
        {title: bcategory.bcategoryData.title },
        config );
        return response.data;
    }
    

    const deleteBCategory = async (id) => {
        const response = await axios.delete(`${base_url}blogcatagory/${id}`, config);
        return response.data;
    }
    




const bcategoryService = {
    getBcategories,
    createBlogcategory,
    getBCategory,
    updateBCategory,
    deleteBCategory,
};


export default bcategoryService;