import React from "react";

const LoginForm = ({ actionForForm }) => {
  return (
    <form className="form-card">
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
        <div onClick={() => actionForForm(2)} className="other-action-btn mt-3">
          Forgot Password?
        </div>
      </div>

      <div className="text-center">
        <button className="primary-btn" type="submit">
          Log in
        </button>

        <div className="mt-3 next-action-text">
          <span>Don't have an account?</span> <span>Sign Up</span>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
