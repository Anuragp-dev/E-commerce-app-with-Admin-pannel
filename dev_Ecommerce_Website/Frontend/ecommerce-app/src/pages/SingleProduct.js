import React, { useEffect, useState } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import ProductCard from '../components/ProductCard';
import ReactStars from "react-rating-stars-component";
import ReactImageZoom from 'react-image-zoom';
import Color from '../components/Color';
import { BiGitCompare } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineShareAlt, AiOutlineCopy } from "react-icons/ai";
import Container from '../components/Container';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addRating, getAllProducts, getSingleProduct } from '../features/products/productSlice';
import { toast } from 'react-toastify';
import { addProductToCart, getUserCart } from '../features/user/userSlice';







const SingleProduct = () => {
    const productState = useSelector((state) => state?.product?.singleProduct);
    console.log(productState);
    const productsState = useSelector((state) => state?.product?.product);
    const cartState = useSelector((state) => state?.auth?.addedCartProduct);
    const [color, setColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [alredyAdded, setAlredyAdded] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const getProductId = location.pathname.split("/")[2];
    const dispatch = useDispatch();
    const [popularProduct, setPopularProduct] = useState([]);
    const props = {
        width: 400, height: 600, zoomWidth: 600,
        img: productState?.images[0]?.url ? productState?.images[0]?.url : "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
    };
    const [orderedProduct, setOrderProduct] = useState(true);

    useEffect(() => {
        dispatch(getSingleProduct(getProductId));
        dispatch(getUserCart());
        dispatch(getAllProducts());
    }, []);

    useEffect(() => {
        for (let index = 0; index < cartState?.length; index++) {
            if (getProductId === cartState[index]?.productId?._id) {
                setAlredyAdded(true);
            }
        }
    }, []);

    const uploadCart = () => {
        if (color === null) {
            toast.error("Please Choose a Color")
            return false
        } else {
            dispatch(addProductToCart({ productId: productState?._id, quantity, color, price: productState?.price }));
            navigate('/cart');
        }
    }

    const copyToClipboard = (text) => {
        var textField = document.createElement("textarea");
        textField.innerText = text;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand("copy");
        textField.remove();
    };


    useEffect(() => {
        let data = [];
        for (let index = 0; index < productsState?.length; index++) {
            const element = productsState[index];
            if (element.tags === "popular") {
                data.push(element)
            }
            setPopularProduct(data);
        }
    }, [productState]);

    const [star, setStar] = useState(null);
    const [comment, setComment] = useState(null);
    const addRatingToProduct = () => {
        if (star === null) {
            toast.error("Please Add Star Rating");
            return false;
        } else if (comment === null) {
            toast.error("Please Write Review About The Product");
            return false;
        } else {
            dispatch(addRating({ star: star, comment: comment, prodId: getProductId }));
            setTimeout(() => {
                dispatch(getSingleProduct(getProductId));
            },200)
        }
        return false;
    }

    return (
        <>
            <Meta title={productState?.title} />
            <BreadCrumb title={productState?.title} />
            <Container class1="main-product-wrapper py-5 home-wrapper-2">

                <div className="row">
                    <div className="col-6">
                        <div className="main-product-image">
                            <div>
                                <ReactImageZoom {...props} />
                            </div>

                        </div>
                        <div className="other-product-images d-flex flex-wrap gap-15">
                            <div> <img className='img-fluid' src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg" alt="watch" /></div>
                            <div> <img className='img-fluid' src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg" alt="watch" /></div>
                            <div> <img className='img-fluid' src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg" alt="watch" /></div>
                            <div> <img className='img-fluid' src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg" alt="watch" /></div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="main-product-details">
                            <div className='border-bottom'>
                                <h3 className='title'>{productState?.title}</h3>
                            </div>
                            <div className="border-bottom py-3">
                                <p className='price'>₹ {productState?.price}</p>
                                <div className="d-flex align-items-center gap-10">
                                    <ReactStars count={5} size={24} value={productState?.totalrating} edit={false} activeColor="#ffd700" />
                                    <p className='mb-0 t-review'> (2 reviews)</p>
                                </div>
                                <a className='review-btn' href="#review">Write a Review</a>
                            </div>
                            <div className="py-3">
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Type:</h3>
                                    <p className='product-data'>Wired</p>
                                </div>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Brand :</h3>
                                    <p className='product-data'>{productState?.brand}</p>
                                </div>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Category :</h3>
                                    <p className='product-data'>{productState?.category}</p>
                                </div>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Tags :</h3>
                                    <p className='product-data'>{productState?.tags}</p>
                                </div>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Availability :</h3>
                                    <p className='product-data'>In Stock</p>
                                </div>
                                <div className='d-flex gap-10 flex-column mt-2 mb-3'>
                                    <h3 className='product-heading'>Size</h3>
                                    <div className='d-flex flex-wrap gap-15'>
                                        <span className='badge border border-1 bg-white text-dark border-secondary'>S</span>
                                        <span className='badge border border-1 bg-white text-dark border-secondary'>M</span>
                                        <span className='badge border border-1 bg-white text-dark border-secondary'>L</span>
                                    </div>
                                </div>
                                {
                                    alredyAdded === false && <>
                                        <div className='d-flex gap-10 flex-column mt-2 mb-3'>
                                            <h3 className='product-heading'>Color</h3>
                                            <Color setColor={setColor} colorData={productState?.color} />

                                        </div>
                                    </>
                                }
                                <div className='d-flex align-items-center gap-15 flex-row mt-2 mb-3'>
                                    {
                                        alredyAdded === false && <>
                                            <h3 className='product-heading'>Quantity :</h3>
                                            <div className=''>

                                                <input className='form-control' type="number" min={1} max={10} style={{ width: "70px" }}
                                                    onChange={(event) => setQuantity(event.target.value)}
                                                    value={quantity}
                                                />

                                            </div>
                                        </>
                                    }
                                    <div className={alredyAdded ? "ms-0" : "ms-5" + 'd-flex align-items-center gap-30 ms-5'}>
                                        <button className='button border-0' onClick={() => { alredyAdded ? navigate('/cart') : uploadCart() }}>
                                            {alredyAdded ? "Go To Cart" : "Add To Cart"}
                                        </button>
                                        <button className='button  buynow'>Buy It Now</button>
                                    </div>

                                </div>
                                <div className='d-flex align-items-center gap-15'>
                                    <div>
                                        <a href="">
                                            <BiGitCompare className='fs-5 me-2' />
                                            Add to Compare</a>
                                    </div>
                                    <div>
                                        <a href="">
                                            <AiOutlineHeart className='fs-5 me-2' />
                                            Add to Wishlist</a>
                                    </div>
                                </div>
                                <div className='d-flex gap-10 flex-column my-3'>
                                    <h3 className='product-heading'>Shipping & Returns:</h3>
                                    <p className='product-data'>Free shipping and returns available on all orders ! <br /> we ship all Us orders <b> 5-10 business days</b> </p>
                                </div>

                                <div className='d-flex gap-10 align-items-center my-3'>
                                    <h3 className='product-heading'> <AiOutlineShareAlt className='fs-5' /> Share Product :</h3>
                                    <a href="" onClick={() => {
                                        copyToClipboard(window.location.href);
                                    }}>  Copy Product Link <AiOutlineCopy className='fs-5' /> </a>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

            </Container>
            <Container class1="description-wrapper py-5 home-wrapper-2">


                <div className="row">
                    <div className="col-12">
                        <h4>Description</h4>
                        <div className='bg-white p-3'>

                            <p dangerouslySetInnerHTML={{
                                __html: productState?.description,
                            }}></p>
                        </div>
                    </div>
                </div>

            </Container>
            <Container class1='reviews-wrapper home-wrapper-2'>

                <div className="row">
                    <div className="col-12">
                        <h3 id='review' >Reviews</h3>
                        <div className="review-inner-wrapper">
                            <div className="review-head d-flex justify-content-between align-items-end">
                                <div>
                                    <h4 className='mb-2'>Customor Reviews</h4>
                                    <div className='d-flex align-items-center gap-10'>
                                        <ReactStars count={5} size={24} value={3} edit={false} activeColor="#ffd700" />
                                        <p className='mb-0'>Based on 2 reviews</p>
                                    </div>

                                </div>
                                {
                                    orderedProduct && (
                                        <div>
                                            <a className='text-dark text-decoration-underline'>Write a review</a>
                                        </div>
                                    )
                                }

                            </div>
                            <div className="review-form py-4">
                                <h4 className=''>Write a Review</h4>
                                {/* <form onSubmit={addRatingToProduct} action="" className='d-flex flex-column gap-15'> */}
                                <div>
                                    <ReactStars count={5} size={24} value={3} edit={true}
                                        activeColor="#ffd700"
                                        onChange={(event) => setStar(event)} />
                                </div>

                                <div>
                                    <textarea name="" placeholder='comments' className='w-100 form-control' id="" cols="30" rows="4"
                                        onChange={(event) => setComment(event.target.value)}></textarea>
                                </div>
                                <div className='d-flex justify-content-end mt-3'>
                                    <button onClick={addRatingToProduct} className='button border-0' type='button'>Submit Review</button>
                                </div>
                                {/* </form> */}
                            </div>
                            <div className="reviews mt-4">
                               {
                                productState && productState?.ratings?.map((item, index) => {
                                    return (
                                        <div key={index} className="review">
                                        <div className='d-flex gap-10 align-items-center'>
                                            {/* <h6 className='mb-0'>{item}</h6> */}
                                            <ReactStars count={5} size={24} value={item?.star} edit={false} activeColor="#ffd700" />
                                        </div>
                                        <p className='mt-3'>{item?.comment}</p>
                                    </div>
                                    )
                                })
                               }
                            </div>
                        </div>
                    </div>
                </div>

            </Container>

            <Container class1="popular-wrapper py-5 home-wrapper-2">

                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">Our Popular Products</h3>
                    </div>
                </div>
                <div className="row">
                    <ProductCard data={popularProduct} />
                </div>
            </Container>



        </>
    )
}

export default SingleProduct;