import  { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {BiEdit} from "react-icons/bi";
import {AiFillDelete} from "react-icons/ai";
import { deleteABcategory, getAllBcategories, resetState } from '../features/blogcategory/bcategorySlice';
import CustomModal from '../components/CustomModal';
import { toast } from 'react-toastify';



const columns = [
  {
    title: 'SNO',
    dataIndex: 'key',
  },
  {
    title: 'Blog Category Name',
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

const Blogcatlist = () => {

  const [ open, setOpen ] = useState(false);
  const [ bcategoryId, setBcatrgoryId ] = useState("");
  const showModal = (event) => {
    setOpen(true);
    setBcatrgoryId(event)
  };
 
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getAllBcategories());
  },[]);
  const bcategoryState = useSelector((state) => state.bcategory.bcategories);
 
  const data1 = [];
  for (let i = 0; i < bcategoryState.length; i++) {
  data1.push({
    key: i + 1,
    title:bcategoryState[i].title,
    createdAt: bcategoryState[i].createdAt,
    updatedAt: bcategoryState[i].updatedAt,
  
    action: (
      <>
    <Link className='fs-4 text-primary' to={`/admin/add-blog-category/${bcategoryState[i]._id }`}
    ><BiEdit/></Link>
    <button className='ms-3 fs-4 text-danger bg-transparent border-0'
       onClick={() => showModal(bcategoryState[i]._id)}>
        <AiFillDelete/></button>
    </>
    ),
   
  });
}

const deleteBcategory = (event) => {
  dispatch(deleteABcategory(event));
  setOpen(false);
    setTimeout(() =>{
      toast.success('Blog Category Deleted Successfully!');
      dispatch(getAllBcategories());
    },200)
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
     performAction={() => {deleteBcategory(bcategoryId)}}
     title="Are You Sure You Want Delete This Blog Category?"
     />
  </div>
  )
}

export default Blogcatlist;