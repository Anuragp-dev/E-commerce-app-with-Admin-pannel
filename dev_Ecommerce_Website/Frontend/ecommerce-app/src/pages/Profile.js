import React, { useState } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileUser } from '../features/user/userSlice';
import {BiSolidEdit} from "react-icons/bi";

const profileSchema = yup.object({
    firstname: yup.string().required("Firstname  Is Required"),
    lastname: yup.string().required("Lastname Is Required"),
    email: yup.string().required("Email Should Be Valid"),
    mobile: yup.string().required("Mobile Number Is Required"),
});



const Profile = () => {

const getTokenFromLocalStorage = localStorage.getItem('customer')
? JSON.parse(localStorage.getItem('customer')):null;

const config2 = {
    headers: {
        'Authorization': `Bearer ${ getTokenFromLocalStorage!==null ? getTokenFromLocalStorage.token: "" }`
      },
};



    const userState = useSelector((state) => state?.auth?.user);
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(true);


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstname: userState?.firstname,
            lastname: userState?.lastname,
            mobile: userState?.mobile,
            email: userState?.email,
        },
        validationSchema: profileSchema,
        onSubmit: values => {
            dispatch(updateProfileUser({ data : values, config2 : config2 }));
            setEdit(true);
        },
    });
    return (
        <>
            <Meta title={"My Profile "} />
            <BreadCrumb title='My Profile' />
            <Container class1="cart-wapper home-wapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center">
                            <h3 className='my-3'>Update Profile</h3>
                            <BiSolidEdit className='fs-3 text-primary' onClick={() => {setEdit(false) }}/>
                        </div>
                    </div>
                    <div className="col-12">

                        <form onSubmit={formik.handleSubmit}>

                            <div className="mb-3">
                                <label htmlFor="example1" className="form-label">First Name</label>
                                <input type="text"
                                    name='firstname'
                                    className="form-control"
                                    id="example1"
                                    aria-describedby="emailHelp"
                                    value={formik.values.firstname}
                                    onChange={formik.handleChange("firstname")}
                                    onBlur={formik.handleBlur("firstname")}
                                    disabled={edit}
                                />

                                <div className='error mt-1 my-1'>
                                    {formik.touched.firstname && formik.errors.firstname}
                                </div>

                            </div>

                            <div className="mb-3">
                                <label htmlFor="example2" className="form-label">Last Name</label>
                                <input type="text"
                                    name='lastname'
                                    className="form-control"
                                    id="example2"
                                    aria-describedby="emailHelp"
                                    value={formik.values.lastname}
                                    onChange={formik.handleChange("lastname")}
                                    onBlur={formik.handleBlur("lastname")}
                                    disabled={edit}
                                />

                                <div className='error mt-1 my-1'>
                                    {formik.touched.lastname && formik.errors.lastname}
                                </div>

                            </div>

                            <div className="mb-3">
                                <label htmlFor="example3" className="form-label">Mobile No</label>
                                <input type="number"
                                    name='mobile'
                                    className="form-control"
                                    id="example3"
                                    aria-describedby="emailHelp"
                                    value={formik.values.mobile}
                                    onChange={formik.handleChange("mobile")}
                                    onBlur={formik.handleBlur("mobile")}
                                    disabled={edit}
                                />

                                <div className='error mt-1 my-1'>
                                    {formik.touched.mobile && formik.errors.mobile}
                                </div>

                            </div>

                            <div className="mb-3">
                                <label htmlFor="example4" className="form-label">Email address</label>
                                <input type="email"
                                    name='email'
                                    className="form-control"
                                    id="example4"
                                    aria-describedby="emailHelp"
                                    value={formik.values.email}
                                    onChange={formik.handleChange("email")}
                                    onBlur={formik.handleBlur("email")}
                                    disabled={edit}
                                />

                                <div className='error mt-1 my-1'>
                                    {formik.touched.email && formik.errors.email}
                                </div>

                            </div>


                           {
                            edit === false &&  <button type="submit" className="btn btn-primary">Update</button>
                           }
                        </form>

                    </div>
                </div>

            </Container>

        </>
    );
}

export default Profile;
