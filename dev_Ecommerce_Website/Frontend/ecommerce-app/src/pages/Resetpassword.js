import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { resetPassword } from '../features/user/userSlice';



const passwordSchema = yup.object({
    password: yup.string().required("Password Is Required"),
    
});




const Resetpassword = () => {


  
    const location = useLocation();
    const getToken = location.pathname.split("/")[2];
    const dispatch = useDispatch();


    const formik = useFormik({
        initialValues: {
            password: '',
       
        },
        validationSchema: passwordSchema,
        onSubmit: (values) => {
          dispatch(resetPassword({token: getToken, password : values.password}))
        },
    });
    return (
        <>

            <Meta title={"Reset Passsword"} />
            <BreadCrumb title='Reset Passsword' />


            <Container class1="login-wrapper py-5 home-wrapper-2">
              
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className='text-center mb-3'>Reset Your Password</h3>
                            <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>

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

                            {/* <CustomInput type="password" name='confirmpassword' placeholder='Enter Confirm Password'  /> */}
                               
                            
                                <div>


                                    <div className=" mt-3 d-flex justify-content-center gap-15  align-items-center">
                                        <button type='submit' className='button border-0'>Submit</button>

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

export default Resetpassword
