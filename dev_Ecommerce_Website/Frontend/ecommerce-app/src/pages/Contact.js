import React, { useEffect } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall } from "react-icons/bi";
import { BsInfoCircle } from "react-icons/bs";
import Container from '../components/Container';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createQuery, resetState } from '../features/contact/contactSlice';

const contactSchema = yup.object({
  name: yup.string().required("Name  Is Required"),
  email: yup.string().required("Email Should Be Valid"),
  mobile: yup.string().required("Mobile Number Is Required"),
  comment: yup.string().required("Comment Is Required"),
});

const Contact = () => {

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      comment: '',
    },
    validationSchema: contactSchema,
    onSubmit: values => {
      dispatch(createQuery(values));
    },
  });



  return (
    <>
      <Meta title={"Contact Us"} />
      <BreadCrumb title='Contact' />

      <Container class1="contact-wrapper py-5 home-wrapper-2">

        <div className="row">
          <div className="col-12">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8346.538639146313!2d76.64785804528567!3d9.150686099396971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b061179f48b6469%3A0x8fa4c22682e0b292!2sChaithram%20foods%20(Dosa%2C%20Idili)!5e0!3m2!1sen!2sin!4v1692267069059!5m2!1sen!2sin"
              width="600" height="450" className='border:0 w-100' allowFullScreen="" loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <div className="col-12 mt-5">
            <div className="contact-inner-wrapper d-flex justify-content-between">
              <div> <h3 className='contact-title mb-4'>Contact Us</h3>
                <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                  <div>
                    <input type="text"
                      className='form-control'
                      placeholder='Name'
                      name='name'
                      onChange={formik.handleChange("name")}
                      onBlur={formik.handleBlur("name")}
                      value={formik.values.name}
                    />
                    <div className='contactValidation'>
                      {
                        formik.touched.name && formik.errors.name
                      }
                    </div>
                  </div>
                  <div>
                    <input type="email"
                      className='form-control'
                      placeholder='Email'
                      name='email'
                      onChange={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")}
                      value={formik.values.email}
                    />
                    <div className='contactValidation'>
                      {
                        formik.touched.email && formik.errors.email
                      }
                    </div>

                  </div>
                  <div>
                    <input type="tel"
                      className='form-control'
                      placeholder='Mobile Number'
                      name='mobile'
                      onChange={formik.handleChange("mobile")}
                      onBlur={formik.handleBlur("mobile")}
                      value={formik.values.mobile}
                    />
                    <div className='contactValidation'>
                      {
                        formik.touched.mobile && formik.errors.mobile
                      }
                    </div>
                  </div>
                  <div>
                    <textarea placeholder='comments'
                      className='w-100 form-control'
                      id="" cols="30" rows="4"
                      name='comment'
                      onChange={formik.handleChange("comment")}
                      onBlur={formik.handleBlur("comment")}
                      value={formik.values.comment}
                    >
                    </textarea>
                    <div className='contactValidation'>
                      {
                        formik.touched.comment && formik.errors.comment
                      }
                    </div>


                  </div>
                  <div>
                    <button type='submit' className='button border-0'>Submit</button>
                  </div>
                </form>
              </div>

              <div> <h3 className='contact-title mb-4'>Get in touch with us</h3>
                <div>
                  <ul className='ps-0'>
                    <li className='mb-3 d-flex gap-15 align-items-center'>
                      <AiOutlineHome className='fs-5' />
                      <address className='mb-0'>Hno:80 , Near Lekshmi Steels  company , Pallickal ,
                        Nooranad, Kerala</address>
                    </li>
                    <li className='mb-3 d-flex gap-15 align-items-cente'>
                      <BiPhoneCall className='fs-5 ' />
                      <a href="tel: +91 787898789">+91 787898789</a>
                    </li>
                    <li className='mb-3 d-flex gap-15 align-items-cente'>
                      <AiOutlineMail className='fs-5' />
                      <a href="mailto:comapny@gmail.com">comapny@gmail.com</a>
                    </li>

                    <li className='mb-3 d-flex gap-15 align-items-cente'>
                      <BsInfoCircle className='fs-5' />
                      <p className='mb-0'>24/7 Customer Service</p>
                    </li>

                  </ul>
                </div>
              </div>


            </div>
          </div>
        </div>

      </Container>

    </>
  );
}

export default Contact;
