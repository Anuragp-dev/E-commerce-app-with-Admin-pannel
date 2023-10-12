import {useDispatch, useSelector} from 'react-redux';
import { Table } from 'antd';
import { useEffect } from 'react';
import { getProducts } from '../features/product/productSlice';
import { Link } from 'react-router-dom';
import {BiEdit} from "react-icons/bi";
import {AiFillDelete} from "react-icons/ai";

const columns = [
  {
    title: 'SNO',
    dataIndex: 'key',
  },
  {
    title: 'Products Name',
    dataIndex: 'title',
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: 'Category',
    dataIndex: 'category',
    sorter: (a, b) => a.catagory.length - b.catagory.length,
  },

  {
    title: 'Quantity',
    dataIndex: 'quantity',
    sorter: (a, b) => a.quantity - b.quantity
  },
  {
    title: 'Colour',
    dataIndex: 'color',
  },

  {
    title: 'Price',
    dataIndex: 'price',
    sorter: (a, b) => a.price - b.price
  },

  {
    title: 'Action',
    dataIndex: 'action',
  },
 
];



const Productlist = () => {
  const dispatch = useDispatch()
  useEffect(()=> {
  dispatch(getProducts());
  },[]);
  const productState = useSelector((state) => state.product.products);
  const data1 = [];
for (let i = 0; i < productState.length; i++) {
  data1.push({
    key: i + 1,
    title: productState[i].title,
    brand: productState[i].brand,
    category: productState[i].category,
    price:`₹ ${productState[i].price}`,
    quantity: productState[i].quantity,
    color: productState[i].color,
    action: (
      <>
    <Link className='fs-4 text-primary' to='/'><BiEdit/></Link>
    <Link className='ms-3 fs-4 text-danger' to='/'><AiFillDelete/></Link>
    </>
    ),
   
  });
}
  return (
    <div>
    <h3 className="mb-4 title">Products  List</h3>
    <div>
      <Table columns={columns} dataSource={data1} />
    </div>
  </div>
  )
}

export default Productlist;