import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { deleteAEnquiry, getEnquiries, resetState, updateAEnquiry } from '../features/enquiry/enquirySlice';
import CustomModal from '../components/CustomModal';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

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
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile',
  },

  {
    title: 'Comment',
    dataIndex: 'comment',
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


const Enquiries = () => {

  const [open, setOpen] = useState(false);
  const [enqId, setenqId] = useState("");
  const showModal = (event) => {
    setOpen(true);
    setenqId(event);
  };
 
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getEnquiries());
  }, [])
  const enquiryState = useSelector((state) => state.enquiry.enquiries);

  const data1 = [];
  for (let i = 0; i < enquiryState.length; i++) {
    data1.push({
      key: i + 1,
      name: enquiryState[i].name,
      email: enquiryState[i].email,
      mobile: enquiryState[i].mobile,
      comment: enquiryState[i].comment,
      status: (
        <>
           <select name="" defaultValue= {enquiryState[i].status ? enquiryState[i].status : "Submitted"}
            className='form-control form-select' id="" 
            onChange={(event) => setEnquiryStatus(event.target.value, enquiryState[i]._id)}
            >
            
            <option value="Submitted">Submitted</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved" >Resolved</option>
        </select>
        </>

      ),
      action: (
        <>
          <Link className='ms-3 fs-4 text-primary' to={`/admin/enquiries/${enquiryState[i]._id}`}><AiFillEye /></Link>
          <button className='ms-3 fs-4 text-danger bg-transparent border-0' onClick={() => showModal(enquiryState[i]._id)} >
            <AiFillDelete /></button> 
        </>
      ),


    });
  }
  const setEnquiryStatus = (event, i) => {
console.log(event, i);
const data = {id: i, enqData: event};
dispatch(updateAEnquiry(data));
  }

  const deletesEnquiry = (event) => {
    dispatch(deleteAEnquiry(event));
    setOpen(false);
    setTimeout(() =>{
      toast.success('Enquiry Deleted Successfully!');
      dispatch(getEnquiries());
    },200)
  }


  return (
    <div>
      <h3 className="mb-4 title"> Enquiries</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
     hideModal={hideModal}
     open={open}
     performAction={() => {deletesEnquiry(enqId)}}
     title="Are You Sure You Want Delete This Enquiries?"
     />
    </div>
  )
}

export default Enquiries;