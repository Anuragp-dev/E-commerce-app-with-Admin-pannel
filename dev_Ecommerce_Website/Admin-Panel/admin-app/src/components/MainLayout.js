import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiSolidDashboard, BiCategoryAlt, BiSolidColorFill, BiLogoBlogger, BiLogoAirbnb,BiStore ,BiSolidCoupon,BiSolidDiscount} from "react-icons/bi";
import { BsPeopleFill, BsFillCartCheckFill, BsListStars, BsList, BsListOl, BsDiscord } from "react-icons/bs";
import { MdProductionQuantityLimits } from "react-icons/md";
import { AiOutlineBgColors ,AiOutlineLogout } from "react-icons/ai";
import { MdNotificationsActive } from "react-icons/md"
import { SiBrandfolder } from "react-icons/si";
import { FaClipboardList, FaMicroblog, FaBlogger, FaHeadset } from "react-icons/fa";
import { ImBlog } from "react-icons/im";
import { Link, useNavigate } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Outlet } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className='text-dark fs-5 text-center py-3 mb-0'>
            <span className='sm-logo '><BsDiscord className='fs-1' /></span>

            <span className='lg-logo'>
              <b>DEV CORNER</b>
            </span>
            <br />
            <div className=' admin bg-white lg-logo'><b>ADMIN</b></div>
            {/* <span className='text-danger lg-logo'>Admin</span> */}
          </h2>

        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({ key }) => {
            if (key === 'signout') {
              localStorage.clear()
              window.location.reload()
              

            } else {
              navigate(key)
            }
          }}
          items={[
            {
              key: '',
              icon: <BiSolidDashboard className='fs-5' />,
              label: 'DashBoard',
            },

            {
              key: 'customers',
              icon: <BsPeopleFill className='fs-5' />,
              label: 'Customers',
            },

            {
              key: 'catalog',
              icon: <BiLogoAirbnb className=' fs-5' />,
              label: 'Catalog',
              children: [
                {
                  key: 'product',
                  icon: <BsFillCartCheckFill className='fs-5' />,
                  label: 'Add product',
                },

                {
                  key: 'product-list',
                  icon: <MdProductionQuantityLimits className='fs-5' />,
                  label: 'Product List',
                },

                {
                  key: 'brand',
                  icon: <SiBrandfolder className='fs-5' />,
                  label: 'Brands',
                },

                {
                  key: 'list-brand',
                  icon: <BsListStars className='fs-5' />,
                  label: 'Brands List',
                },

                {
                  key: 'category',
                  icon: <BiCategoryAlt className='fs-5' />,
                  label: 'Category ',
                },

                {
                  key: 'list-category',
                  icon: <BsList className='fs-5' />,
                  label: 'Category List',
                },

                {
                  key: 'color',
                  icon: <BiSolidColorFill className='fs-5' />,
                  label: 'Color ',
                },

                {
                  key: 'list-color',
                  icon: <AiOutlineBgColors className='fs-5' />,
                  label: 'Color List',
                },


              ],


            },

            {
              key: 'orders',
              icon: <FaClipboardList className='fs-5' />,
              label: 'Orders',
            },

            {
              key: 'blog',
              icon: <BiLogoBlogger className='fs-5' />,
              label: 'Blogs',
              children: [
                {
                  key: 'add-blogs',
                  icon: <ImBlog className='fs-5 ' />,
                  label: 'Add Blogs',
                },

                {
                  key: 'blog-list',
                  icon: <FaMicroblog className='fs-5 ' />,
                  label: ' Blogs List',
                },

                {
                  key: 'add-blog-category',
                  icon: <FaBlogger className='fs-5' />,
                  label: ' Add Blogs Category',
                },

                {
                  key: 'blog-category-list',
                  icon: <BsListOl className='fs-5 ' />,
                  label: ' Blogs Category List',
                },


              ]
            },

            {
              key: 'marketing',
              icon: <BiStore className='fs-5' />,
              label: 'Marketing',
              children: [
                {
                  key: 'coupon',
                  icon: <BiSolidCoupon className='fs-5 ' />,
                  label: 'Add Coupon',
                },

                {
                  key: 'coupon-list',
                  icon: <BiSolidDiscount className='fs-5 ' />,
                  label: ' Coupon List',
                },

               

               


              ]
            },



            {
              key: 'enquiries',
              icon: <FaHeadset className='fs-5 ' />,
              label: ' Enquries',
            },

            {
              key: 'signout',
              icon: <AiOutlineLogout className='fs-5 ' />,
              label: ' Logout',
            },



          ]}
        />
      </Sider>
      <Layout>
        <Header className='d-flex justify-content-between ps-1 pe-5'
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div className='d-flex gap-4 align-items-center'>
            <div className='position-relative'><MdNotificationsActive className='fs-4' />
              <span className='badge bg-warning rounded-circle p-1 position-absolute'>3</span></div>
            <div className='d-flex gap-3 align-items-center dropdown'>
              <div className='' >
                <img width={50} height={50} src="https://i.pinimg.com/736x/26/61/9c/26619c16b5451afaa95956dff93ae3e5.jpg" alt="user" />
              </div>
            </div>
            <div role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <h5 className='mb-0'>Abhijith</h5>
              <p className='mb-0'>abhijith123@gmail.com</p>
            </div>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li className=''><Link to='' className="dropdown-item py-1 mb-1" style={{height:"auto",lineHeight:"20px"}}>View Profile</Link></li>
              <li className=''><Link to='' className="dropdown-item py-1 mb-1" style={{height:"auto",lineHeight:"20px"}}>Settings</Link></li>
              <li className=''><Link to='' className="dropdown-item py-1 mb-1" style={{height:"auto",lineHeight:"20px"}}>Sign Out</Link></li>
             
            </div>

          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="dark"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;