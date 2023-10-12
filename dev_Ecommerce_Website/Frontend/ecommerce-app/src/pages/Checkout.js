import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import watch from '../images/watch.jpg';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { config } from "../Utils/axiosConfig";
import { createAnOrder, deleteUserCart, getUserCart, resetState } from '../features/user/userSlice';


const shippingSchema = yup.object({
    firstname: yup.string().required("Firstname  Is Required"),
    lastname: yup.string().required("Lastname Is Required"),
    address: yup.string().required("Address Is Required"),
    landmark: yup.string().required("Landmark Is Required"),
    city: yup.string().required("City Is Required"),
    state: yup.string().required("State Is Required"),
    country: yup.string().required("Country Is Required"),
    pincode: yup.number().required("Pincode Is Required"),
});

const Checkout = () => {
    const cartState = useSelector((state) => state?.auth?.addedCartProduct);
    const authState = useSelector((state) => state?.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [totalAmount, setToatalAmount] = useState(null);
    const [shippingInfo, setShippingInfo] = useState(null);
    const [cartProductState, setcartProductState] = useState([]);
    console.log(shippingInfo);
    useEffect(() => {
        let sum = 0;
        for (let index = 0; index < cartState?.length; index++) {
            sum = sum + (Number(cartState[index]?.quantity) * cartState[index]?.price)

        }
        setTimeout(() => {
            setToatalAmount(sum);
        }, 300);

    }, [cartState]);

    
    useEffect(() => {
        if(authState.orderedProduct?.order !== null && authState?.orderedProduct?.success === true) {
            navigate("/my-orders");
        }
    },[authState])

    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            address: '',
            state: '',
            city: '',
            country: '',
            pincode: '',
        },
        validationSchema: shippingSchema,
        onSubmit:  (values) => {
            setShippingInfo(values)
            localStorage.setItem("address", JSON.stringify(values))
            setTimeout(() => {
                checkOutHandler()
            },300);
        },
    });
    console.log(shippingInfo);

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script);
        })
    }

    useEffect(() => {
        let items = [];
        for (let index = 0; index < cartState?.length; index++) {
            items.push({
                product: cartState[index]?.productId?._id,
                quantity: cartState[index]?.quantity,
                color: cartState[index]?.color?._id,
                price: cartState[index]?.price
            })
        }
        setcartProductState(items)

    }, []);


    const checkOutHandler = async () => {

        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        if (!res) {
            alert("Razorpay SDK Failed To Load")
            return;
        }
        const result = await axios.post("http://localhost:4000/api/user/order/checkout",{amount:totalAmount+40}, config)
        if (!result) {
            alert("Something Went Wrong")
            return
        }
        const { amount, id: order_id, currency } = result.data.order
        const options = {
            key: "rzp_test_fy9XWwx6AjUWhm", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "Dev Abhijith",
            description: "Test Transaction",
            // image: { logo },
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,

                };

                const result = await axios.post("http://localhost:4000/api/user/order/paymentVerification", data, config);
                

                console.log( shippingInfo);
                    dispatch(createAnOrder({
                        totalPrice: totalAmount,
                        totalPriceAfterDiscount: totalAmount,
                        orderItems:cartProductState,
                        paymentInfo:result.data,
                         shippingInfo:JSON.parse(localStorage.getItem("address")),
                    }))

                    dispatch(deleteUserCart());
                    localStorage.removeItem("address");
                    dispatch(resetState());
                

            },
            prefill: {
                name: "Abhijith",
                email: "Dev@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "dev Abhijith Corporate Office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();


    }

    return (
        <>
            <Container class1="checkout-wrapper py-5 home-wrapper-2">

                <div className="row">
                    <div className="col-7">
                        <div className="checkout-left-data">
                            <h3 className='wesite-name'>Dev corner</h3>
                            <nav style={{ "--bs-breadcrumb-divider ": '>' }} aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link className='text-dark total-price' to="/cart">Cart</Link>
                                    </li>

                                    <li className="breadcrumb-item active total-price" aria-current="page">
                                        Information
                                    </li>

                                    <li className="breadcrumb-item active total-price">Shipping
                                    </li>

                                    <li className="breadcrumb-item active total-price" aria-current="page">Payment</li>
                                </ol>
                            </nav>
                            <h4 className="title total">
                                Contact Information
                            </h4>
                            <p className="user-details total">
                                anurag(anurag121@gmail.com)
                            </p>
                            <h4 className='mb-3'>Shipping Address</h4>
                            <form action="" onSubmit={formik.handleSubmit}
                                className='d-flex gap-15 flex-wrap justify-content-between'>
                                <div className='w-100'>
                                    <select name="country"
                                        className='form-control form-select '
                                        id=""
                                        value={formik.values.country}
                                        onChange={formik.handleChange("country")}
                                        onBlur={formik.handleBlur("country")}
                                    >
                                        <option value="" selected disabled>Select Country</option>
                                        <option value="India" selected >India</option>
                                    </select>

                                    <div className='error mt-1 my-1'>
                                        {formik.touched.country && formik.errors.country}
                                    </div>

                                </div>
                                <div className='flex-grow-1'>
                                    <input
                                        className='form-control'
                                        type="text"
                                        name='firstname'
                                        placeholder='Enter Your First Name'
                                        value={formik.values.firstname}
                                        onChange={formik.handleChange("firstname")}
                                        onBlur={formik.handleBlur("firstname")}
                                    />

                                    <div className='error  mt-1 my-1'>
                                        {formik.touched.firstname && formik.errors.firstname}
                                    </div>
                                </div>

                                <div className='flex-grow-1'>
                                    <input
                                        className="form-control"
                                        name='lastname'
                                        placeholder='Enter Your Last Name'
                                        value={formik.values.lastname}
                                        onChange={formik.handleChange("lastname")}
                                        onBlur={formik.handleBlur("lastname")}
                                    />

                                    <div className='error mt-1 my-1'>
                                        {formik.touched.lastname && formik.errors.lastname}
                                    </div>


                                </div>


                                <div className='w-100'>
                                    <input
                                        className="form-control"
                                        name='address'
                                        placeholder='Enter Your Address'
                                        value={formik.values.address}
                                        onChange={formik.handleChange("address")}
                                        onBlur={formik.handleBlur("address")}
                                    />

                                    <div className='error mt-1 my-1'>
                                        {formik.touched.address && formik.errors.address}
                                    </div>

                                </div>

                                <div className='w-100'>
                                    <input type="text" placeholder='Apartment, Suite, etc ' className="form-control" />
                                </div>

                                <div className='flex-grow-1'>
                                    <input className="form-control"
                                        name='city'
                                        placeholder='Enter Your City'
                                        value={formik.values.city}
                                        onChange={formik.handleChange("city")}
                                        onBlur={formik.handleBlur("city")}
                                    />

                                    <div className='error mt-1 my-1'>
                                        {formik.touched.city && formik.errors.city}
                                    </div>

                                </div>

                              

                                <div className='flex-grow-1'>

                                    <select
                                        name="state"
                                        className='form-control form-select'
                                        id=""
                                        value={formik.values.state}
                                        onChange={formik.handleChange("state")}
                                        onBlur={formik.handleBlur("state")}

                                    >
                                        <option value="" selected disabled> Select State</option>
                                        <option value="Kerala" selected > Kerala</option>
                                        <option value="Karnataka" selected> Karnataka</option>
                                        <option value="TamilNadu" selected> Tamil Nadu</option>
                                        <option value="Delhi" selected>Delhi</option>
                                        <option value="Hydrabad" selected> HydraBad</option>
                                    </select>
                                    <div className='error mt-1 my-1'>
                                        {formik.touched.state && formik.errors.state}
                                    </div>
                                </div>

                                <div className='flex-grow-1'>
                                    <input
                                        className="form-control"
                                        name='pincode'
                                        placeholder='Enter Your Pincode'
                                        value={formik.values.pincode}
                                        onChange={formik.handleChange("pincode")}
                                        onBlur={formik.handleBlur("pincode")}
                                    />

                                    <div className='error mt-1 my-1'>
                                        {formik.touched.pincode && formik.errors.pincode}
                                    </div>

                                </div>
                                <div className='flex-grow-1'>
                                    <input className="form-control"
                                        name='landmark'
                                        placeholder='Enter Your landmark'
                                        value={formik.values.landmark}
                                        onChange={formik.handleChange("landmark")}
                                        onBlur={formik.handleBlur("landmark")}
                                    />

                                    <div className='error mt-1 my-1'>
                                        {formik.touched.landmark && formik.errors.landmark}
                                    </div>

                                </div>
                                <div className="w-100">
                                    <div className="d-flex justify-content-between align-items-center">

                                        <Link to="/cart" className='text-dark'>
                                            <BiArrowBack className='me-2' />
                                            Return To Cart
                                        </Link>
                                        <Link to="/" className='button'>Continue Shopping</Link>
                                        <button className='button' type='submit'>Place Order</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className='border-bottom py-4'>
                            {
                                cartState && cartState?.map((item, index) => {
                                    return (
                                        <div key={index} className="d-flex gap-10 mb-2 align-items-center">
                                            <div className='w-75 d-flex gap-10'>
                                                <div className='w-25 position-relative'>
                                                    <span style={{ top: "-10px", right: "2px" }} className="badge bg-secondary text-white rounded-circle p-2 position-absolute">
                                                        {item?.quantity}
                                                    </span>
                                                    <img className='img-fluid' width={100} height={100}
                                                        src={item?.productId?.images[0]?.url ? item?.productId?.images[0]?.url : watch}
                                                        alt="product" />
                                                </div>
                                                <div>
                                                    <h5 className="total-price">{item?.productId?.title}</h5>
                                                    <p className='total-price d-flex gap-3 mb-1'>Color : <ul className='colors ps-0'>

                                                        <li style={{ backgroundColor: item?.color?.title }}> </li>
                                                    </ul></p>
                                                </div>
                                            </div>
                                            <div className='flex-grow-1'>
                                                <h5 className='total'>₹{item?.price * item?.quantity}</h5>
                                            </div>
                                        </div>
                                    )
                                })
                            }


                        </div>
                        <div className='border-bottom py-4'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className='total'>Subtotal</p>
                                <p className='total-price'>₹{totalAmount ? totalAmount : "0"}</p>

                            </div>



                            <div className='d-flex justify-content-between align-items-center'>
                                <p className='mb-0 total' >Shipping</p>
                                <p className='mb-0 total-price'>₹ 40</p>

                            </div>
                        </div>

                        <div className='d-flex justify-content-between align-items-center py-4'>
                            <h4 className='total'>Total</h4>
                            <h5 className='total-price'>₹{totalAmount ? totalAmount + 40 : "0"}</h5>

                        </div>
                    </div>
                </div>

            </Container>

        </>
    );
}

export default Checkout;
