import React from "react";
import "../assets/scss/navFooter.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row text-lg-start text-center gap-lg-0 gap-3">
          <div className="col-lg-3 name">Black Girls in Tech &copy; 2023</div>
          <div className="col-lg">
            <Link to="#">About</Link>
          </div>
          <div className="col-lg">
            <Link to="#">Ts & Cs</Link>
          </div>
          <div className="col-lg">
            <Link to="#">Privacy Policy</Link>
          </div>
          <div className="col-lg">
            <Link to="#">Cookie Policy</Link>
          </div>
          <div className="col-lg">
            <Link to="#">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
