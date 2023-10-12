import { createSlice, createAsyncThunk, createAction  } from "@reduxjs/toolkit";
import blogService from "./blogService";


export const createBlogs = createAsyncThunk('blogs/create-blogs', async (blogData,thunkAPI) => {
    try {
        return await blogService.createBlogs(blogData);
        } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getBlogs = createAsyncThunk('blogs/get-blogs', async (thunkAPI) => {
    try {
        return await blogService.getBlogs();
        } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getABlog = createAsyncThunk('blogs/get-blog', async (id,thunkAPI) => {
    try {
        return await blogService.getBlog(id);
        } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const updateABlog = createAsyncThunk('blogs/update-blogs', async (blog,thunkAPI) => {
    try {
        return await blogService.updateBlog(blog);
        } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const deleteABlog = createAsyncThunk('blogs/delete-blogs', async (id,thunkAPI) => {
    try {
        return await blogService.deleteBlog(id);
        } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const resetState = createAction("Reset_all");
const initialState = {
    blogs : [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}


export const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(getBlogs.pending, (state) => {
            state.isLoading = true;
        })
        
        .addCase(getBlogs.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.blogs = action.payload;
        })

        .addCase(getBlogs.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })

        .addCase(createBlogs.pending, (state) => {
            state.isLoading = true;
        })
        
        .addCase(createBlogs.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdBlogs = action.payload;
        })

        .addCase(createBlogs.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })

        .addCase(getABlog.pending, (state) => {
            state.isLoading = true;
        })
        
        .addCase(getABlog.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.BlogName = action.payload.title;
            state.BlogDescription = action.payload.description;
            state.BlogCategory = action.payload.category;
            state.BlogImages = action.payload.images;
        })

        .addCase(getABlog.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })

        .addCase(updateABlog.pending, (state) => {
            state.isLoading = true;
        })
        
        .addCase(updateABlog.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedBlogs = action.payload;
        })

        .addCase(updateABlog.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })

        .addCase(deleteABlog.pending, (state) => {
            state.isLoading = true;
        })
        
        .addCase(deleteABlog.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedBlogs = action.payload;
        })

        .addCase(deleteABlog.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        
        
        
        
        .addCase(resetState, ()=> initialState );
    },
})


export default blogSlice.reducer;