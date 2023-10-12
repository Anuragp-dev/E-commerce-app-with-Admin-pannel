import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import couponService from "./couponService";



export const getAllCoupon = createAsyncThunk('coupons/get-coupons', async (thunkAPI) => {
    try {
        return await couponService.getCoupons();
        } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const updateACoupon = createAsyncThunk('coupons/update-coupon', async (coupon,thunkAPI) => {
    try {
        return await couponService.updateCoupon(coupon);
        } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const getACoupon = createAsyncThunk('coupons/get-coupon', async (id,thunkAPI) => {
    try {
        return await couponService.getCoupon(id);
        } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const deleteACoupon = createAsyncThunk('coupons/delete-coupon', async (id,thunkAPI) => {
    try {
        return await couponService.deleteCoupons(id);
        } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});



export const createCoupons = createAsyncThunk('coupons/create-coupons', async (couponData,thunkAPI) => {
    try {
        return await couponService.createCoupons(couponData);
        } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const resetState = createAction("Reset_all");
const initialState = {
    coupons : [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}


export const couponSlice = createSlice({
    name: "coupons",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder

        .addCase(createCoupons.pending, (state) => {
            state.isLoading = true;
        })
        
        .addCase(createCoupons.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdCoupons = action.payload;
        })

        .addCase(createCoupons.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })



        .addCase(getAllCoupon.pending, (state) => {
            state.isLoading = true;
        })
        
        .addCase(getAllCoupon.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.coupons = action.payload;
        })

        .addCase(getAllCoupon.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })

        .addCase(getACoupon.pending, (state) => {
            state.isLoading = true;
        })
        
        .addCase(getACoupon.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.couponName = action.payload.name;
            state.couponExpiry = action.payload.expiry;
            state.couponDiscount = action.payload.discount;
        })

        .addCase(getACoupon.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        

        .addCase(updateACoupon.pending, (state) => {
            state.isLoading = true;
        })
        
        .addCase(updateACoupon.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedCoupons = action.payload;
        })

        .addCase(updateACoupon.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        
        .addCase(deleteACoupon.pending, (state) => {
            state.isLoading = true;
        })
        
        .addCase(deleteACoupon.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedCoupons = action.payload;
        })

        .addCase(deleteACoupon.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        
        .addCase(resetState, ()=> initialState );

        
    },
})


export default couponSlice.reducer;
