import React, { useState } from "react";
import "../assets/scss/loginRegister.scss";
import LoginForm from "../components/Auth/LoginForm";
import PasswordResetForm from "../components/Auth/PasswordResetForm";

const Login = () => {
  const [formToSHow, setFormToShow] = useState(1);

  const changFormToShow = (num) => {
    setFormToShow(num);
  };
  return (
    <div className="login-register-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-12">
            {/* <form className="form-card">
              <div>
                <header>
                  <h2>Log In</h2>
                  <div>Please login to your membership account using the form below.</div>
                </header>

                <div className="input-wrapper">
                  <label htmlFor="emailInput">Email</label>
                  <input type="email" placeholder="Input your email here" id="emailInput" />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="passwordInput">Password</label>
                  <input type="password" placeholder="Input your password here" id="passwordInput" />
                </div>
                <div className="forgot-pwrd-btn">Forgot Password?</div>
              </div>

              <div className="text-center">
                <button className="primary-btn" type="submit">
                  Log in
                </button>

                <div className="mt-3 next-action-text">
                  <span>Don't have an account?</span> <span>Sign Up</span>
                </div>
              </div>
            </form> */}

            {formToSHow === 1 && <LoginForm actionForForm={changFormToShow} />}
            {formToSHow === 2 && <PasswordResetForm />}
          </div>
          <div className="col-lg-6 d-lg-block d-none">image</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
