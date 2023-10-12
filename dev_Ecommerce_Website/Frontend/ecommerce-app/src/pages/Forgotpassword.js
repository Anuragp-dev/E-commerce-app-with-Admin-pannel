import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch} from 'react-redux';
import { forgotPassword } from '../features/user/userSlice';


const forgotPasswordSchema = yup.object({
    email: yup.string().required("Email Should Be Valid"),
});



const Forgotpassword = () => {

    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: '',

        },
        validationSchema: forgotPasswordSchema,
        onSubmit: values => {
            dispatch(forgotPassword(values));
        },
    });
    return (
        <>
            <Meta title={"Forgot Password"} />
            <BreadCrumb title='Account' />

            <Container class1="login-wrapper py-5 home-wrapper-2">

                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className='text-center mb-3'>Reset Your Password</h3>
                            <p className="text-center mt-2 mb-3">
                                We will send you an email to reset your password
                            </p>
                            <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>

                                <CustomInput
                                    type="email"
                                    name='email'
                                    placeholder='Enter Your Email'
                                    value={formik.values.email}
                                    onChange={formik.handleChange("email")}
                                    onBlur={formik.handleBlur("email")}
                                />

                                <div className='error'>
                                    {formik.touched.email && formik.errors.email}
                                </div>


                                <div>

                                    <div className=" mt-3 d-flex justify-content-center flex-column gap-15  align-items-center">
                                        <button className='button border-0' type='submit'>Submit</button>
                                        <Link to="/login">Cancel</Link>
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

export default Forgotpassword
