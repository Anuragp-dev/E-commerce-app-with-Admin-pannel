import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/user/userSlice';
import productReducer from '../features/products/productSlice';
import blogReducer from '../features/blog/blogSlice';
import contactReducer from '../features/contact/contactSlice';







export const store = configureStore({
  reducer: {
    auth : authReducer,
    product : productReducer,
    blog : blogReducer,
    contact : contactReducer,
  },
});
