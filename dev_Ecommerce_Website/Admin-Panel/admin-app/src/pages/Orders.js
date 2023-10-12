import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import { AiFillDelete } from "react-icons/ai";
import { useEffect } from 'react';
import { getOrders, updateAOrder } from '../features/auth/authSlice';
import {BiEdit} from "react-icons/bi";


const columns = [
  {
    title: 'SNO',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Product',
    dataIndex: 'product',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
  {
    title: 'Date',
    dataIndex: 'date',
  },

  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];


const Orders = () => {
  const dispatch = useDispatch();

  const getTokenFromLocalStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user')):null;
  
   const config4 = {
      headers: {
          'Authorization': `Bearer ${ getTokenFromLocalStorage!==null ? getTokenFromLocalStorage.token: ""}`
        },
        
  };



  useEffect(()=>{
    dispatch(getOrders(config4));
  },[dispatch]);

  const orderState = useSelector((state) => state?.auth?.orders?.orders);
  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i]?.user?.firstname,
      product: (
          <Link to={`/admin/order/${orderState[i]?._id}`}>View Orders</Link>
      ),
        
      amount: orderState[i]?.totalPrice,
      date: new Date(orderState[i].createdAt).toLocaleString(),
      
      action: (
        <>
        <select defaultValue={orderState[i]?.orderStatus}
         onChange={(event)=> {updateOrderStatus(orderState[i]?._id ,event.target.value)}}
          className='form-control form-select' name="" id="">
          
          <option value="Ordered" disabled >Ordered</option>
          <option value="Processed">Processed</option>
          <option value="Dispatched">Dispatched</option>
          <option value="Shipped">Shipped</option>
          <option value="Out Of Delivery">Out Of Delivery</option>
          <option value="Delivered"> Delivered</option>
        </select>
      </>
      ),
    });
  }

  const updateOrderStatus = (id,status) => {
    dispatch(updateAOrder({id:id , status:status}));
  }
  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
    
  )
}

export default Orders;