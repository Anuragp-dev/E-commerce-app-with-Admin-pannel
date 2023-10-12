import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authservice from "./authService";

const getUserfromLocalStorage = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;


const initialState = {
    user: getUserfromLocalStorage,
    orders: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
    OrderedByUser: [],
};



export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {

        return await authservice.login(userData);


    } catch (error) {
        return thunkAPI.rejectWithValue(error)

    }
})


export const getOrders = createAsyncThunk('order/get-orders', async (data,thunkAPI) => {
    try {
        return await authservice.getOrders(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getAOrder = createAsyncThunk('order/get-order', async (id, thunkAPI) => {
    try {
        return await authservice.getOrder(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const updateAOrder = createAsyncThunk('order/update-order', async (data, thunkAPI) => {
    try {
        return await authservice.updateOrder(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const getMonthlyData = createAsyncThunk('order/monthlydata', async (data,thunkAPI) => {
    try {
        return await authservice.getMonthlyOrders(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const getYearlyData = createAsyncThunk('order/yearlydata', async (data,thunkAPI) => {
    try {
        return await authservice.getYearlyOrders(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});






export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(login.fulfilled, (state, action) => {
                state.isError = false
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.message = "success"
            })

            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isError = false
                state.isLoading = false;
                state.isSuccess = true;
                state.orders = action.payload;
                state.message = "success"
            })

            .addCase(getOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error;
                state.isSuccess = false;

            })

            .addCase(getAOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAOrder.fulfilled, (state, action) => {
                state.isError = false
                state.isLoading = false;
                state.isSuccess = true;
                state.singleOrder = action.payload;
                state.message = "success"
            })

            .addCase(getAOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error;
                state.isSuccess = false;

            })

            .addCase(getMonthlyData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMonthlyData.fulfilled, (state, action) => {
                state.isError = false
                state.isLoading = false;
                state.isSuccess = true;
                state.monthlyData = action.payload;
                state.message = "success"
            })

            .addCase(getMonthlyData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error;
                state.isSuccess = false;

            })

            .addCase(getYearlyData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getYearlyData.fulfilled, (state, action) => {
                state.isError = false
                state.isLoading = false;
                state.isSuccess = true;
                state.yearlyData = action.payload;
                state.message = "success"
            })

            .addCase(getYearlyData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error;
                state.isSuccess = false;

            })


            .addCase(updateAOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateAOrder.fulfilled, (state, action) => {
                state.isError = false
                state.isLoading = false;
                state.isSuccess = true;
                state.updatedOrder = action.payload;
                state.message = "success"
            })

            .addCase(updateAOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error;
                state.isSuccess = false;

            })




    },
});


export default authSlice.reducer;