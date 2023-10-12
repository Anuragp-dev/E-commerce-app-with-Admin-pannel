import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import brandService from "./brandService";


export const getBrands = createAsyncThunk('brands/get-brands', async (thunkAPI) => {
   
    try {
        return await brandService.getBrands();
        } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const getABrand = createAsyncThunk('brands/get-brand', async (id, thunkAPI) => {
    try {
        return await brandService.getBrand(id);
        } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateABrand = createAsyncThunk('brand/update-brand', async (brand,thunkAPI) => {

    try {
        return await brandService.updateBrand(brand);
        } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const deleteABrand = createAsyncThunk('brands/delete-brand', async (id, thunkAPI) => {
    try {
        return await brandService.deleteBrand(id);
        } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});



export const createBrands = createAsyncThunk('brand/create-brands', async (brandData,thunkAPI) => {
    
    try {
        return await brandService.createBrands(brandData);
        } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});



export const resetState = createAction("Reset_all");
const initialState = {
    brands : [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}


export const brandSlice = createSlice({
    name: "brands",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(getBrands.pending, (state) => {
            state.isLoading = true;
        })
        
        .addCase(getBrands.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.brands = action.payload;
        })

        .addCase(getBrands.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })

        .addCase(createBrands.pending, (state) => {
            state.isLoading = true;
        })
        
        .addCase(createBrands.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdBrands = action.payload;
        })

        .addCase(createBrands.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })

        .addCase(getABrand.pending, (state) => {
            state.isLoading = true;
        })
        
        .addCase(getABrand.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.brandName = action.payload.title;
        })

        .addCase(getABrand.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        

        .addCase(updateABrand.pending, (state) => {
            state.isLoading = true;
        })
        
        .addCase(updateABrand.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedBrands = action.payload;
        })

        .addCase(updateABrand.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })


        .addCase(deleteABrand.pending, (state) => {
            state.isLoading = true;
        })
        
        .addCase(deleteABrand.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedBrands = action.payload;
        })

        .addCase(deleteABrand.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(resetState,()=> initialState );

        
    },
})


export default brandSlice.reducer;
