import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/authSlice";
import eventReducer from './Features/eventSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    event: eventReducer,
  },
});
