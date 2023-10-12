import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteABlog, getBlogs, resetState } from '../features/blogs/blogSlice';
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
    title: 'Blog Name',
    dataIndex: 'title',
  },
  {
    title: ' Blog Category',
    dataIndex: 'category',
  },
  {
    title: 'Number Of Views',
    dataIndex: 'numViews',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
  
  
];



const Bloglist = () => {

  const [open, setOpen] = useState(false);
  const [blogId, setblogId] = useState("");
  const showModal = (event) => {
    setOpen(true);
    setblogId(event);
  };
 
  const hideModal = () => {
    setOpen(false);
  };


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
},[]);
const blogState = useSelector((state) => state.blog.blogs);
const data1 = [];
for (let i = 0; i < blogState.length; i++) {
  data1.push({
    key: i + 1,
    title:blogState[i].title,
    category:blogState[i].category,
    numViews:blogState[i].numViews,
    action: (
      <>
    <Link className='fs-4 text-primary ' to={`/admin/add-blogs/${blogState[i]._id}`}>
      <BiEdit/></Link>
      <button className='ms-3 fs-4 text-danger bg-transparent border-0' onClick={() => showModal(blogState[i]._id)}>
        <AiFillDelete/></button>
    </>
    ),
    
  });
}
const deleteeBlog = (event) => {
  dispatch(deleteABlog(event));
  setOpen(false);
  setTimeout(() =>{
    toast.success('Blog Deleted Successfully!');
    dispatch(getBlogs());
  },200)
}

  return (
   
         <div>
      <h3 className="mb-4 title">Blog List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
     hideModal={hideModal}
     open={open}
     performAction={() => {deleteeBlog(blogId)}}
     title="Are You Sure You Want Delete This Blog?"
     />
    </div>
    
  )
}

export default Bloglist