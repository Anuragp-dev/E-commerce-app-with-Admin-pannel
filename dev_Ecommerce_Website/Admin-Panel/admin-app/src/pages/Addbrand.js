import  { useEffect } from 'react';
import Custominput from '../components/Custominput';
import { useDispatch ,  useSelector  } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import {useLocation, useNavigate } from "react-router-dom";
import { createBrands, getABrand, updateABrand } from '../features/brand/brandSlice';
import { resetState } from '../features/blogcategory/bcategorySlice';


let Schema = Yup.object({
  title: Yup.string().required("Brand Name Is Requried"),
});

const Addbrand = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getBrandId = location.pathname.split("/")[3];
  const newBrand = useSelector((state) => state.brand);
  const { isSuccess, isError, isLoading, createdBrands, brandName, updatedBrands } = newBrand;
  useEffect(() => {
    if(getBrandId !== undefined ) {
      dispatch(getABrand(getBrandId));
    }else {
      dispatch(resetState());
    }
  },[getBrandId]);
 

  const navigate = useNavigate();



  useEffect(() => {
     
      if(isSuccess && createdBrands) {
        
        toast.success('Brand Added Successfully!');
      }
      if(updatedBrands && isSuccess){
        toast.success('Brand Updated Successfully!');
        navigate("/admin/list-brand");
      }
      if(isError){
        toast.error("Something Went Wrong");
      }

  },[isSuccess, isError, isLoading, createdBrands, updatedBrands ]);

 

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
        title: brandName || "",
    },
    validationSchema: Schema,
        onSubmit: (values) => {
            if (getBrandId !== undefined) {
              const data = {id: getBrandId, brandData: values};
              dispatch(updateABrand(data));
              dispatch(resetState());
            }else {
              dispatch(createBrands(values));
              formik.resetForm();
              setTimeout(() => {
                dispatch(resetState());
              navigate("/admin/list-brand");
              }, 1000);
            }
        },

    });
   
  return (
    <div>
    <h3 className="mb-4  title">{ getBrandId !== undefined ? "Edit":"Add" } Brand</h3>
    <div>
      <form action="" onSubmit={formik.handleSubmit}>
        <Custominput
         type="text"
         label="Enter Brands"
         name="title"
         onChange={formik.handleChange("title")}
         onBlur={formik.handleBlur("title")}
         value={formik.values.title} 
         />
            <div className="error ">
                        {formik.touched.title && formik.errors.title}
                        </div>

        <button className='btn btn-success border-0 rounded-3 my-4' type='submit'> { getBrandId !== undefined ? "Edit":"Add" }  Brand</button>
      </form>
    </div>
  </div>
  );
}

export default Addbrand;
