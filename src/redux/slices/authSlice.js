import { authHeaders } from "@/lib/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const checkAuthStatus = createAsyncThunk(
  "auth-user/checkAuthStatus",
  async (_, { rejectWithValue }) => {
    try {
      //   await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axios.get("/api/auth/status", {
        headers: authHeaders(),
      });

      if (!response.data.success) throw new Error(response.data.message);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/login", userData);

      if (!response.data.success) throw new Error(response.data.message);

      return response.data.data;
    } catch (error) {
      console.log(error);

      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/signup", userData);

      if (!response.data.success) throw new Error(response.data.message);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    loading: true,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuthStatus.fulfilled, (state, { payload }) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(checkAuthStatus.rejected, (state, { payload }) => {
        state.error = null;
        state.loading = false;
      });

    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        localStorage.setItem("token", payload.token);
        state.token = payload.token;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      });

    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        localStorage.setItem("token", payload.token);
        state.token = payload.token;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(signup.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      });
  },
});

export const { clearError, logout } = authSlice.actions;
export default authSlice.reducer;
