import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TextInput from '../Form-Input/TextInput';
import { Formik, Form } from 'formik';
import PasswordInput from '../Form-Input/PasswordInput';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

// loadinf effect neeeds to be added to the button

const PasswordResetForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(null);
  const [step, setStep] = useState(1);

  const handleSubmit = (values) => {
    // Handle form submission here
    if (values.email !== '') {
      setEmail(values.email);
      setStep(2);
      console.log('values', values);

      // console.log('email', email);
      dispatch();
    }

    if (values.code !== '') {
      setStep(3);
      console.log(values);
    }

    if (values.newPassword !== '' && values.confirmNewPasssword !== '') {
      setStep(4);
      console.log(values);
    }
  };

  // const validationSchema = Yup.object().shape({
  //   email: Yup.string().email("Invalid email address").required("Required"),
  //   code: Yup.string()
  //     .required()
  //     .matches(/^[0-9]+$/, "Must be only digits")
  //     .min(6, "Must be exactly 6 digits")
  //     .max(6, "Must be exactly 6 digits"),
  //   newPassword: Yup.string()
  //     .required("Required")
  //     .matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]).*$/, "Must contain at least one number, one uppercase letter, and one special character"),
  //   confirmNewPassword: Yup.string()
  //     .required()
  //     .oneOf([Yup.ref("newPassword")], "passwords must match"),
  // });

  const emailValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required'),
  });

  const codeValidationSchema = Yup.object().shape({
    code: Yup.string()
      .required()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(6, 'Must be exactly 6 digits')
      .max(6, 'Must be exactly 6 digits'),
  });

  const passwordValidationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required('Required')
      .matches(
        /^(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]).*$/,
        'Must contain at least one number, one uppercase letter, and one special character'
      ),
    confirmNewPassword: Yup.string()
      .required()
      .oneOf([Yup.ref('newPassword')], 'passwords must match'),
  });

  return (
    <Formik
      initialValues={{
        email: '',
        code: '',
        newPassword: '',
        confirmNewPassword: '',
      }}
      validationSchema={
        step === 1
          ? emailValidationSchema
          : step === 2
          ? codeValidationSchema
          : passwordValidationSchema
      }
      onSubmit={handleSubmit}
    >
      <>
        {step === 1 && <Email />}
        {step === 2 && <Code email={email} />}
        {step === 3 && <NewPassword />}
        {step === 4 && <ProceedToLogin />}
      </>
    </Formik>
  );
};

export default PasswordResetForm;

const Email = () => {
  return (
    <Form className='form-card mx-lg-0 mx-auto'>
      <div>
        <header>
          <h2>Password Reset</h2>
          <div>Please fill your email below to reset your password.</div>
        </header>

        <TextInput
          name='email'
          label='Email'
          type='email'
          placeholder='Input your email here'
        />
      </div>

      <div className='text-center'>
        <button
          className='primary-btn'
          type='submit'
          // onClick={() => {
          //   console.log('email', email);
          //   dispatch();
          // }}
        >
          Send Code
        </button>

        <div className='mt-3 next-action-text'>
          <span>Don't have an account?</span>{' '}
          <span>
            {' '}
            <Link to='/register'>Sign Up</Link>
          </span>
        </div>
      </div>
    </Form>
  );
};

const Code = ({ email }) => {
  const [isActive, setIsActive] = useState(true);
  const handleButtonClick = () => {
    // Disable the button on click and start the timer
    if (isActive) {
      console.log('clicked');
      setIsActive(false);
      startTimer();
    }
  };

  const startTimer = () => {
    // Set a timer for 2 minutes (120,000 milliseconds)
    const timerDuration = 120000;

    // After 2 minutes, re-enable the button
    setTimeout(() => setIsActive(true), timerDuration);
  };

  useEffect(() => {
    // Clean up the timer in case the component unmounts before the timer completes
    return () => clearTimeout(startTimer);
  }, []);

  return (
    <Form className='form-card mx-lg-0 mx-auto'>
      <div>
        <header>
          <h2>Password Reset</h2>
          <div>Please enter the code sent to {email}</div>
        </header>

        <TextInput
          name='code'
          label='Enter Code'
          type='number'
          placeholder='Input the code sent to your email'
        />
      </div>

      <div className='text-center'>
        <div
          onClick={handleButtonClick}
          disabled={!isActive}
          className='other-action-btn mb-3'
        >
          {isActive ? 'Resend Code' : 'Please wait...'}
        </div>
        <button className='primary-btn' type='submit'>
          continue
        </button>

        <div className='mt-3 next-action-text'>
          <span>Don't have an account?</span>{' '}
          <span>
            {' '}
            <Link to='/register'>Sign Up</Link>
          </span>
        </div>
      </div>
    </Form>
  );
};

const NewPassword = () => {
  return (
    <Form className='form-card mx-lg-0 mx-auto'>
      <div>
        <header>
          <h2>Password Reset</h2>
          <div>Please enter your new password.</div>
        </header>

        <PasswordInput
          name='newPassword'
          label='New Password'
          placeholder='Input your new password'
        />
        <PasswordInput
          name='confirmNewPassword'
          label='Re-enter New Password'
          placeholder='Input your new password'
        />
      </div>

      <div className='text-center'>
        <button className='primary-btn' type='submit'>
          continue
        </button>

        <div className='mt-3 next-action-text'>
          <span>Don't have an account?</span>{' '}
          <span>
            {' '}
            <Link to='/register'>Sign Up</Link>
          </span>
        </div>
      </div>
    </Form>
  );
};

const ProceedToLogin = () => {
  return (
    <div className='form-card mx-lg-0 mx-auto'>
      <header>
        <h2>Password Reset</h2>
        <div>
          Your password has been reset successfully , please proceed to login.
        </div>
      </header>
      <div className='text-center'>
        <Link to='/login' className='primary-btn' type='submit'>
          continue
        </Link>
      </div>
    </div>
  );
};
