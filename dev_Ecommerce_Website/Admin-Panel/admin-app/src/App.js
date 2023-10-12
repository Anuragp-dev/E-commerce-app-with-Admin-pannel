import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import Enquiries from './pages/Enquiries';
import Bloglist from './pages/Bloglist';
import Blogcatlist from './pages/Blogcatlist';
import Orders from './pages/Orders';
import Customer from './pages/Customer';
import Colorlist from './pages/Colorlist';
import Categorylist from './pages/Categorylist';
import Brandlist from './pages/Brandlist';
import Productlist from './pages/Productlist';
import Addblog from './pages/Addblog';
import Addblogcat from './pages/Addblogcat';
import Addcolor from './pages/Addcolor';
import Addcat from './pages/Addcat';
import Addbrand from './pages/Addbrand';
import Addproduct from './pages/Addproduct';
import Couponlist from './pages/Couponlist';
import AddCoupon from './pages/AddCoupon';
import ViewEnquiry from './pages/ViewEnquiry';
import ViewOrder from './pages/ViewOrder';
import { PrivateRoutes } from './routing/PrivateRoutes';
import { OpenRoutes } from './routing/OpenRoutes';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<OpenRoutes><Login /></OpenRoutes>} />
          <Route path='/admin' element={<PrivateRoutes><MainLayout /></PrivateRoutes>}>
            <Route index element={<Dashboard />} />
            <Route path='enquiries' element={<Enquiries />} />
            <Route path='enquiries/:id' element={<ViewEnquiry/> } />
            <Route path='blog-list' element={<Bloglist />} />
            <Route path='coupon-list' element={<Couponlist />} />
            <Route path='coupon' element={<AddCoupon />} />
            <Route path='coupon/:id' element={<AddCoupon />} />
            <Route path='add-blog-category' element={<Addblogcat />} />
            <Route path='add-blog-category/:id' element={<Addblogcat />} />
            <Route path='add-blogs' element={<Addblog />} />
            <Route path='add-blogs/:id' element={<Addblog />} />
            <Route path='blog-category-list' element={<Blogcatlist />} />
            <Route path='orders' element={<Orders/>} />
            <Route path='order/:id' element={<ViewOrder/> } />
            <Route path='customers' element={<Customer />} />
            <Route path='list-color' element={<Colorlist />} />
            <Route path='color' element={<Addcolor />} />
            <Route path='color/:id' element={<Addcolor />} />
            <Route path='list-category' element={<Categorylist />} />
            <Route path='list-brand' element={<Brandlist />} />
            <Route path='brand' element={<Addbrand />} />
            <Route path='brand/:id' element={<Addbrand />} />
            <Route path='product-list' element={<Productlist />} />
            <Route path='product' element={<Addproduct />} />
            <Route path='category' element={<Addcat />} />
            <Route path='category/:id' element={<Addcat />} />
          </Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
