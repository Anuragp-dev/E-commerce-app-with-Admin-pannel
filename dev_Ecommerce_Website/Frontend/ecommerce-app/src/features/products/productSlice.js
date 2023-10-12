import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "./productService";
import { toast } from "react-toastify";



export const getAllProducts = createAsyncThunk("product/getallproduct", async (data,thunkAPI) => {
    try {
        return await productService.getProducts(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getSingleProduct = createAsyncThunk("product/getsingleproduct", async (id,thunkAPI) => {
    try {
        return await productService.getAProduct(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const addToAWishList = createAsyncThunk("product/wishlist", async (prodId, thunkAPI) => {
    try {
        return await productService.addToWishlist(prodId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const addRating  = createAsyncThunk("product/rating", async (data, thunkAPI) => {
    try {
        return await productService.rateProduct(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});





const productState = {
    product: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}


export const productSlice = createSlice({
    name: "product",
    initialState: productState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.product = action.payload;

            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;

            })

            .addCase(addToAWishList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToAWishList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.addtowishlist = action.payload;
                state.message = 'Product Added To Wishlist!';
            })
            .addCase(addToAWishList.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;

            })

            .addCase(getSingleProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSingleProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.singleProduct = action.payload;
                state.message = ' Single Product Fetched Successfully';
            })
            .addCase(getSingleProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;

            })

            .addCase(addRating.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addRating.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.rating = action.payload;
                if(state.isSuccess ) {
                    toast.success(" Rating Added Successfully");
                }
               
            })
            .addCase(addRating.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            


    }
})

export default productSlice.reducer;