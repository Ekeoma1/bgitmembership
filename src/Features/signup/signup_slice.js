// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import SignupService from './signup_service';
// import * as states from '../../utils/strings';

// const initialState = {
//   signUpFormData: {},
//   signup: {
//     status: states.BASE,
//     data: {},
//   },
// };

// export const triggerSignup = createAsyncThunk(
//   'sign up',
//   async (params, thunkAPI) => {
//     try {
//       console.log('sign up params', params);
//       return await SignupService.signup(params);
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );

// const signupSlice = createSlice({
//   name: 'sign up',
//   initialState,
//   reducers: {
//     addSignUpFormData: (state, action) => {
//       const { payload } = action;
//       state.signUpFormData = {
//         ...state.signUpFormData,
//         ...payload,
//       };
//     },
//     resetSignUpFormData: (state) => {
//       state.signUpFormData = initialState.signUpFormData;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(triggerSignup.pending, (state) => {
//       state.signup.status = states.LOADING;
//       state.signup.data = {};
//     });
//     builder.addCase(triggerSignup.fulfilled, (state, action) => {
//       state.signup.status = states.SUCCESSFUL;
//       state.signup.data = action.payload;
//     });
//     builder.addCase(triggerSignup.rejected, (state, action) => {
//       state.signup.status = states.ERROR;
//       state.signup.data = {};
//     });
//   },
// });

// export default signupSlice.reducer;
// export const { addSignUpFormData, resetSignUpFormData } = signupSlice.actions;
