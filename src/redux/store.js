import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import jobsReducer from "./slices/jobsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    jobs: jobsReducer,
  },
});

export default store;
