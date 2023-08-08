import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/authSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
