import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  addSignUpFormData,
  resetSignUpFormData,
  triggerSignup,
} from '../../Features/signup/signup_slice';
import { useDispatch, useSelector } from 'react-redux';

const AcceptTerms = () => {
  const [agreement, setAgreement] = useState(false);
  const { signup } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setAgreement(event.target.checked);
  };
  const finalStage = () => {
    if (agreement) {
      // alert('Registration completed');

      const signupFinal = { ...signup.signUpFormData, Terms:agreement };
      console.log('sign up temp', signupFinal);
      dispatch(triggerSignup(signupFinal));
    } else {
      alert('please accept terms and condition');
    }
  };
  useEffect(() => {
    if (signup.signup.status === 'successful') {
      navigate('/login');
      dispatch(resetSignUpFormData());
    } else if (signup.signup.status === 'error') {
      alert('sign up failed');
    }
  }, [signup.signup.status]);
  console.log(signup);
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
