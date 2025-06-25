import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from './utils/axiosClient';

export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post('/user/register', userData)
            return response.data.user
        }
        catch (err) {
            return rejectWithValue(err);
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post('/user/login', credentials)
            console.log(response.data.user);
            
            return response.data.user
        }
        catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const checkAuth = createAsyncThunk(
    'auth/check',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axiosClient.get('/user/check')
            return data.user
        }
        catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await axiosClient.post('/user/logout');
            return null;
        }
        catch (err) {
            return rejectWithValue(err)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: { loading: false, user: null, isAuthenticated: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Register Cases
            .addCase(registerUser.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                //  console.log(action);
                state.loading = false
                state.error = null
                state.user = action.payload
                state.isAuthenticated = !!action.payload
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.payload?.message || 'something went wrong';
                state.loading = false
                state.isAuthenticated = false
                state.user = null
            })

            // Login cases
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = false
                state.user = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
                state.isAuthenticated = !!action.payload
                state.error = null
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload?.message || 'something went wrong'
                state.user = null
            })

            // CheckAuth cases
            .addCase(checkAuth.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
                state.isAuthenticated = true
                state.error = null
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload?.message || 'something went wrong'
                state.isAuthenticated = false
                state.user = null
            })

            // Logout cases
            .addCase(logoutUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false
                state.user = null
                state.isAuthenticated = false
                state.error = null
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false
                state.error = action?.payload?.message || 'something went wrong'
                state.user = null
                state.isAuthenticated = false

            })
    }
})

export default authSlice.reducer;