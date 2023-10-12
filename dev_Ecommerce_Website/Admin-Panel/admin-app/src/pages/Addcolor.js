import { useEffect } from 'react';
import Custominput from '../components/Custominput';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from "react-router-dom";
import { createColor, getAColor, updateAColor } from '../features/color/colorSlice';
import { resetState } from '../features/blogcategory/bcategorySlice';

let Schema = Yup.object({
  title: Yup.string().required("Color Is Requried"),
});


const Addcolor = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getColorId = location.pathname.split("/")[3];

  const newColor = useSelector((state) => state.color);
  const { isSuccess, isError, isLoading, createdColors ,colorName , updatedColors } = newColor;

  useEffect(() => {
    if(getColorId !== undefined){
      dispatch(getAColor(getColorId));
    }else {
      dispatch(resetState());
    }
  },[getColorId]);

  useEffect(() => {

    if (isSuccess && createdColors) {

      toast.success('Color Added Successfully!');
    }
    if(updatedColors && isSuccess){
      toast.success('Color Updated Successfully!');
      navigate("/admin/list-color");
    }
    if (isError) {
      toast.error("Something Went Wrong");
    }

  }, [isSuccess, isError, isLoading, createdColors , updatedColors]);



  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      title: colorName || "",
    },
    validationSchema: Schema,
    onSubmit: (values) => {
      if (getColorId !== undefined) {
        const data = {id:getColorId , colorData: values};
        dispatch(updateAColor(data));
        dispatch(resetState());
      }else {
        dispatch(createColor(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState())
          navigate("/admin/list-color");
        }, 300);
      }

     
    },

  });
  return (
    <div>
      <h3 className="mb-4 title">{getColorId !== undefined ? "Edit" : "Add"} Color</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit} >
          <Custominput
            type="color"
            label="Enter Color"
            name="title"
            id='color'
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            value={formik.values.title}
          />
          <div className="error ">
            {formik.touched.title && formik.errors.title}
          </div>
          <button className='btn btn-success border-0 rounded-3 my-4' type='submit'>{getColorId !== undefined ? "Edit" : "Add"} Color</button>
        </form>
      </div>
    </div>
  )
  
}

export default Addcolor;
