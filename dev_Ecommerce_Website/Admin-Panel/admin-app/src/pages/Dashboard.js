import React from 'react';
import {BsArrowDownRight , BsArrowUpRight} from "react-icons/bs";
import { Column } from '@ant-design/plots';
import {  Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getMonthlyData, getOrders, getYearlyData } from '../features/auth/authSlice';
import { useState } from 'react';

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
    title: 'Product Count',
    dataIndex: 'product',
  },
  {
    title: 'Total Price',
    dataIndex: 'price',
  },
  {
    title: 'Product Price After Discount',
    dataIndex: 'dprice',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
];


const Dashboard = () => {
  const dispatch = useDispatch();
  const monthlyDataState = useSelector((state) => state?.auth?.monthlyData);
  const yearlyDataState = useSelector((state) => state?.auth?.yearlyData);
  const orderState = useSelector((state) => state?.auth?.orders?.orders);
  const [dataMontly, setDataMonthly] = useState([]);
  const [dataMontlySales, setDataMonthlySales] = useState([]);
  const [orderData, setOrderData] = useState([]);



  

const getTokenFromLocalStorage = localStorage.getItem('user')
? JSON.parse(localStorage.getItem('user')):null;

 const config3 = {
    headers: {
        'Authorization': `Bearer ${ getTokenFromLocalStorage!==null ? getTokenFromLocalStorage.token: ""}`
      },
      
};




  useEffect(() => {
dispatch(getMonthlyData(config3));
dispatch(getYearlyData(config3));
dispatch(getOrders(config3))
  }, []);
 

  useEffect(() => {
    let monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let data = [];
    let monthlyOrderCount = [];
for (let index = 0; index < monthlyDataState?.length; index++) {
  const element = monthlyDataState[index];
  data.push({type: monthNames[element?._id?.month],income:element?.amount})
  monthlyOrderCount.push({ type: monthNames[element?._id?.month],sales:element?.count })
}
  setDataMonthly(data);
  setDataMonthlySales(monthlyOrderCount)
  const data1 = [];
for (let i = 0; i < orderState?.length; i++) {
  data1.push({
    key: i,
    name: orderState[i]?.user?.firstname + orderState[i]?.user?.lastname,
    product:orderState[i]?.orderItems?.length,
    price:orderState[i]?.totalPrice,
    dprice:orderState[i]?.totalPriceAfterDiscount,
    status:orderState[i]?.orderStatus,
  });
}
setOrderData(data1)

  }, [monthlyDataState , yearlyDataState]);


  const config = {
    data : dataMontly,
    xField: 'type',
    yField: 'income',
    color : ({type}) => {
      return "#ffd333";
    },
    label: {
      
      position: 'middle',
      
      style: {
        fill: '#FFFFFF',
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Months',
      },
      sales: {
        alias: 'Income',
      },
    },
  };

  const config2 = {
    data : dataMontlySales,
    xField: 'type',
    yField: 'sales',
    color : ({type}) => {
      return "#ffd333";
    },
    label: {
      
      position: 'middle',
      
      style: {
        fill: '#FFFFFF',
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Months',
      },
      sales: {
        alias: 'Sales',
      },
    },
  };


  return (
    <div>
      <h3 className='mb-4 title'>Dashboard</h3>
      <div className='d-flex justify-content-between align-items-center gap-3'>
        <div className='d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
            <div>
              <p  className='desc'>Total Income</p>
              {/* {yearlyDataState[0]?.count} */}
              <h4 className='mb-0 sub-title'>₹{yearlyDataState && yearlyDataState[0]?.amount}</h4>
            </div>
            <div className='d-flex-column align-items-end'>
              <h6 className='green'>
                <BsArrowUpRight/> 75%</h6>
              <p  className='mb-0 desc'>Income In Last Year From Today</p>
            </div>
        </div>
        <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
            <div>
              <p className='desc'>Total Sales</p>
              {/* {yearlyDataState[0]?.count} */}
              <h4 className='mb-0 sub-title' >{yearlyDataState && yearlyDataState[0]?.count}</h4>
            </div>
            <div className='d-flex-column align-items-end'>
              <h6 className='red'>
                <BsArrowDownRight/> 12%</h6>
              <p className='mb-0 desc' >Sales In Last Year</p>
            </div>
        </div>
       
      </div>
    <div className='d-flex justify-content-between gap-3'>
    <div className="mt-4 flex-grow-1 w-50">
        <h3 className='mb-5'>Income Statics</h3>
        <div>
        <Column {...config} />
        </div>
      </div>
      <div className="mt-4">
        <h3 className='mb-5'>Sales Statics</h3>
        <div>
        <Column {...config2} />
        </div>
      </div>
    </div>
      <div className="mt-4">
        <h3 className="mb-5">
          Recent Orders
        </h3>
        <div>
        <Table  columns={columns} dataSource={orderData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
