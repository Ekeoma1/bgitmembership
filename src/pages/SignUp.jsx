import { useState, useEffect } from 'react';
import LoginImage from '../assets/images/login-image.png';
import '../assets/scss/loginRegister.scss';
import LoginForm from '../components/Auth/LoginForm';
import CompleteRegistration from './CompleteRegistration';
const SignUp = () => {
  const [step1, setStep1] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='login-register-wrapper'>
      <div className='container'>
        {!step1 ? (
          <div className='row'>
            <div className='col-lg-6 col-12 '>
              {/* we need to talk about the registration process, i believe it is too much */}
              <LoginForm regFirstStep={setStep1} forLogin={false} />
            </div>
            <div className='col-lg-6 d-lg-block d-none'>
              <div
                style={{ backgroundImage: `url(${LoginImage})` }}
                className='img-house'
              ></div>
            </div>
          </div>
        ) : (
          <CompleteRegistration setStep1={setStep1} />
        )}
      </div>
    </div>
  );
};

export default SignUp;
