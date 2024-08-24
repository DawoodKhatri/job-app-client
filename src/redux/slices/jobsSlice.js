import { authHeaders } from "@/lib/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllJobs = createAsyncThunk(
  "jobs/getAllJobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/jobs/all", {
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

export const addJob = createAsyncThunk(
  "jobs/addJob",
  async ({ job, onSuccess }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/jobs", job, {
        headers: authHeaders(),
      });

      if (!response.data.success) throw new Error(response.data.message);

      onSuccess();

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

export const updateJob = createAsyncThunk(
  "jobs/updateJob",
  async ({ jobId, job, onSuccess }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/jobs/${jobId}`, job, {
        headers: authHeaders(),
      });

      if (!response.data.success) throw new Error(response.data.message);

      onSuccess();

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

export const updateJobStatus = createAsyncThunk(
  "jobs/updateJobStatus",
  async ({ jobId, active }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/api/jobs/${jobId}`,
        { active },
        {
          headers: authHeaders(),
        }
      );

      if (!response.data.success) throw new Error(response.data.message);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

export const getActiveJobs = createAsyncThunk(
  "jobs/getActiveJobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/jobs", {
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

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    loading: true,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllJobs.fulfilled, (state, action) => {
        state.jobs = action.payload.jobs;
        state.loading = false;
      })
      .addCase(getAllJobs.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });

    builder
      .addCase(addJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(addJob.fulfilled, (state, action) => {
        state.jobs.push(action.payload.job);
        state.loading = false;
      })
      .addCase(addJob.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });

    builder
      .addCase(updateJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.map((job) =>
          job._id === action.payload.job._id ? action.payload.job : job
        );
        state.loading = false;
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });

    builder
      .addCase(updateJobStatus.pending, (state) => {
        // state.loading = true;
      })
      .addCase(updateJobStatus.fulfilled, (state, action) => {
        state.jobs = state.jobs.map((job) =>
          job._id === action.payload.job._id ? action.payload.job : job
        );
        state.loading = false;
      })
      .addCase(updateJobStatus.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });

    builder
      .addCase(getActiveJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getActiveJobs.fulfilled, (state, action) => {
        state.jobs = action.payload.jobs;
        state.loading = false;
      })
      .addCase(getActiveJobs.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { clearError } = jobsSlice.actions;

export default jobsSlice.reducer;
