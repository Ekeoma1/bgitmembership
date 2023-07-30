import React from "react";
import LoginImage from "../assets/images/login-image.png";
import "../assets/scss/loginRegister.scss";
import PasswordResetForm from "../components/Auth/PasswordResetForm";

const ForgotPassword = () => {
  return (
    <div className="login-register-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-12 ">
            <PasswordResetForm />
          </div>
          <div className="col-lg-6 d-lg-block d-none">
            <div style={{ backgroundImage: `url(${LoginImage})` }} className="img-house"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
