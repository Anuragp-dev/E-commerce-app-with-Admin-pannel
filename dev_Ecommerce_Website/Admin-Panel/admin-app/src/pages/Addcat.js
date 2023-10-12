import { useEffect } from 'react';
import Custominput from '../components/Custominput';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from "react-router-dom";
import { createPcategory, getAPcategory, updatePcategory } from '../features/productCategory/pcategorySlice';
import { resetState } from '../features/blogcategory/bcategorySlice';


let Schema = Yup.object({
  title: Yup.string().required("Category Name Is Requried"),
});

const Addcat = () => {
 
  const dispatch = useDispatch();
  const location = useLocation();
  const getProcategoryId = location.pathname.split("/")[3];
  
  const newPcategory = useSelector((state) => state.pcategory);
  const { isSuccess, isError, isLoading, createdPcategories, updatedCategory, categoryName } = newPcategory;
  useEffect(()=> {
    if (getProcategoryId !== undefined) {
      dispatch(getAPcategory(getProcategoryId));
    }else {
      dispatch(resetState());
    }
  },[getProcategoryId]);


  const navigate = useNavigate();


  useEffect(() => {

    if (isSuccess && createdPcategories) {

      toast.success('Category Added Successfully!');
    }

    if (updatedCategory && isSuccess) {
      toast.success('Category Upadated Successfully!');
      navigate("/admin/list-category")
    }

    if (isError) {
      toast.error("Something Went Wrong");
    }

  }, [isSuccess, isError, isLoading, createdPcategories, updatedCategory]);


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: Schema,
    onSubmit: (values) => {
      if (getProcategoryId !== undefined) {
        const data =  { id: getProcategoryId, categoryData: values };
        dispatch(updatePcategory(data));
        dispatch(resetState());
      }else {
        dispatch(createPcategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState())
          navigate("/admin/list-category");
        }, 100);
      }
    },

  });


  return (
    <div>
      <h3 className="mb-4  title">{ getProcategoryId !== undefined ? "Edit" : "Add"} Product Category</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <Custominput
            type="text"
            label="Enter Product Category"
            name="title"
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            value={formik.values.title}
          />
          <div className="error ">
            {formik.touched.title && formik.errors.title}
          </div>

          <button className='btn btn-success border-0 rounded-3 my-4' type='submit'>{ getProcategoryId !== undefined ? "Edit" : "Add"} Product Category</button>
        </form>
      </div>
    </div>

  );
}

export default Addcat;
