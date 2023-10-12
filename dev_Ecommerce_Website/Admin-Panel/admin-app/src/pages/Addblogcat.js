import { useEffect } from 'react';
import Custominput from '../components/Custominput';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { createNewBlogCategory, getABcategory, resetState, updateABcategory } from '../features/blogcategory/bcategorySlice';




let Schema = Yup.object({
  title: Yup.string().required("Blog Category Is Requried"),
});


const Addblogcat = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
const getBcategoryId = location.pathname.split("/")[3];
  const newBlogCategory = useSelector((state) => state.bcategory);
  const { isSuccess, isError, isLoading, createdBcategories, updatedBCategories, bcategoryName  } = newBlogCategory;

  useEffect(() => {
    if (getBcategoryId !== undefined ) {
      dispatch(getABcategory(getBcategoryId));
    }else {
      dispatch(resetState());
    }
  },[getBcategoryId]);

  useEffect(() => {
    if (isSuccess && createdBcategories) {
      toast.success('Blog Category Added Successfully!');
    }

    if( updatedBCategories && isSuccess){
      toast.success('Blog Category Updated Successfully!');
      navigate("/admin/blog-category-list");
    }

    if (isError) {
      toast.error("Something Went Wrong");
    }

  }, [ isSuccess, isError, isLoading, createdBcategories, updatedBCategories, ]);



  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title:bcategoryName || "",
    },
    validationSchema: Schema,
    onSubmit: (values) => {
        if (getBcategoryId !== undefined ) {
          const data = { id:getBcategoryId, bcategoryData:values };
          dispatch(updateABcategory(data));
          dispatch(resetState());
        }else {
          dispatch(createNewBlogCategory(values));
          formik.resetForm();
          setTimeout(() => {
            dispatch(resetState());
            navigate("/admin/blog-category-list");
          }, 300);
        }
     
    },
  });


  return (
    <div>
      <h3 className="mb-4  title">{ getBcategoryId !== undefined ? "Edit" : "Add"} Blog Category</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <Custominput 
          type="text" 
          label="Enter Blog Category"
          name="title"
            id='blogcategory'
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            value={formik.values.title}
          />
          <div className="error ">
            {formik.touched.title && formik.errors.title}
          </div>
          <button className='btn btn-success border-0 rounded-3 my-4' type='submit'>{ getBcategoryId !== undefined ? "Edit" : "Add"} Blog Category</button>
        </form>
      </div>
    </div>
  );
}

export default Addblogcat;
