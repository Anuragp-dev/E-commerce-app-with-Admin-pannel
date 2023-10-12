import React, { useEffect, useState } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import watch from "../images/watch.jpg";
import { AiFillDelete } from "react-icons/ai"
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAProductFromCart, getUserCart, updateAProductFromCart } from '../features/user/userSlice';

const Cart = () => {

    const getTokenFromLocalStorage = localStorage.getItem('customer')
        ? JSON.parse(localStorage.getItem('customer')) : null;

    const config2 = {
        headers: {
            'Authorization': `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""}`
        },
    };

    const dispatch = useDispatch();
    const [productUpadateDetail, setProductUpadateDetail] = useState(null);
    const [totalAmount, setToatalAmount] = useState(null);

    const userCartState = useSelector((state) => state?.auth?.addedCartProduct);

    useEffect(() => {
        dispatch(getUserCart(config2));
    }, []);

    useEffect(() => {
        if (productUpadateDetail !== null) {
            dispatch(updateAProductFromCart({ 
                cartItemId: productUpadateDetail?.cartItemId,
                 quantity: productUpadateDetail?.quantity
                 })
                 );
                 setTimeout(() => {
                    dispatch(getUserCart(config2));
                }, 200);
        }
       
    }, [productUpadateDetail]);


    const removeAcartProduct = (id) => {
        dispatch(deleteAProductFromCart({id: id,config2 : config2 }));
        setTimeout(() => {
            dispatch(getUserCart(config2));
        }, 200);
    }


    useEffect(() => {
        let sum = 0;
        for (let index = 0; index < userCartState?.length; index++) {
            sum = sum + (Number(userCartState[index]?.quantity) * userCartState[index]?.price)
            setToatalAmount(sum)
        }
    }, [userCartState]);

    return (
        <>

            <Meta title={"Cart"} />
            <BreadCrumb title='Cart' />
            <Container class1="cart-wrapper home-wrapper-2 py-5">

                <div className="row">
                    <div className="col-12">
                        <div className='cart-header d-flex justify-content-between align-items-center'>
                            <h4 className='cart-col-1'>Product</h4>
                            <h4 className='cart-col-2'>Price</h4>
                            <h4 className='cart-col-3'>Quantity</h4>
                            <h4 className='cart-col-4'>Total</h4>
                        </div>
                        {
                            userCartState && userCartState?.map((cart, index) => {
                                return (
                                    <div key={index} className='cart-data py-3 mb-2 d-flex justify-content-between align-items-center'>

                                        <div className='cart-col-1 d-flex align-items-center gap-15'>
                                            <div className='w-25'>
                                                <img src={watch} className='img-fluid' alt="watch" />
                                            </div>
                                            <div className='w-75'>
                                                <p >{cart?.productId?.title}</p>


                                                <p className='d-flex gap-3'>Colour: <ul className='colors ps-0'>

                                                    <li style={{ backgroundColor: cart?.color?.title }}> </li>
                                                </ul>
                                                </p>
                                            </div>

                                        </div>

                                        <div className='cart-col-2'>
                                            <h5 className="price">₹  {cart?.price}</h5>
                                        </div>
                                        <div className='cart-col-3 d-flex align-items-center gap-15'>
                                            <div>
                                                <input
                                                    className='form-control'
                                                    type="number"
                                                    name={'quantity' + cart?._id} id={"cart" + cart?._id}
                                                    min={1} max={10}
                                                    value={ cart?.quantity }
                                                    onChange={(event) => { setProductUpadateDetail({ cartItemId: cart?._id, quantity: event.target.value }) }} /></div>
                                            <div>
                                                <AiFillDelete onClick={() => removeAcartProduct(cart?._id)} className='text-danger ' />
                                            </div>
                                        </div>
                                        <div className='cart-col-4'>
                                            <h5 className="price">₹ {cart?.price * cart?.quantity}</h5>
                                        </div>
                                    </div>
                                )
                            })
                        }


                    </div>
                    <div className="col-12 py-2 mt-4">
                        <div className="d-flex justify-content-between align-items-baseline">
                            <Link to="/product" className='button'> Continue To Shopping
                            </Link>
                            {
                                (totalAmount !== null || totalAmount !== 0) &&
                                <div className='d-flex flex-column align-items-end'>
                                    <h4>Sub Total: ₹ {totalAmount ? totalAmount : 0}</h4>
                                    <p>Taxes and shipping calculated at checkout</p>
                                    <Link to="/checkout" className='button'>Checkout</Link>
                                </div>
                            }
                        </div>
                    </div>
                </div>

            </Container>




        </>
    );
}

export default Cart;
