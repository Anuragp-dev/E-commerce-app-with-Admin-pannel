import { useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Custominput from '../components/Custominput';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "react-widgets/styles.css";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Dropzone from 'react-dropzone';
import { delImg, uploadImg } from '../features/upload/uploadSlice';
import { toast } from 'react-toastify';
import { getAllBcategories, resetState } from '../features/blogcategory/bcategorySlice';
import { createBlogs, getABlog, updateABlog } from '../features/blogs/blogSlice';



let Schema = Yup.object({
    title: Yup.string().required("Blog Title Is Requried"),
    description: Yup.string().required("Description Is Requried"),
    category: Yup.string().required("Category Is Requried"),
});




const Addblog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const getBlogId = location.pathname.split("/")[3];

    useEffect(() => {
        dispatch(getAllBcategories());
    }, [dispatch]);



    const imgState = useSelector((state) => state.upload.images);
    const bcategoryState = useSelector((state) => state.bcategory.bcategories);
    const newBlogs = useSelector((state) => state.blog);
    const { isSuccess, isError, isLoading, createdBlogs, BlogName, BlogDescription, BlogImages, BlogCategory, updatedBlogs } = newBlogs;

    useEffect(() => {
        if(getBlogId !== undefined ) {
            dispatch(getABlog(getBlogId));
            img.push(BlogImages);
        } else {
            dispatch(resetState());
        }
    },[getBlogId]);

    

    useEffect(() => {

        if (isSuccess && createdBlogs) {
            toast.success('Blog Added Successfully!');
        }

        if( updatedBlogs && isSuccess ){
            toast.success('Blog Updated Successfully!');
            navigate("/admin/blog-list");
          }

        if (isError) {
            toast.error("Something Went Wrong");
        }

    }, [isSuccess, isError, isLoading, createdBlogs, updatedBlogs]);


    const img = [];
    imgState.forEach((i) => {
        img.push({
            public_id: i.public_id,
            url: i.url,
        });
    });
    useEffect(() => {
        formik.values.images = img;
    },[BlogImages])



    const formik = useFormik({
        enableReinitialize:true,
        initialValues: {
            title:BlogName || "",
            description:BlogDescription || "",
            category:BlogCategory || "",
            images:"",
        },
        validationSchema: Schema,
        onSubmit: (values) => {
            if ( getBlogId !== undefined ) {
                const data = { id: getBlogId, blogData: values };
                dispatch(updateABlog(data));
                dispatch(resetState());
            } else {
                dispatch(createBlogs(values));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState());
                    navigate("/admin/blog-list");
                }, 300);
            }
           
        },

    });

    return (
        <div>
            <h3 className="mb-4 title">{ getBlogId !== undefined ? "Edit":"Add" }  Blogs</h3>
            <div>
                <form
                    onSubmit={formik.handleSubmit}
                    className='d-flex gap-3 flex-column'>

                    <Custominput type='text'
                        label='Enter Blog Title'
                        name="title"
                        onChange={formik.handleChange("title")}
                        onBlur={formik.handleBlur("title")}
                        value={formik.values.title}
                    />
                    <div className="error ">
                        {formik.touched.title && formik.errors.title}

                    </div>

                    <div className=''>
                        <ReactQuill theme="snow" />
                    </div>

                    <Custominput type='text'
                        label='Enter Blog Description'
                        name="description"
                        onChange={formik.handleChange("description")}
                        onBlur={formik.handleBlur("description")}
                        value={formik.values.description}
                    />

                    <div className="error ">
                        {formik.touched.description && formik.errors.description}


                    </div>

                    <select
                        name="category"
                        onChange={formik.handleChange("category")}
                        onBlur={formik.handleBlur("category")}
                        value={formik.values.category}
                        id=""
                        className='form-control py-3 mb-3'
                    >
                        <option value="">Select Blog Category</option>
                        {bcategoryState.map((i, j) => {
                            return (
                                <option key={j} value={i.title}>
                                    {i.title}
                                </option>
                            );
                        })};
                    </select>
                    <div className="error ">
                        {formik.touched.category && formik.errors.category}
                    </div>


                    <div className='bg-white border-1 p-5 text-center'>
                        <Dropzone onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                    <div className='showimages d-flex flex-wrap gap-3'>
                        {
                            imgState?.map((i, j) => {
                                return (
                                    <div className='position-relative' key={j}>
                                        <button type='button' onClick={() => dispatch(delImg(i.public_id))} className="btn-close position-absolute bg-danger" style={{ top: "10px", right: "10px" }}></button>
                                        <img src={i.url} alt="image" width={200} height={200} />
                                    </div>
                                )
                            })
                        }
                    </div>


                    <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>{ getBlogId !== undefined ? "Edit":"Add" }  Blog</button>
                </form>


            </div>
        </div>
    );
}

export default Addblog;
