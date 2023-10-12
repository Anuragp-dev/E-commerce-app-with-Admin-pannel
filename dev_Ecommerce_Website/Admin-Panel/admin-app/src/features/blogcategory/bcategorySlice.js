import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import bcategoryService from "./bcategoryService";



export const createNewBlogCategory = createAsyncThunk('bCategory/create-bCategories', async (bcategoryData,thunkAPI) => {
    try {
        return await bcategoryService.createBlogcategory(bcategoryData);
        } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const getAllBcategories = createAsyncThunk('blogcategory/get-blogcategories', async (thunkAPI) => {
    try {
        return await bcategoryService.getBcategories();
        } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getABcategory = createAsyncThunk('blogcategory/get-blogcategory', async (id,thunkAPI) => {
    try {
        return await bcategoryService.getBCategory(id);
        } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const updateABcategory = createAsyncThunk('blogcategory/update-blogcategory', async (bcategory,thunkAPI) => {
    try {
        return await bcategoryService.updateBCategory(bcategory);
        } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const deleteABcategory = createAsyncThunk('blogcategory/delete-blogcategory', async (id,thunkAPI) => {
    try {
        return await bcategoryService.deleteBCategory(id);
        } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});



export const resetState = createAction("Reset_all");
const initialState = {
    bcategories : [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}


export const bcategorySlice = createSlice({
    name: "bcategories",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(getAllBcategories.pending, (state) => {
            state.isLoading = true;
        })
        
        .addCase(getAllBcategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.bcategories = action.payload;
        })

        .addCase(getAllBcategories.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })

        .addCase(createNewBlogCategory.pending, (state) => {
            state.isLoading = true;
        })
        
        .addCase(createNewBlogCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdBcategories = action.payload;
        })

        .addCase(createNewBlogCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }) 

        .addCase(getABcategory.pending, (state) => {
            state.isLoading = true;
        })
        
        .addCase(getABcategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.bcategoryName = action.payload.title;
        })

        .addCase(getABcategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }) 

        .addCase(updateABcategory.pending, (state) => {
            state.isLoading = true;
        })
        
        .addCase(updateABcategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedBCategories = action.payload;
        })

        .addCase(updateABcategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }) 

        .addCase(deleteABcategory.pending, (state) => {
            state.isLoading = true;
        })
        
        .addCase(deleteABcategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedBcategories = action.payload;
        })

        .addCase(deleteABcategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }) 
        
        .addCase(resetState, ()=> initialState );
    },
})


export default bcategorySlice.reducer;