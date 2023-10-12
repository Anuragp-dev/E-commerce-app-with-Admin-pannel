import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deletePcategory, getAPcategory, getPcategory, resetState } from '../features/productCategory/pcategorySlice';
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
    title: ' Product Category Name',
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

const Categorylist = () => {

  const [open, setOpen] = useState(false);
  const [procatId, setprocatId] = useState("");
  const showModal = (event) => {
    setOpen(true);
    setprocatId(event);
  };
 
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getPcategory());
  },[]);
  const pcategoryState = useSelector((state) => state.pcategory.pcategorys);
  const data1 = [];
  for (let i = 0; i < pcategoryState.length; i++) {
  data1.push({
    key: i + 1,
    title: pcategoryState[i].title,
    createdAt: pcategoryState[i].createdAt,
    updatedAt: pcategoryState[i].updatedAt,
    action: (
      <>
    <Link className='fs-4 text-primary' to={`/admin/category/${pcategoryState[i]._id}`}
    ><BiEdit/></Link>
    <button className='ms-3 fs-4 text-danger bg-transparent border-0' onClick={() => showModal(pcategoryState[i]._id)}>
      <AiFillDelete/></button>
    </>
    ),
   
  });
}
const deleteProductcategory = (event) => {
  dispatch(deletePcategory(event));
  setOpen(false);
  setTimeout(() =>{
    toast.success('Product Category Deleted Successfully!');
    dispatch(getPcategory());
  },100)
}
  return (
    <div>
    <h3 className="mb-4 title">Products Category List</h3>
    <div>
      <Table columns={columns} dataSource={data1} />
    </div>
    <CustomModal
    hideModal={hideModal}
    open={open}
    performAction={() => {deleteProductcategory(procatId)}}
    title="Are You Sure You Want Delete This Product Category?"
    />
  </div>
  )
}

export default Categorylist