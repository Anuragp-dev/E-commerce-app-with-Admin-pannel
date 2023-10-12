import { useEffect } from 'react';
import Custominput from '../components/Custominput';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from "react-router-dom";
import { createCoupons, getACoupon, resetState, updateACoupon } from '../features/coupon/couponSlice';


let Schema = Yup.object({
  name: Yup.string().required("Coupon Name Is Requried"),
  expiry: Yup.date().required(" Expiry Date Is Requried"),
  discount: Yup.number().required("Discount Percentage Is Requried"),
});

const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getCouponId = location.pathname.split("/")[3];

const newCoupon = useSelector((state)=> state.coupon)
  const { isSuccess, isError, isLoading, createdCoupons , couponName, couponExpiry, couponDiscount , updatedCoupons  } = newCoupon;

  // const changeDateFormat = (date) => {
  //   const newDate = new Date(date).toLocaleDateString();
  //   const [month , day ,year ] = newDate.split("/");
  //   return [day , month , year].join("-")
  // }

  useEffect(() => {
    if(getCouponId !== undefined) {
      dispatch(getACoupon(getCouponId));
    }else {
      dispatch(resetState());
    }
    },[getCouponId]);


  useEffect(() => {
     
    if( isSuccess && createdCoupons ) {
      
      toast.success('Coupon Added Successfully!');
    }

    if(updatedCoupons  && isSuccess){
      toast.success('Coupon Updated Successfully!');
      navigate("/admin/coupon-list");
    }

    if(isError){
      toast.error("Something Went Wrong");
    }

},[isSuccess, isError, isLoading, createdCoupons, updatedCoupons]);



  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      name: couponName || "",
      expiry: couponExpiry || "",
      discount: couponDiscount || "",
    },
    validationSchema: Schema,
    onSubmit: (values) => {
      if(getCouponId !== undefined) {
        const data = { id: getCouponId , couponData: values};
        dispatch(updateACoupon(data));
        dispatch(resetState());
      }else {
        dispatch(createCoupons(values));
      formik.resetForm();
        setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/coupon-list");
      },300);
      }

      
    },

  });

  return (
    <div>
      <h3 className="mb-4  title">{ getCouponId !== undefined ? "Edit":"Add" } Coupon</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <Custominput
            type="text"
            label="Enter Coupon Name"
            name="name"
            onChange={formik.handleChange("name")}
            onBlur={formik.handleBlur("name")}
            value={formik.values.name}
            id="name"
          />
          <div className="error ">
            {formik.touched.name && formik.errors.name}
          </div>

          <Custominput
            type="date"
            label="Enter Coupon Expiry Date"
            name="expiry"
            onChange={formik.handleChange("expiry")}
            onBlur={formik.handleBlur("expiry")}
            value={formik.values.expiry}
            id="date"
          />
          <div className="error ">
            {formik.touched.expiry && formik.errors.expiry}
          </div>

          <Custominput
            type="number"
            label="Enter Coupon Discount"
            name="discount"
            onChange={formik.handleChange("discount")}
            onBlur={formik.handleBlur("discount")}
            value={formik.values.discount}
            id="discount"
          />
          <div className="error ">
            {formik.touched.discount && formik.errors.discount}
          </div>


          <button className='btn btn-success border-0 rounded-3 my-4' type='submit'>{ getCouponId !== undefined ? "Edit":"Add" } Coupon</button>
        </form>
      </div>
    </div>
  );
}


export default AddCoupon;
