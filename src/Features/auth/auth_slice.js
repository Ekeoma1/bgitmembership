import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService from './auth_service';
import * as states from '../../utils/strings';
let loginStatus = false;
let token = localStorage.getItem('token');

if (token && token !== 'undefined') {
  token = JSON.parse(token);
  loginStatus = true;
}

const initialState = {
  isLoggedIn: loginStatus,
  signUpFormData: {},
  signup: {
    status: states.BASE,
    data: {},
  },
  signin: {
    status: states.BASE,
    data: {},
  },
  forgotPassword: {
    status: states.BASE,
    data: {},
  },
  resetPassword: {
    status: states.BASE,
    data: {},
  },
};
export const triggerSignup = createAsyncThunk(
  'sign-up',
  async (params, thunkAPI) => {
    try {
      console.log('sign up params', params);
      return await AuthService.signup(params);
    } catch (e) {
      console.log('reject error', e);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const triggerSignin = createAsyncThunk(
  'sign-in',
  async (params, thunkAPI) => {
    try {
      console.log('try');
      const data = await AuthService.signin(params);
      console.log('data slice', data);
      return data;
    } catch (e) {
      console.log('catch', e.message);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerForgotPassword = createAsyncThunk(
  'forgot-password',
  async (params, thunkAPI) => {
    try {
      return await AuthService.forgotPassword(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerResetPassword = createAsyncThunk(
  'reset-password',
  async (params, thunkAPI) => {
    try {
      return await AuthService.resetPassword(params);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      localStorage.removeItem('token');
      state.isLoggedIn = false;
    },

    addSignUpFormData: (state, action) => {
      const { payload } = action;
      state.signUpFormData = {
        ...state.signUpFormData,
        ...payload,
      };
    },
    resetSignUpFormData: (state) => {
      state.signUpFormData = initialState.signUpFormData;
    },
    resetSignIn: (state) => {
      state.signin = initialState.signin;
    },
    resetSignUp: (state) => {
      state.signup = initialState.signup;
    },
  },
  extraReducers: (builder) => {
    // Sign up
    builder.addCase(triggerSignup.pending, (state) => {
      state.signup.status = states.LOADING;
      state.signup.data = {};
    });
    builder.addCase(triggerSignup.fulfilled, (state, action) => {
      state.signup.status = states.SUCCESSFUL;
      state.signup.data = action.payload;
    });
    builder.addCase(triggerSignup.rejected, (state, action) => {
      state.signup.status = states.ERROR;
      state.signup.data = {};
    });

    //   sign in
    builder.addCase(triggerSignin.pending, (state) => {
      state.signin.status = states.LOADING;
      state.signin.data = {};
    });
    builder.addCase(triggerSignin.fulfilled, (state, action) => {
      state.signin.status = states.SUCCESSFUL;
      state.signin.data = action.payload;
    });
    builder.addCase(triggerSignin.rejected, (state, action) => {
      state.signin.status = states.ERROR;
      state.signin.data = action.payload;
      console.log('rejected', action.payload);
    });

    //   forgot password
    builder.addCase(triggerForgotPassword.pending, (state) => {
      state.forgotPassword.status = states.LOADING;
      state.forgotPassword.data = {};
    });
    builder.addCase(triggerForgotPassword.fulfilled, (state, action) => {
      state.forgotPassword.status = states.SUCCESSFUL;
      state.forgotPassword.data = action.payload;
    });
    builder.addCase(triggerForgotPassword.rejected, (state) => {
      state.forgotPassword.status = states.ERROR;
      state.forgotPassword.data = {};
    });

    //   reset password
    builder.addCase(triggerResetPassword.pending, (state) => {
      state.resetPassword.status = states.LOADING;
      state.resetPassword.data = {};
    });
    builder.addCase(triggerResetPassword.fulfilled, (state, action) => {
      state.resetPassword.status = states.SUCCESSFUL;
      state.resetPassword.data = action.payload;
    });
    builder.addCase(triggerResetPassword.rejected, (state) => {
      state.resetPassword.status = states.ERROR;
      state.resetPassword.data = {};
    });
  },
});

export default authSlice.reducer;
export const {
  addSignUpFormData,
  resetSignUpFormData,
  login,
  logout,
  resetSignIn,
  resetSignUp,
} = authSlice.actions;
