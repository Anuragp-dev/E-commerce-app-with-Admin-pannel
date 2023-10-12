import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteABrand,getBrands, resetState } from '../features/brand/brandSlice';
import { Link } from 'react-router-dom';
import {BiEdit} from "react-icons/bi";
import {AiFillDelete} from "react-icons/ai";
import CustomModal from '../components/CustomModal';
import { toast } from 'react-toastify';



const columns = [
  {
    title: 'SNO',
    dataIndex: 'key',
  },
  {
    title: 'Brand Name',
    dataIndex: 'title',
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
  },
  {
    title: 'Updated At',
    dataIndex: 'updatedAt',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const Brandlist = () => {
  const [open, setOpen] = useState(false);
  const [brandId, setbrandId] = useState("");
  const showModal = (event) => {
    setOpen(true);
    setbrandId(event)
  };
 
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(resetState());
    dispatch(getBrands());
  },[]);
  
  const brandState = useSelector((state) => state.brand.brands);
  const data1 = [];
  for (let i = 0; i < brandState.length; i++) {
    data1.push({
      key: i + 1,
      title: brandState[i].title,
      createdAt: brandState[i].createdAt,
      updatedAt: brandState[i].updatedAt,
      action: (
        <>
      <Link className='fs-4 text-primary' to={`/admin/brand/${brandState[i]._id}`}
      ><BiEdit/></Link>
      <button className='ms-3 fs-4 text-danger bg-transparent border-0'
       onClick={() => showModal(brandState[i]._id)}>
        <AiFillDelete/></button>
      </>
      ),
    });
  }
  const deleteBrand = (event) => {
    dispatch(deleteABrand(event));
    setOpen(false);
    setTimeout(() =>{
      toast.success('Brand Deleted Successfully!');
      dispatch(getBrands());
    },200)
    
   }

  return (
    <div>
    <h3 className="mb-4 title"> Brands List</h3>
    <div>
      <Table columns={columns} dataSource={data1} />
    </div>
    <CustomModal
     hideModal={hideModal}
     open={open}
     performAction={() => {deleteBrand(brandId)}}
     title="Are You Sure You Want Delete This Brand?"
     />
  </div>
  );
}

export default Brandlist;
