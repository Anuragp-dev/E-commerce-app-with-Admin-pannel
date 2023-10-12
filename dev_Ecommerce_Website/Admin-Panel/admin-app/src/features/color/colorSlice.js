import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import colorService from "./colorService";




export const getColors = createAsyncThunk('colors/get-colors', async (thunkAPI) => {
    try {
        return await colorService.getColors();
        } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getAColor = createAsyncThunk('colors/get-color', async (id,thunkAPI) => {
    try {
        return await colorService.getColor(id);
        } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const updateAColor = createAsyncThunk('colors/update-color', async (color,thunkAPI) => {
    try {
        return await colorService.updateColor(color);
        } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteAColor = createAsyncThunk('colors/delete-color', async (id,thunkAPI) => {
    try {
        return await colorService.deleteColor(id);
        } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const createColor = createAsyncThunk('color/create-color', async (color,thunkAPI) => {
    try {
        return await colorService.createColor(color);
        } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const resetState = createAction("Reset_all");
const initialState = {
    colors : [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}


export const colorSlice = createSlice({
    name: "colors",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(getColors.pending, (state) => {
            state.isLoading = true;
        })
        
        .addCase(getColors.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.colors = action.payload;
        })

        .addCase(getColors.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })

        .addCase(createColor.pending, (state) => {
            state.isLoading = true;
        })
        
        .addCase(createColor.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdColors = action.payload;
        })

        .addCase(createColor.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })

        .addCase(getAColor.pending, (state) => {
            state.isLoading = true;
        })
        
        .addCase(getAColor.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.colorName = action.payload.title;
        })

        .addCase(getAColor.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })

        .addCase(updateAColor.pending, (state) => {
            state.isLoading = true;
        })
        
        .addCase(updateAColor.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedColors = action.payload;
        })

        .addCase(updateAColor.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })

        .addCase(deleteAColor.pending, (state) => {
            state.isLoading = true;
        })
        
        .addCase(deleteAColor.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedColors = action.payload;
        })

        .addCase(deleteAColor.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(resetState, ()=> initialState );
    },
})


export default colorSlice.reducer;
