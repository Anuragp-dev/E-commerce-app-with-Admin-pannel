import React, { useEffect } from 'react';
import Custominput from '../components/Custominput';
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useDispatch , useSelector} from "react-redux";
import { login } from '../features/auth/authSlice';


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let Schema = Yup.object({
    email: Yup.string().email("Email Should Be Valid").required("Email Is Requried"),
    password: Yup.string("").required("Password Is Requried"),

  });



  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Schema,
    onSubmit: (values) => {
      dispatch(login(values))

      alert(JSON.stringify(values, null, 2));
    },

 });

 
const authState = useSelector((state) => state);

const { user, isLoading , isError , isSuccess , message } = authState.auth;




  useEffect(()=> {
    if(isSuccess) {
      navigate("admin");

    }else {
     navigate(""); 
    }
  },[user, isLoading ,isError ,isSuccess])

  return (
    <div className='py-5' style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />

      <div className='my-5  bg-white rounded-3 mx-auto p-3' style={{ width: "30rem" }}>
        <h3 className='text-center title'>Login </h3>
        <p className='text-center'>Login to your Account to continue</p>
        <div className="error text-center">
          {message.message === "Rejected" ? "You Are Not An Admin" : ""} 
        </div>

        <form className='' action="" onSubmit={formik.handleSubmit}>

          <Custominput type='text'
            name="email"
            label="Enter Your Email Address"
            id="email" value={formik.values.email}
            onChange={formik.handleChange('email')}
            onBlur={formik.handleChange('email')}
          />

          <div className="error ">
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}

          </div>

          <Custominput type='password'
            name="password"
            label="Enter Your Password"
            id="password" value={formik.values.password}
            onChange={formik.handleChange('password')}
            onBlur={formik.handleChange('password')}
          />

          <div className="error">
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>



          
          <button className='btn border-0 px-3 py-2 text-white fw-bold w-100 fs-5 ' type='submit' style={{ background: "#ffd333" }}>Log In </button>
        </form>

      </div>
    </div>
  );
}

export default Login;
