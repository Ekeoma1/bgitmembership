import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import PasswordInput from '../Form-Input/PasswordInput';
import TextInput from '../Form-Input/TextInput';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Features/authSlice';
import { triggerSignin } from '../../Features/signin/signin_slice';
import {
  addSignUpFormData,
  triggerSignup,
} from '../../Features/signup/signup_slice';

// this component is used for both signup and login

const LoginForm = ({ forLogin, regFirstStep }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signin } = useSelector((state) => state);
  const handleSubmit = (values) => {
    // Handle form submission here
    if (forLogin) {
      // dispatch(login());
      dispatch(triggerSignin(values));
    } else {
      dispatch(addSignUpFormData(values));
      regFirstStep(true);
    }
  };

  const validationSchema = Yup.object().shape({
    Email: Yup.string().email('Invalid email address').required('Required'),
    Password: Yup.string()
      .required('Required')
      .matches(
        /^(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]).*$/,
        'Must contain at least one number, one uppercase letter, and one special character'
      ),
  });

  useEffect(() => {
    if (signin.signin.status === 'successful') {
      // if the axios request was successful and token was sent
      if (signin.signin.data?.token) {
        dispatch(login());
      }
    }
  }, [signin.signin.status]);
  return (
    <Formik
      initialValues={{
        Email: '',
        Password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className='form-card mx-lg-0 mx-auto'>
        <div>
          <header>
            {forLogin ? (
              <>
                <h2>Log In</h2>
                <div>
                  Please login to your membership account using the form below.
                </div>
              </>
            ) : (
              <>
                <h2>Sign up</h2>
                <div>
                  Create an account today to begin your free membership!
                </div>
              </>
            )}
          </header>

          <TextInput
            name='Email'
            label='Email'
            type='email'
            placeholder='Input your email here'
          />
          <PasswordInput
            name='Password'
            label='Password'
            placeholder='Input your password here'
          />

          {forLogin && (
            <Link to='/forgot-password' className='other-action-btn mt-3'>
              Forgot Password?
            </Link>
          )}
        </div>

        <div className='text-center'>
          <button className='primary-btn' type='submit'>
            {forLogin ? 'Log in' : 'Sign up'}
          </button>

          <div className='mt-3 next-action-text'>
            {forLogin ? (
              <>
                <span>Don't have an account?</span>{' '}
                <span>
                  <Link to='/register'>Sign Up</Link>
                </span>
              </>
            ) : (
              <>
                <span>Already have an account?</span>{' '}
                <span>
                  <Link to='/login'>Log in</Link>
                </span>
              </>
            )}
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default LoginForm;
