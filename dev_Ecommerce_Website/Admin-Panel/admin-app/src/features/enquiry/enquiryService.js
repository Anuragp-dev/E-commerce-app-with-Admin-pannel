import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";



const getEnquiries= async () => {
    const response = await axios.get(`${base_url}enquiry/`);
    return response.data;
}

const getEnquiry = async (id) => {
    const response = await axios.get(`${base_url}enquiry/${id}`);
    return response.data;
}

const updateEnquiry = async (enq) => {
    const response = await axios.put(`${base_url}enquiry/${enq.id}`,
    {status: enq.enqData},
    config);
    return response.data;
}


const deleteEnquiries = async (id) => {
    const response = await axios.delete(`${base_url}enquiry/${id}`,config);
    return response.data;
}



const enquiryService = {
    getEnquiries,
    deleteEnquiries,
    getEnquiry,
    updateEnquiry,
};


export default enquiryService;