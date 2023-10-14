import { useEffect } from "react";
import "../assets/scss/loginRegister.scss";
import LoginForm from "../components/Auth/LoginForm";
import LoginImage from "../assets/images/login-image.png";

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="login-register-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-12 ">
            <LoginForm forLogin={true} />
          </div>
          <div className="col-lg-6 d-lg-block d-none">
            <div style={{ backgroundImage: `url(${LoginImage})` }} className="img-house"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
