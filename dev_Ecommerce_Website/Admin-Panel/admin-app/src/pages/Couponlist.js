import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {BiEdit} from "react-icons/bi";
import {AiFillDelete} from "react-icons/ai";
import { deleteACoupon, getAllCoupon, resetState } from '../features/coupon/couponSlice';
import CustomModal from '../components/CustomModal';
import { toast } from 'react-toastify';





const columns = [
  {
    title: 'SNO',
    dataIndex: 'key',
  },
  {
    title: 'Coupon Name',
    dataIndex: 'name',
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: 'Discount (%)',
    dataIndex: 'discount',
  },
  {
    title: 'Expiry',
    dataIndex: 'expiry',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const Couponlist = () => {
  let percentage = "%"

  const [open, setOpen] = useState(false);
  const [couponId, setcouponId] = useState("");
  const showModal = (event) => {
    setOpen(true);
    setcouponId(event)
  };
 
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(resetState())
    dispatch(getAllCoupon());
  },[]);
  const couponState = useSelector((state) => state.coupon.coupons);
  const data1 = [];
  for (let i = 0; i <couponState.length; i++) {
    data1.push({
      key: i + 1,
      name :couponState[i].name,
      discount:couponState[i].discount + percentage,
      expiry:new Date(couponState[i].expiry).toLocaleString(),
      action: (
        <>
      <Link className='fs-4 text-primary ' to={`/admin/coupon/${couponState[i]._id}`}><BiEdit/></Link>
      <button className='ms-3 fs-4 text-danger bg-transparent border-0' onClick={() => showModal(couponState[i]._id)} >
        <AiFillDelete/></button>
      </>
      ),
    });
  }
  const deleteCoupon = (event) => {
    dispatch(deleteACoupon(event));
    setOpen(false);
    setTimeout(() =>{
      toast.success('Brand Deleted Successfully!');
      dispatch(getAllCoupon());
    },200)
  }
  return (
    <div>
    <h3 className="mb-4 title"> Coupon List</h3>
    <div>
      <Table columns={columns} dataSource={data1} />
    </div>
    <CustomModal
     hideModal={hideModal}
     open={open}
     performAction={() => {deleteCoupon(couponId)}}
     title="Are You Sure You Want Delete This Coupon?"
     />
  </div>
  );
}

export default Couponlist;
