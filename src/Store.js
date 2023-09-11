import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Features/authSlice';
import eventReducer from './Features/eventSlice';
import signupReducer from './Features/signup/signup_slice';
import signinReducer from './Features/signin/signin_slice';

export default configureStore({
  reducer: {
    auth: authReducer,
    event: eventReducer,
    signup: signupReducer,
    signin: signinReducer,
  },
});
