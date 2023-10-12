import { useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Custominput from '../components/Custominput';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "react-widgets/styles.css";
import { getBrands } from '../features/brand/brandSlice';
import { getPcategory } from '../features/productCategory/pcategorySlice';
import { getColors } from '../features/color/colorSlice';
import {Select } from "antd";


import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Dropzone from 'react-dropzone';
import { delImg, uploadImg } from '../features/upload/uploadSlice';
import { createProducts } from '../features/product/productSlice';
import { toast } from 'react-toastify';
import { resetState } from '../features/blogcategory/bcategorySlice';


// toast.success('Product Added Successfully!');

let Schema = Yup.object({
    title: Yup.string().required("Title Is Requried"),
    description: Yup.string().required("Description Is Requried"),
    price: Yup.number().required("Price Is Requried"),
    brand: Yup.string().required("Brand Is Requried"),
    category: Yup.string().required("Category Is Requried"),
    quantity: Yup.number().required("Quantity Is Requried"),
    tags: Yup.string().required("Tags Is Requried"),
    color: Yup.array().min(1,"Pick Atleast One Color").required("Colors Are Requried"),
    

});



const Addproduct = () => {
    const [color, setColor] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getBrands());
        dispatch(getPcategory());
        dispatch(getColors());
        

    }, [dispatch]);

  
    const brandState = useSelector((state) => state.brand.brands);
    const categoryState = useSelector((state) => state.pcategory.pcategorys);
    const colorState = useSelector((state) => state.color.colors);
    const imgState = useSelector((state) => state.upload.images);
    const newProduct = useSelector((state) => state.product);
    const { isSuccess, isError, isLoading, createdProducts } = newProduct;

    useEffect(() => {
       
        if(isSuccess && createdProducts) {
          toast.success('Product Added Successfully!');
        }
        if(isError){
          toast.error("Something Went Wrong");
        }

    },[isSuccess, isError, isLoading, createdProducts]);



   


const coloropt = [];
    colorState.forEach((i) => {
        coloropt.push({
            label: i.title,
            value: i._id,
            
        });
    });

    const img = [];
    imgState.forEach((i) => {
        img.push({
            public_id: i.public_id,
            url: i.url,
        });
    });

    
   
    useEffect(() => {
        formik.values.color = color ? color : "";
        formik.values.images = img;
    },[color, img])

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            price: '',
            brand: '',
            category: '',
            tags: '',
            quantity: '',
            color: '',
            images: "",
        },
        validationSchema: Schema,
        onSubmit: (values) => {
            
        dispatch(createProducts(values));
        formik.resetForm();
        setColor(null);
        setTimeout(() => {
            dispatch(resetState())
        navigate("/admin/product-list");
        }, 2000);
        },

    });

    const handleColors = (event) => {
        setColor(event);   
    }


    const [desc, setDesc] = useState();
    const handleDesc = (event) => {
        setDesc(event);
    }
    return (
        <div>
            <h3 className="mb-4 title">Add Product</h3>
            <div>
                <form
                    onSubmit={formik.handleSubmit}
                    className='d-flex gap-3 flex-column'>

                    <Custominput type='text'
                        label='Enter Product Title'
                        name="title"
                        onChange={formik.handleChange("title")}
                        onBlur={formik.handleBlur("title")}
                        value={formik.values.title}
                    />
                    <div className="error ">
                        {formik.touched.title && formik.errors.title}

                    </div>

                    <div className=''>
                        <ReactQuill theme="snow"
                       
                        />
                    </div>

                    <Custominput type='text'
                        label='Enter Product Description'
                        name="description"
                        onChange={formik.handleChange("description")}
                        onBlur={formik.handleBlur("description")}
                        value={formik.values.description}
                    />

                    <div className="error ">
                        {formik.touched.description && formik.errors.description}


                    </div>




                    <Custominput type='number'
                        label='Enter Product Price'
                        name="price"
                        onChange={formik.handleChange("price")}
                        onBlur={formik.handleBlur("price")}
                        value={formik.values.price}
                    />

                    <div className="error ">
                        {formik.touched.price && formik.errors.price}

                    </div>



                    <select
                        name="brand"
                        onChange={formik.handleChange("brand")}
                        onBlur={formik.handleBlur("brand")}
                        value={formik.values.brand}
                        id=""
                        className='form-control py-3 mb-3'
                    >
                        <option value="">Select Brand</option>
                        {brandState.map((i, j) => {
                            return (
                                <option key={j} value={i.title}>
                                    {i.title}
                                </option>
                            );
                        })};
                    </select>
                    <div className="error ">
                        {formik.touched.brand && formik.errors.brand}
                    </div>

                    <select
                        name="category"
                        onChange={formik.handleChange("category")}
                        onBlur={formik.handleBlur("category")}
                        value={formik.values.category}
                        id=""
                        className='form-control py-3 mb-3'
                    >
                        <option value="">Select Category</option>
                        {categoryState.map((i, j) => {
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

                    <select
                        name="tags"
                        onChange={formik.handleChange("tags")}
                        onBlur={formik.handleBlur("tags")}
                        value={formik.values.tags}
                        id=""
                        className='form-control py-3 mb-3'
                    >
                        <option value="" disabled>Select Tags</option>
                        <option value="featured">Featured</option>
                        <option value="popular">Popular</option>
                        <option value="special">Special</option>
                       
                    </select>
                    <div className="error ">
                        {formik.touched.tags && formik.errors.tags}

                    </div>

                    <Select
                    mode='multiple'
                    allowClear className='w-100'
                    placeholder='Select Colors'
                    defaultValue={color}
                    onChange={(i) => handleColors(i)} 
                    options={coloropt}
                    />

                    <div className="error ">
                        {formik.touched.color && formik.errors.color ? (
                            <div>{formik.errors.color}</div>
                        ) : null}
                    </div>




                    <Custominput type='number'
                        label='Enter Product Quantity'
                        name="quantity"
                        onChange={formik.handleChange("quantity")}
                        onBlur={formik.handleBlur("quantity")}
                        value={formik.values.quantity}
                    />

                    <div className="error ">
                        {formik.touched.quantity && formik.errors.quantity}

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
                            imgState?.map((i,j)=> {
                                return (
                                    <div className='position-relative' key={j}>
                                        <button type='button' onClick={()=> dispatch(delImg(i.public_id))} className="btn-close position-absolute bg-danger" style={{top:"10px",right:"10px"}}></button>
                                        <img src={i.url} alt="image" width={200} height={200}/>
                                    </div>
                                )
                            })
                        }
                    </div>


                    <button  className='btn btn-success border-0 rounded-3 my-5' type='submit'>Add Product</button>
                </form>


            </div>
        </div>
    );
}

export default Addproduct;
