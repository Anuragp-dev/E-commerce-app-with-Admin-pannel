import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify";





export const registerUser = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
    try {
        return await authService.register(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const loginUser = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
    try {
        return await authService.login(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getUserProductWishlist = createAsyncThunk(
    "user/wishlist",
    async (thunkAPI) => {
        try {
            return await authService.getUserWishlist();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)


export const addProductToCart = createAsyncThunk("user/addtocart", async (cartData, thunkAPI) => {
    try {
        return await authService.addToCart(cartData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const getUserCart = createAsyncThunk("user/getcart", async (thunkAPI) => {
    try {
        return await authService.getCart();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const updateAProductFromCart = createAsyncThunk("user/updatecart", async (cartDetail, thunkAPI) => {
    try {
        return await authService.updateProductFromCart(cartDetail);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});




export const deleteAProductFromCart = createAsyncThunk("user/deletecart", async (data, thunkAPI) => {
    try {
        return await authService.removeProductFromCart(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const createAnOrder = createAsyncThunk("user/cart/createorder", async (orderDetail, thunkAPI) => {
    try {
        return await authService.createOrder(orderDetail);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});



export const getOrders = createAsyncThunk("user/getorders", async (thunkAPI) => {
    try {
        return await authService.getUserOders();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const updateProfileUser = createAsyncThunk("user/updateprofile", async (data, thunkAPI) => {
    try {
        return await authService.updateProfile(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const forgotPassword = createAsyncThunk("user/forgotpassword", async (data, thunkAPI) => {
    try {
        return await authService.forgotPassToken(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const resetPassword = createAsyncThunk("user/resetpassword", async (data, thunkAPI) => {
    try {
        return await authService.resetPass(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const deleteUserCart = createAsyncThunk("user/emptycart", async (thunkAPI) => {
    try {
        return await authService.emptyCart();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});






const getCustomerfromLocalStorage = localStorage.getItem('customer')
    ? JSON.parse(localStorage.getItem('customer'))
    : null;

export const resetState = createAction("Reset_all");

const initialState = {
    user: getCustomerfromLocalStorage,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}


export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdUser = action.payload;
                if (state.isSuccess === true) {
                    toast.success("Account Created Successfully");

                }
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                  toast.error('User already exist! please login!');
                }
              })

            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.user = action.payload;

                if (state.isSuccess === true) {
                    localStorage.setItem("token", action.payload.token);
                    toast.success("Login Successfully");
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.payload.response.data.message);
                }
            })

            .addCase(getUserProductWishlist.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserProductWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.wishlisted = action.payload;
            })
            .addCase(getUserProductWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })

            .addCase(addProductToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addProductToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cartProduct = action.payload;
                if (state.isSuccess) {
                    toast.success("Product Added To Cart")
                }
            })
            .addCase(addProductToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })

            .addCase(getUserCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.addedCartProduct = action.payload;

            })
            .addCase(getUserCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })

            .addCase(deleteAProductFromCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteAProductFromCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedCartProduct = action.payload;
                if(state.isSuccess) {
                    toast.success(" Removed ");
                }

            })
            .addCase(deleteAProductFromCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isSuccess === false ) {
                    toast.error("Something Went Wrong");
                }

            })

            .addCase(updateAProductFromCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateAProductFromCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedCartProduct = action.payload;
               
            })
            .addCase(updateAProductFromCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isSuccess === false ) {
                    toast.error("Something Went Wrong");
                }

            })

            .addCase(createAnOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createAnOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.orderedProduct = action.payload;
                if(state.isSuccess ) {
                    toast.success("Order placed");
                }
               
            })
            .addCase(createAnOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isSuccess === false ) {
                    toast.error("Something Went Wrong");
                }

            })

            
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.getorderedProduct = action.payload;
               
               
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
               

            })

            .addCase(updateProfileUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProfileUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedUser = action.payload;
                
                // if( state.isSuccess === true ) {
                    let currentUserData = JSON.parse(localStorage.getItem("customer"))
                    let newUserData = {
                        _id: currentUserData?._id,
                        token : currentUserData?.token,
                        firstname : action?.payload?.firstname,
                        lastname : action?.payload?.lastname,
                        email : action?.payload?.email,
                        mobile : action?.payload?.mobile,
                    }
                    localStorage.setItem("customer", JSON.stringify(newUserData));
                    state.user = newUserData;
                    toast.success("Profile Upadated Successfully");
                // }
               
               
            })
            .addCase(updateProfileUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isSuccess === false ) {
                    toast.error("Something Went Wrong");
                }
            })

            .addCase(forgotPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.token = action.payload;
                if(state.isSuccess ) {
                    toast.success("Reset Password Link  Send To Your Email Successfully");
                }
               
               
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isSuccess === false ) {
                    toast.error("Something Went Wrong");
                }
            })

            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.password = action.payload;
                if(state.isSuccess ) {
                    toast.success(" Password Updated Successfully");
                }
               
               
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isSuccess === false ) {
                    toast.error("Something Went Wrong");
                }
            })


            
            .addCase(deleteUserCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteUserCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedCart = action.payload;
             
               
            })
            .addCase(deleteUserCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
    
            })

            .addCase(resetState, () => initialState);

    }
})

export default authSlice.reducer;