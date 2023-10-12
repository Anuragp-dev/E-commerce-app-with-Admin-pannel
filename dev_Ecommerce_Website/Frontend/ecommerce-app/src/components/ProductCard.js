import React from 'react';
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import watch from "../images/watch.jpg";
import watch22 from "../images/watch22.png"
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { addToAWishList } from '../features/products/productSlice';

const ProductCard = ({grid,data}) => {
   
    const location = useLocation();
    const dispatch = useDispatch()
    const addWish = (id) => {
        dispatch(addToAWishList(id));
    }



    return (
        <>

            {
                data?.map((item, index) => {
                    return (
                        <div key={index} className={` ${location.pathname === "/product" ? `gr-${grid}` : "col-3"}`}>
                            <div
                           
                                className="product-card position-relative">
                                <div className="wishlist-icon position-absolute">
                                    <button className='border-0 bg-transparent' onClick={(event)=> { addWish(item?._id) }}>
                                        <img src={wish} alt="wishlist" />
                                    </button>
                                </div>
                                <div className="product-image">
                                    <img src={watch} className='img-fluid' alt="productimage" />
                                    <img src={watch22} className='img-fluid' alt="productimage" />
                                </div>
                                <div className="product-details">
                                    <h6 className='brand'>{item?.brand}</h6>
                                    <h5 className="product-title">
                                    {item?.title}
                                    </h5>
                                    <ReactStars count={5} size={24} value={item?.totalrating.toString()} edit={false} activeColor="#ffd700" />
                                    <p className={`description ${grid === 12 ? "d-block" : "d-none" }`} dangerouslySetInnerHTML={{ __html: item.description }} >
                                    
                                    </p>
                                    <p className="price">₹{item?.price}</p>
                                </div>
                                <div className="action-bar position-absolute">
                                    <div className='d-flex flex-column gap-15'>
                                        {/* <button className='border-0 bg-transparent'>
                                            <img src={prodcompare} alt="procompare" />
                                        </button> */}

                                        <Link to={`/product/${item?._id}`} className='border-0 bg-transparent'>
                                            <img src={view} alt="view" />
                                        </Link>

                                        {/* <button className='border-0 bg-transparent'>
                                            <img src={addcart} alt="addcart" />
                                        </button> */}



                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                })
            }






        </>
    )
}

export default ProductCard