import React, { useEffect } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineArrowLeft } from "react-icons/hi";
import blog from "../images/blog-1.jpg";
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getABlog } from '../features/blog/blogSlice';

const Singleblog = () => {
    const singleblogState = useSelector((state) => state?.blog?.singleBlog);
    const dispatch = useDispatch();
    const location = useLocation();
    const getblogId = location.pathname.split("/")[2];

    useEffect(() => {
        singleBlog();
    }, []);

    const singleBlog = () => {
        dispatch(getABlog(getblogId));
    }
    return (
        <>
      <Meta title={singleblogState?.title} />
      <BreadCrumb title={singleblogState?.title} />

      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="single-blog-card">
              <Link to="/blogs" className="d-flex align-items-center gap-10">
                <HiOutlineArrowLeft className="fs-4" /> Go back to Blogs
              </Link>
              <h3 className="title">{singleblogState?.title}</h3>
              <img
                src={singleblogState?.images[0]?.url ? singleblogState?.images[0]?.url : blog}
                className="img-fluid  w-100 my-4 " style={{height:"480px"}}
                alt="blog"
              />
              <p
                dangerouslySetInnerHTML={{
                  __html: singleblogState?.description,
                }}
              ></p>
            </div>
          </div>
        </div>
      </Container>
    </>
    )
}

export default Singleblog;
