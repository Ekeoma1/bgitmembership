import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import {
  resetSignUp,
  resetSignUpFormData,
  triggerSignup,
} from '../../Features/auth/auth_slice';
import { renderToast } from '../Molecules/CustomToastify';
import MainButton from '../Molecules/MainButton';

const AcceptTerms = () => {
  const [agreement, setAgreement] = useState(false);
  const { auth } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setAgreement(event.target.checked);
  };
  const finalStage = () => {
    if (agreement) {
      const signupFinal = { ...auth.signUpFormData, Terms: agreement };
      dispatch(triggerSignup(signupFinal));
    } else {
      alert('please accept terms and condition');
    }
  };
  useEffect(() => {
    if (auth.signup.status === 'successful') {
      if (auth.signup.data.status === 'Success') {
        renderToast({
          status: 'success',
          message: 'Registration Successful, Please Login',
        });
        setTimeout(() => {
          navigate('/login');
        }, [3000]);
        dispatch(resetSignUpFormData());
        dispatch(resetSignUp());
      } else {
        renderToast({
          status: 'error',
          message: auth.signup.data.data,
        });
        setTimeout(() => {
          navigate('/register');
        }, [3000]);
        dispatch(resetSignUp());
      }
    } else if (auth.signup.status === 'error') {
      renderToast({
        status: 'error',
        message: auth.signup.status,
      });
    }
  }, [auth.signup.data.data, auth.signup.data.status, auth.signup.status]);

  return (
    <div className='details-wrapper'>
      <header>
        <h3>Terms & Conditions</h3>
      </header>

      <p className='terms'>
        Please review all the information you previously typed in the past
        steps, and if all is okay, submit your message to receive a project
        quote in 24 - 48 hours.Please review all the information you previously
        typed in the past steps, and if all is okay, submit your message to
        receive a project quote in 24 - 48 hours.Please review all the
        information you previously typed in the past steps, and if all is okay,
        submit your message to receive a project quote in 24 - 48 hours.
      </p>

      <div className='d-flex check-box-wrapper align-items-center gap-2'>
        <input
          onChange={handleChange}
          type='checkbox'
          name=''
          id='acceptTerms'
          checked={agreement}
        />
        <label>
          Lorem ipsum dolor sit amet <Link to='#'> Privacy Policy</Link>
        </label>
      </div>

      <div className='text-center'>
        <MainButton
          text={'Finish'}
          onClick={finalStage}
          loading={auth.signup.status === 'loading'}
        />
      </div>
    </div>
  );
};

export default AcceptTerms;
