import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from '../components/BlogCard';
import ProductCard from '../components/ProductCard';
import SpecialProduct from '../components/SpecialProduct';
import Container from '../components/Container';
import { services } from '../Utils/Data';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '../features/blog/blogSlice';
import moment from "moment";
import { getAllProducts } from '../features/products/productSlice';


import ReactStars from "react-rating-stars-component";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import watch from "../images/watch.jpg";
import watch22 from "../images/watch22.png"
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { addToAWishList } from '../features/products/productSlice';



const Home = () => {

  const blogState = useSelector((state) => state?.blog?.blog);
  const productState = useSelector((state) => state?.product?.product);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const addWish = (id) => {
    dispatch(addToAWishList(id));
}

  useEffect(() => {
    getBlog();
    getProducts();
  }, []);

  const getBlog = () => {
    dispatch(getAllBlogs());
  }

  const getProducts = () => {
    dispatch(getAllProducts());
  }


  return (
    <>
      <Container class1="home-wrapper-1 py-5">
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative ">
              <img src="images/main-banner-1.jpg"
                className='img-fluid rounded-3'
                alt="main banner" />
              <div className="main-banner-content position-absolute">
                <h4>SUPERCHARGED FOR PROS.</h4>
                <h5> SAMSUNG S23+ </h5>
                <p> From ₹70000 <br /> or  ₹20000/mon.</p>
                <Link className='button'> BUY NOW</Link>
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
              <div className="small-banner position-relative ">
                <img src="images/catbanner-01.jpg"
                  className='img-fluid rounded-3'
                  alt="main banner" />
                <div className="small-banner-content position-absolute">
                  <h4>SUPERCHARGED FOR PROS.</h4>
                  <h5> SAMSUNG S23+ </h5>
                  <p> From ₹70000 <br /> or ₹20000/mon.</p>

                </div>
              </div>
              <div className="small-banner position-relative ">
                <img src="images/catbanner-02.jpg"
                  className='img-fluid rounded-3'
                  alt="main banner" />
                <div className="small-banner-content position-absolute">
                  <h4>.</h4>
                  <h5> SAMSUNG S23+ </h5>
                  <p> From ₹70000 <br /> or ₹20000/mon.</p>

                </div>
              </div>

              <div className="small-banner position-relative ">
                <img src="images/catbanner-03.jpg"
                  className='img-fluid rounded-3'
                  alt="main banner" />
                <div className="small-banner-content position-absolute">
                  <h4>SUPERCHARGED FOR PROS.</h4>
                  <h5> SAMSUNG S23+ </h5>
                  <p> From ₹70000 <br /> or ₹20000/mon.</p>

                </div>
              </div>


              <div className="small-banner position-relative ">
                <img src="images/catbanner-04.jpg"
                  className='img-fluid rounded-3'
                  alt="main banner" />
                <div className="small-banner-content position-absolute">
                  <h4>SUPERCHARGED FOR PROS.</h4>
                  <h5> SAMSUNG S23+ </h5>
                  <p> From ₹70000 <br /> or ₹20000/mon.</p>

                </div>
              </div>


            </div>
          </div>
        </div>

      </Container>

      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="services d-flex align-items-center justify-content-between">

              {
                services?.map((i, j) => {
                  return (

                    <div className='d-flex align-items-center gap-15' key={j}>
                      <img src={i.image} alt="services" />
                      <div>
                        <h6>{i.title}</h6>
                        <p className='mb-0'>{i.tagline}</p>
                      </div>
                    </div>

                  )

                })


              }



            </div>
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-2 py-5">

        <div className="row">
          <div className="col-12">
            <div className="catagories d-flex justift-content-between flex-wrap align-items-center">
              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Smart Watches</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="watch" />
              </div>

              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Smart Tv</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/tv.jpg" alt="tv" />
              </div>

              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Music & Gaming</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/headphone.jpg" alt="camera" />
              </div>


              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Smart Watches</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="watch" />
              </div>

              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Smart Tv</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/tv.jpg" alt="tv" />
              </div>

              <div className='d-flex gap-align-items-center'>
                <div>
                  <h6>Music & Gaming</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/headphone.jpg" alt="camera" />
              </div>


            </div>
          </div>
        </div>


      </Container>

      <Container class1="featured-wrapper py-5 home-wrapper-2">

        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Feature Collections</h3>
          </div>
          {productState && productState?.map((product, index) => {
           if (product.tags === "featured") {
            return (
              <div key={index} className={"col-3"}>
                            <div
                          
                                className="product-card position-relative">
                                <div className="wishlist-icon position-absolute">
                                    <button className='border-0 bg-transparent' onClick={(event)=> { addWish(product?._id) }}>
                                        <img src={wish} alt="wishlist" />
                                    </button>
                                </div>
                                <div className="product-image">
                                    <img src={watch} className='img-fluid' alt="productimage" />
                                    <img src={watch22} className='img-fluid' alt="productimage" />
                                </div>
                                <div className="product-details">
                                    <h6 className='brand'>{product?.brand}</h6>
                                    <h5 className="product-title">
                                    {product?.title}
                                    </h5>
                                    <ReactStars count={5} size={24} value={product?.totalrating.toString()} edit={false} activeColor="#ffd700" />
                            
                                    <p className="price">₹{product?.price}</p>
                                </div>
                                <div className="action-bar position-absolute">
                                    <div className='d-flex flex-column gap-15'>
                                        {/* <button className='border-0 bg-transparent'>
                                            <img src={prodcompare} alt="procompare" />
                                        </button> */}

                                        <button className='border-0 bg-transparent'>
                                            <img onClick={() => navigate(`/product/${product?._id}`)} src={view} alt="view" />
                                        </button>

                                        {/* <button className='border-0 bg-transparent'>
                                            <img  src={addcart} alt="addcart" />
                                        </button> */}



                                    </div>
                                </div>
                            </div>
                        </div>
            )
           }
          })}
        </div>


      </Container>


      <Container class1="famous-wrapper py-5 home-wrapper-2">

        <div className="row">
          <div className="col-3">
            <div className="famous-card position-relative">
              <img src="images/famous-1.webp" className='img-fluid' alt="famous" />
              <div className="famous-content position-absolute">
                <h5>BIG SCREEN</h5>
                <h6>Smart Watch Series 7</h6>
                <p> From ₹4000 or ₹15000/mo. for 24 mo.*</p>
              </div>
            </div>
          </div>


          <div className="col-3">
            <div className="famous-card position-relative">
              <img src="images/famous-2.webp" className='img-fluid' alt="famous" />
              <div className="famous-content position-absolute">
                <h5 className='text-dark'>Studi Display</h5>
                <h6 className='text-dark'>600 nits of brightness.</h6>
                <p className='text-dark'>27-inch 4K Retina display</p>
              </div>
            </div>
          </div>


          <div className="col-3">
            <div className="famous-card position-relative">
              <img src="images/famous-3.webp" className='img-fluid' alt="famous" />
              <div className="famous-content position-absolute">
                <h5 className='text-dark'>SmartPhones</h5>
                <h6 className='text-dark'>iPHONE 13 Pro</h6>
                <p className='text-dark'>Now is White.From ₹6000/mon or ₹1000/mo. for 24 mo.</p>
              </div>
            </div>
          </div>


          <div className="col-3">
            <div className="famous-card position-relative">
              <img src="images/famous-4.webp" className='img-fluid' alt="famous" />
              <div className="famous-content position-absolute">
                <h5 className='text-dark'>Speakers</h5>
                <h6 className='text-dark'>Room fill with sounds</h6>
                <p className='text-dark'>From ₹1500 or ₹5000/ mo . for 8 mo. * </p>
              </div>
            </div>
          </div>








        </div>


      </Container>









      <Container class1='special-wrapper py-5 home-wrapper-2'>

        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Special Products</h3>
          </div>
        </div>
        <div className="row">
          {productState && productState?.map((product, index) => {
           if (product.tags === "special") {
            return <SpecialProduct
            id={product?._id}
             key={index}
             title={product?.title}
             brand={product?.brand}
             totalrating={product?.totalrating.toString()}
             price={product?.price}
             sold={product?.sold}
             quantity={product?.quantity}
             />
           }
          })}
          
        </div>

      </Container>

      <Container class1="popular-wrapper py-5 home-wrapper-2">

        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>


        </div>
        <div className="row">
        {productState && productState?.map((product, index) => {
           if (product.tags === "popular") {
            return (
              <div key={index} className={"col-3"}>
                            <div
                           
                                className="product-card position-relative">
                                <div className="wishlist-icon position-absolute">
                                    <button className='border-0 bg-transparent' onClick={(event)=> { addWish(product?._id) }}>
                                        <img src={wish} alt="wishlist" />
                                    </button>
                                </div>
                                <div className="product-image">
                                    <img src={watch} className='img-fluid' alt="productimage" />
                                    <img src={watch22} className='img-fluid' alt="productimage" />
                                </div>
                                <div className="product-details">
                                    <h6 className='brand'>{product?.brand}</h6>
                                    <h5 className="product-title">
                                    {product?.title}
                                    </h5>
                                    <ReactStars count={5} size={24} value={product?.totalrating.toString()} edit={false} activeColor="#ffd700" />
                            
                                    <p className="price">₹{product?.price}</p>
                                </div>
                                <div className="action-bar position-absolute">
                                    <div className='d-flex flex-column gap-15'>
                                        {/* <button className='border-0 bg-transparent'>
                                            <img src={prodcompare} alt="procompare" />
                                        </button> */}

                                        <button className='border-0 bg-transparent'>
                                            <img onClick={() => navigate(`/product/${product?._id}`)} src={view} alt="view" />
                                        </button>

                                        {/* <button className='border-0 bg-transparent'>
                                            <img src={addcart} alt="addcart" />
                                        </button> */}



                                    </div>
                                </div>
                            </div>
                        </div>
            )
           }
          })}
        </div>

      </Container>


      <Container class1=" marque-wrapper home-wrapper-2 py-5">

        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper ">
              <Marquee className='d-flex'>

                <div className='mx-4 w-25'>
                  <img src="images/brand-01.png" alt="brand" />
                </div>

                <div className='mx-4 w-25'>
                  <img src="images/brand-02.png" alt="brand" />
                </div>

                <div className='mx-4 w-25'>
                  <img src="images/brand-03.png" alt="brand" />
                </div>

                <div className='mx-4 w-25'>
                  <img src="images/brand-04.png" alt="brand" />
                </div>

                <div className='mx-4 w-25'>
                  <img src="images/brand-05.png" alt="brand" />
                </div>

                <div className='mx-4 w-25'>
                  <img src="images/brand-06.png" alt="brand" />
                </div>

                <div className='mx-4 w-25'>
                  <img src="images/brand-07.png" alt="brand" />
                </div>

                <div className='mx-4 w-25'>
                  <img src="images/brand-08.png" alt="brand" />
                </div>

              </Marquee>
            </div>
          </div>
        </div>

      </Container>




      <Container class1="blog-wrapper py-5 home-wrapper-2">

        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Latest Blogs</h3>
          </div>
        </div>
        <div className="row">
          {blogState && blogState?.map((item, index) => {

            if( index < 4 ) {
              return (
                <div className="col-3 " key={index}>
                  <BlogCard id={item?._id}
                    title={item?.title}
                    description={item?.description}
                    image={item?.images[0]?.url}
                    date={moment(item?.createdAt).format(
                      "MMM Do YYYY , h:mm a"
                    )}
                  />
                </div>
              )
            }
          })}
        </div>

      </Container>








    </>
  )
}

export default Home