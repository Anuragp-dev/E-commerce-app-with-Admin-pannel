import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";



const getTokenFromLocalStorage = localStorage.getItem('user')
? JSON.parse(localStorage.getItem('user')):null;

// const config = {
//     headers: {
//         'Authorization': `Bearer ${getTokenFromLocalStorage.token}`
//       }
// }


const login = async (user) => {
    const response = await axios.post(`${base_url}user/adminlogin`,user);
   if(response.data){
    localStorage.setItem('user', JSON.stringify(response.data));
   }
   return response.data;
}

const getOrders = async (data) => {
    const response = await axios.get(`${base_url}user/getallorders`, data);
    return response.data;
}

const getOrder = async (id) => {
    const response = await axios.get(`${base_url}user/getaorder/${id}`, config);
    return response.data;
}



const updateOrder = async (data) => {
    const response = await axios.put(`${base_url}user/updateorder/${data.id}`,{status:data?.status }, config);
    return response.data;
}


const getMonthlyOrders = async (data) => {
    const response = await axios.get(`${base_url}user/getmonthincome`,data);
    return response.data;
}


const getYearlyOrders = async (data) => {
    const response = await axios.get(`${base_url}user/getyearlyorders`,data);
    return response.data;
}



const authservice = {
    login,
    getOrders,
    getOrder,
    getMonthlyOrders,
    getYearlyOrders,
    updateOrder,
 

};

export default authservice;


