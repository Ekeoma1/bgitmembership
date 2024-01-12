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

const AcceptTerms = ({ tabChanger, setStep1 }) => {
  const [agreement, setAgreement] = useState(false);
  const { signup, signUpFormData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setAgreement(event.target.checked);
  };
  const finalStage = () => {
    if (agreement) {
      const signupFinal = { ...signUpFormData, Terms: agreement };
      dispatch(triggerSignup(signupFinal));
    } else {
      alert('please accept terms and condition');
    }
  };
  useEffect(() => {
    if (signup.status === 'successful') {
      renderToast({
        status: 'success',
        message: signup.data?.message,
      });
      setTimeout(() => {
        navigate('/login');
      }, [3000]);
      dispatch(resetSignUpFormData());
      dispatch(resetSignUp());
    } else if (signup.status === 'error') {
      renderToast({
        status: 'error',
        message: signup.data,
      });
      setTimeout(() => {
       setStep1(false)
      }, [3000]);
      dispatch(resetSignUp());
    }
  }, [signup.data?.data, signup.data?.status, signup.status]);

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
          loading={signup.status === 'loading'}
        />
      </div>
    </div>
  );
};

export default AcceptTerms;
