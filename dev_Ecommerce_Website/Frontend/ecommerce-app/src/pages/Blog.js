import React, { useEffect } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import BlogCard from '../components/BlogCard';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '../features/blog/blogSlice';
import moment from "moment";

const Blog = () => {

    const blogState = useSelector((state) => state?.blog?.blog);
    const dispatch = useDispatch();

    useEffect(() => {
        getBlog();
    }, []);

    const getBlog = () => {
        dispatch(getAllBlogs());
    }

    return (
        <>
        <Meta title="Blogs" />
        <BreadCrumb title="Blogs" />
        <Container class1="blog-wrapper home-wrapper-2 py-5">
          <div className="row">
            <div className="col-3">
              <div className="filter-card mb-3">
                <h3 className="filter-title">Shop By Categories</h3>
                <div>
                  <ul className="ps-0">
                    <li>Watches</li>
                    <li>Tv</li>
                    <li>Camera</li>
                    <li>Laptop</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="row">
                {blogState?.map((blog, index) => {
                  return (
                    <div className="col-6 mb-3" key={index}>
                      <BlogCard 
                        id={blog?._id}
                        title={blog?.title}
                        description={blog?.description}
                        image={blog?.images[0]?.url}
                        date={moment(blog?.createdAt).format(
                          'MMMM Do YYYY, h:mm a'
                        )}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </>
    );
}

export default Blog;
