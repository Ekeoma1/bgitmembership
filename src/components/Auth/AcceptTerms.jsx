import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import {
  resetSignUpFormData,
  triggerSignup,
} from '../../Features/auth/auth_slice';

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
      console.log('sign up successful,show alert here');
      navigate('/login');
      dispatch(resetSignUpFormData());
    } else if (auth.signup.status === 'error') {
      console.log('sign up failed,show alert here');
    }
  }, [auth.signup.status]);
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
        <button onClick={finalStage} className='primary-btn' type='submit'>
          Continue
        </button>
      </div>
    </div>
  );
};

export default AcceptTerms;
