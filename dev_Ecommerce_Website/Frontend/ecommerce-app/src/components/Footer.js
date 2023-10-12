import React from 'react';
import { Link } from 'react-router-dom';
import {BsInstagram, BsFacebook, BsTwitter, BsYoutube} from "react-icons/bs";
import newsletter from "../images/newsletter.png";
const Footer = () => {
  return (
   <>
  <footer className='py-4'>
    <div className="container-xxl">
      <div className="row align-items-center">
        <div className="col-5">
          <div className="footer-top-data d-flex align-items-center gap-30">
            <img src={newsletter} alt="newsletters" />
            <h2 className="mb-0 text-white">Sign Up For Newsletter</h2>
          </div>
        </div>
        <div className="col-7">
        <div className="input-group ">
                <input type="text" className="form-control py-1"
                  placeholder="Your Email Address" aria-label="Your Email Address"
                  aria-describedby="basic-addon2" />
                <span className="input-group-text p-2" id="basic-addon2">
                Subscribe
                </span>
              </div>
        </div>
      </div>
    </div>
  </footer>
  <footer className='py-4'>
    <div className="container-xxl">
      <div className="row">
        <div className="col-4">
          <h4 className='text-white mb-4'>Contact Us</h4>
          <div>
            <address className='text-white fs-6'>Hno : 277 Near Pallickal City,<br/>
              Kerala,India <br/>
              PinCode:690504
            </address>
            <a href="tel: +91 787898787" className='mt-3 d-block mb-1 text-white '>+91 787898787</a>
            <a href="mailto: abhijithp123@gamil.com " className='mt-2 d-block mb-0 text-white'>abhijithp123.gamil.com </a>
            <div className="social_icons d-flex align-items-center gap-30 mt-4">
             <a className='text-white ' href="">
              <BsTwitter className=' fs-4'  />
             </a>
             <a className='text-white' href="">
              <BsFacebook className=' fs-4' />
             </a>
             <a  className='text-white' href="">
              <BsInstagram className=' fs-4' />
             </a>
             <a className='text-white' href="">
              <BsYoutube className=' fs-4' />
             </a>
             
            </div>
          </div>
        </div>
        <div className="col-3">
          <h4 className='text-white mb-4'>Information</h4>
          <div className='footer-links d-flex flex-column'>
            <Link to="/privacy" className='text-white py-2 mb-1'>Privacy Policy</Link>
            <Link to="refund" className='text-white py-2 mb-1'>Refund Policy</Link>
            <Link to="shipping" className='text-white py-2 mb-1'>Shipping Policy</Link>
            <Link to="termandcondition" className='text-white py-2 mb-1'>Terms & Conditions</Link>
            <Link to="/blogs" className='text-white py-2 mb-1'>Blogs </Link>
          </div>
        </div>
        <div className="col-3">
          <h4 className='text-white mb-4'>Account </h4>
          <div className='footer-links d-flex flex-column'>
            <Link className='text-white py-2 mb-1'>About Us</Link>
            <Link className='text-white py-2 mb-1'>Faq</Link>
            <Link className='text-white py-2 mb-1'>Contact</Link>
            <Link className='text-white py-2 mb-1'>Size Chart</Link>
          </div>
        </div>
        <div className="col-2">
          <h4 className='text-white mb-4'>Quick Links</h4>
          <div className='footer-links d-flex flex-column'>
            <Link className='text-white py-2 mb-1'>Laptops</Link>
            <Link className='text-white py-2 mb-1'>Headphones</Link>
            <Link className='text-white py-2 mb-1'>Tablets</Link>
            <Link className='text-white py-2 mb-1'>Watch</Link>
          </div>
        </div>
      </div>
    </div>

  </footer>
  <footer className='py-4'>
    <div className="conatainer-xxl">
      <div className="row">
        <div className="col-12">
          <p className='text-center mb-0 text-white'>&copy; { new Date().getFullYear()}. Powered by Developers
          </p>
        </div>
      </div>
    </div>
  </footer>
   
   
   </>
  )
}

export default Footer;