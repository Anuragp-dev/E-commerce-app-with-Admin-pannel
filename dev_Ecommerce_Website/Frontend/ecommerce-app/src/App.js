import React from 'react';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import OurStore from './pages/OurStore';
import Blog from './pages/Blog';
import CompareProduct from './pages/CompareProduct';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Forgotpassword from './pages/Forgotpassword';
import Resetpassword from './pages/Resetpassword';
import Singleblog from './pages/Singleblog';
import Shippingpolicy from './pages/Shippingpolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsandCondition from './pages/TermsandCondition';
import Refundpolicy from './pages/Refundpolicy';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { PrivateRoutes } from './routing/PrivateRoutes';
import { OpenRoutes } from './routing/OpenRoutes';
import Orders from './pages/Orders';
import Profile from './pages/Profile';



function App() {
  return (
    <>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Layout/>}>
    <Route index element={<Home/>}/>
    <Route path='about' element={<About/>}/>
    <Route path='contact' element={<Contact/>}/>
    <Route path='product' element={<OurStore/>}/>
    <Route path='product/:id' element={<SingleProduct/>}/>
    <Route path='blogs' element={<Blog/>}/>
    <Route path='blog/:id' element={<Singleblog/>}/>
    <Route path='cart' element={<PrivateRoutes><Cart/></PrivateRoutes>}/>
    <Route path='my-orders' element={<PrivateRoutes><Orders/></PrivateRoutes>}/>
    <Route path='my-profile' element={<PrivateRoutes><Profile/></PrivateRoutes>}/>
    <Route path='checkout' element={<PrivateRoutes><Checkout/></PrivateRoutes>}/>
    <Route path='compare' element={<CompareProduct/>}/>
    <Route path='wishlist' element={<PrivateRoutes><Wishlist/></PrivateRoutes>}/>
    <Route path='signup' element={<OpenRoutes><Signup/></OpenRoutes>}/>
    <Route path='login' element={<OpenRoutes><Login/></OpenRoutes>}/>
    <Route path='forgotpassword' element={<Forgotpassword/>}/>
    <Route path='resetpassword/:token' element={<Resetpassword/>}/>
    <Route path='shipping' element={<Shippingpolicy/>}/>
    <Route path='termandcondition' element={<TermsandCondition/>}/>
    <Route path='Privacy' element={<PrivacyPolicy/>}/>
    <Route path='refund' element={<Refundpolicy/>}/>
</Route>
  
  </Routes>
  </BrowserRouter>
  
   </>
  );
  }

export default App;
