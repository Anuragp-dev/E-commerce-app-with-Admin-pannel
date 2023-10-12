import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import pcategoryService from "./pcategoryService";



export const getPcategory = createAsyncThunk('productcategory/get-productcategories', async (thunkAPI) => {
    try {
        return await pcategoryService.getPcategory();
        } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const createPcategory = createAsyncThunk('pcategory/create-pcategories', async (pcategory,thunkAPI) => {
    try {
        return await pcategoryService.createPcategory(pcategory);
        } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});



export const getAPcategory = createAsyncThunk('pcategory/get-pcategory', async (id,thunkAPI) => {
    try {
        return await pcategoryService.getAProdCat(id);
        } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const updatePcategory = createAsyncThunk('pcategory/update-pcategory', async (category,thunkAPI) => {
    try {
        return await pcategoryService.updateProCat(category);
        } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});



export const deletePcategory = createAsyncThunk('pcategory/delete-pcategory', async (id,thunkAPI) => {
    try {
        return await pcategoryService.deleteProCat(id);
        } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});




export const resetState = createAction("Reset_all");
const initialState = {
    pcategorys : [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}


export const pcategorySlice = createSlice({
    name: "product_category",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(getPcategory.pending, (state) => {
            state.isLoading = true;
        })
        
        .addCase(getPcategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.pcategorys = action.payload;
        })

        .addCase(getPcategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })

        .addCase(createPcategory.pending, (state) => {
            state.isLoading = true;
        })
        
        .addCase(createPcategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdPcategories = action.payload;
        })

        .addCase(createPcategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })

        .addCase(getAPcategory.pending, (state) => {
            state.isLoading = true;
        })
        
        .addCase(getAPcategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.categoryName = action.payload.title;
        })

        .addCase(getAPcategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })

        .addCase(updatePcategory.pending, (state) => {
            state.isLoading = true;
        })
        
        .addCase(updatePcategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedCategory = action.payload;
        })

        .addCase(updatePcategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })

        .addCase(deletePcategory.pending, (state) => {
            state.isLoading = true;
        })
        
        .addCase(deletePcategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedPcategory = action.payload;
        })

        .addCase(deletePcategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        
        

        .addCase(resetState, ()=> initialState );
    },
})


export default pcategorySlice.reducer;