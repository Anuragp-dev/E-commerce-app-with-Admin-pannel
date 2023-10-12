import  { useEffect,useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {BiEdit} from "react-icons/bi";
import {AiFillDelete} from "react-icons/ai";
import { deleteAColor, getColors, resetState } from '../features/color/colorSlice';
import CustomModal from '../components/CustomModal';
import { toast } from 'react-toastify';



const columns = [
  {
    title: 'SNO',
    dataIndex: 'key',
  },
  {
    title: 'Colour Name',
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

const Colorlist = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setcolorId] = useState("");
  const showModal = (event) => {
    setOpen(true);
    setcolorId(event)
  };
 
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(resetState());
    dispatch(getColors());
  },[]);

  const colorState = useSelector((state) => state.color.colors);
  const data1 = [];
  for (let i = 0; i < colorState.length; i++) {
    data1.push({
      key: i + 1,
      title: colorState[i].title,
      createdAt: colorState[i].createdAt,
      updatedAt: colorState[i].updatedAt,
      action: (
        <>
      <Link className='fs-4 text-primary' to={`/admin/color/${colorState[i]._id}`}>
        <BiEdit/></Link>
      <button className='ms-3 fs-4 text-danger bg-transparent border-0'
      onClick={()=> showModal(colorState[i]._id)}>
        <AiFillDelete/></button>
      </>
      ),
    });
  }
const deleteColor = (event) => {
  dispatch(deleteAColor(event));
  setOpen(false);
  setTimeout(() =>{
    toast.success('Color Deleted Successfully!');
    dispatch(getColors());
  },200)

}

  return (
    <div>
    <h3 className="mb-4 title"> Colour List</h3>
    <div>
      <Table columns={columns} dataSource={data1} />
    </div>
    <CustomModal
     hideModal={hideModal}
     open={open}
     performAction={() => {deleteColor(colorId)}}
     title="Are You Sure You Want Delete This Color?"
     />
  </div>
  );
}

export default Colorlist;
