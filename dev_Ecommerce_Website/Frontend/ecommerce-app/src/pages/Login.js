import React, { useEffect } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/user/userSlice';


const loginSchema = yup.object({

    email: yup.string().required("Email Should Be Valid"),
    password: yup.string().required("Password Is Required"),
});

const Login = () => {
    
    const authState = useSelector(state => state?.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: values => {
            dispatch(loginUser(values));
             
        },
    });
    useEffect(() => {
        if(authState.user !== null && authState.isError === false) {
            navigate("/") 
        }
    },[authState]);

    return (
        <>
            <Meta title={"Login"} />
            <BreadCrumb title='Login' />

            <Container class1="login-wrapper py-5 home-wrapper-2">

                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className='text-center mb-3'>Login</h3>
                            <form action="" onSubmit={formik.handleSubmit}  className='d-flex flex-column gap-15'>
                                <CustomInput type="email"
                                    name='email'
                                    placeholder='Enter Your Email'
                                    value={formik.values.email}
                                    onChange={formik.handleChange("email")}
                                    onBlur={formik.handleBlur("email")}
                                />

                                <div className='error'>
                                    {formik.touched.email && formik.errors.email}
                                </div>

                                <CustomInput type="password"
                                    name='password'
                                    placeholder='Enter Your Password'
                                    value={formik.values.password}
                                    onChange={formik.handleChange("password")}
                                    onBlur={formik.handleBlur("password")}
                                />

                                <div className='error'>
                                    {formik.touched.password && formik.errors.password}
                                </div>

                                <div>
                                    <Link className='mx-2' to="/forgotpassword">Forgot Password?</Link>
                                    <div className="mt-3 d-flex justify-content-center gap-15  align-items-center">
                                        <button type='submit' className='button border-0'>Login</button>
                                        <Link to="/signup" className='button signup'>Signup</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </Container>


        </>
    )
}

export default Login
