import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkAuthStatus } from "./authSlice";
import axios from "axios";
import { authHeaders } from "@/lib/auth";

export const applyForJob = createAsyncThunk(
  "user/applyForJob",
  async ({ jobId, setLoading }, { rejectWithValue }) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `/api/jobs/${jobId}/apply`,
        {},
        {
          headers: authHeaders(),
        }
      );

      setLoading(false);

      if (!response.data.success) throw new Error(response.data.message);

      return { jobId };
    } catch (error) {
      setLoading(false);
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    _id: null,
    name: null,
    email: null,
    role: null,
    jobs: [],
    loading: true,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuthStatus.fulfilled, (state, { payload }) => {
        state._id = payload.user._id;
        state.name = payload.user.name;
        state.email = payload.user.email;
        state.role = payload.user.role;
        state.jobs = payload.user.jobs;
        state.loading = false;
        state.error = null;
      })
      .addCase(checkAuthStatus.rejected, (state, { payload }) => {
        state.error = null;
        state.loading = false;
      });

    builder
      .addCase(applyForJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyForJob.fulfilled, (state, { payload }) => {
        state.jobs.push(payload.jobId);
        state.loading = false;
      })
      .addCase(applyForJob.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
