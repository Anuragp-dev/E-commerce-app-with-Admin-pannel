import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ id, title, description, date, image }) => {
    
  return (
    
    <div className="blog-card ">
    <div className="card-image">
      <img
        className="w-100"
        src={image ? image : '/images/blog-1.jpg'}
        alt="blog"
        height={190}
      />
    </div>
    <div className="blog-content">
      <p className="date">{date}</p>
      <h5 className="title">{title}</h5>
      <p
        className=" text-truncate desc" style={{maxWidth:"250px"}}
        dangerouslySetInnerHTML={{
          __html: description?.substr(0, 100) + '...',
        }}
      ></p>
      <Link to={`/blog/${id}`} className="button">
        Read More
      </Link>
    </div>
  </div>
   
  )
}

export default BlogCard