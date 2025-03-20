import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const login = createAsyncThunk("auth/login",
    async (credintials, { rejectWithValue }) => {
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", credintials);
            return res.data;

        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data.message || "Login is failed!");
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        return null;
    }
);


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: null,
        token: localStorage.getItem("token") || "",
        isAuthenticated: !!localStorage.getItem("token"),
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.currentUser = null;
                state.token = "";
                state.isAuthenticated = false;
            })
            .addCase(logout.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
    }
})

export const { resetAuthError } = authSlice.actions;
export default authSlice.reducer;