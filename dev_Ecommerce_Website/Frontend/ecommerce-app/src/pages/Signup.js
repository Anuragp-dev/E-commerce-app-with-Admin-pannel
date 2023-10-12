import React, { useEffect } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector} from 'react-redux';
import { registerUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const signupSchema = yup.object({
    firstname: yup.string().required("Firstname  Is Required"),
    lastname: yup.string().required("Lastname Is Required"),
    email: yup.string().required("Email Should Be Valid"),
    mobile: yup.string().required("Mobile Number Is Required"),
    password: yup.string().required("Password Is Required"),
});


const Signup = () => {
    
    const authState = useSelector((state) => state?.auth);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            mobile: '',
            password: '',
        },
        validationSchema: signupSchema,
        onSubmit: values => {
        dispatch(registerUser(values));
        formik.resetForm();
        navigate('/login');
        },
    });

   
    // useEffect(() => {
    //     if (authState.createdUser !== null && authState.isError === false) {
           
    //         navigate('/login');
    //     }
    //   }, [authState]);


    return (
        <>
            <Meta title={"Sign Up"} />
            <BreadCrumb title='Signup' />


            <Container class1="login-wrapper py-5 home-wrapper-2">

                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className='text-center mb-3'>Create Your Account</h3>
                            <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                                <CustomInput
                                    type="text"
                                    name='firstname'
                                    placeholder='Enter Your First Name'
                                    value={formik.values.firstname}
                                    onChange={formik.handleChange("firstname")}
                                    onBlur={formik.handleBlur("firstname")}
                                />

                                <div className='error'>
                                    { formik.touched.firstname && formik.errors.firstname }
                                </div>

                                <CustomInput type="text"
                                    name='lastname'
                                    placeholder='Enter Your Last Name'
                                    value={formik.values.lastname}
                                    onChange={formik.handleChange("lastname")}
                                    onBlur={formik.handleBlur("lastname")}
                                />

                                <div className='error'>
                                    { formik.touched.lastname && formik.errors.lastname }
                                </div>

                                <CustomInput
                                    type="tel"
                                    name='mobile'
                                    placeholder='Enter Your Mobile Number'
                                    value={formik.values.mobile}
                                    onChange={formik.handleChange("mobile")}
                                    onBlur={formik.handleBlur("mobile")}
                                />

                                <div className='error'>
                                    { formik.touched.mobile && formik.errors.mobile }
                                </div>
                                

                                <CustomInput type="email"
                                    name='email'
                                    placeholder='Enter Your Email'
                                    value={formik.values.email}
                                    onChange={formik.handleChange("email")}
                                    onBlur={formik.handleBlur("email")}
                                />

                                <div className='error'>
                                    { formik.touched.email && formik.errors.email }
                                </div>
                            

                                <CustomInput type="password"
                                    name='password'
                                    placeholder='Enter Your Password'
                                    value={formik.values.password}
                                    onChange={formik.handleChange("password")}
                                    onBlur={formik.handleBlur("password")}
                                />

                                <div className='error'>
                                    { formik.touched.password && formik.errors.password }
                                </div>
                                





                                <div>

                                    <div className=" mt-3 d-flex justify-content-center gap-15  align-items-center">
                                        <button type='submit' className='button border-0'>Create</button>

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

export default Signup
