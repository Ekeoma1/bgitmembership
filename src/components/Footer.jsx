import React from "react";
import "../assets/scss/navFooter.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="d-flex justify-content-between">
          <div className="name">Black Girls in Tech</div>
          <Link to="#">About BGIT</Link>
          <Link to="#">Events & News</Link>
          <Link to="#">Disclaimer</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
