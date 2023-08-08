import React, { useState } from "react";
import { Link } from "react-router-dom";

const AcceptTerms = () => {
  const [agreement, setAgreement] = useState(false);

  const handleChange = (event) => {
    setAgreement(event.target.checked);
  };
  const finalStage = () => {
    agreement ? alert("completed") : alert("terms and condition");
  };

  return (
    <div className="details-wrapper">
      <header>
        <h3>Terms & Conditions</h3>
      </header>

      <p className="terms">
        Please review all the information you previously typed in the past steps, and if all is okay, submit your message to receive a project quote
        in 24 - 48 hours.Please review all the information you previously typed in the past steps, and if all is okay, submit your message to receive
        a project quote in 24 - 48 hours.Please review all the information you previously typed in the past steps, and if all is okay, submit your
        message to receive a project quote in 24 - 48 hours.
      </p>

      <div className="d-flex check-box-wrapper align-items-center gap-2">
        <input onChange={handleChange} type="checkbox" name="" id="acceptTerms" />
        <label>
          Lorem ipsum dolor sit amet <Link to="#"> Privacy Policy</Link>
        </label>
      </div>

      <div className="text-center">
        <button onClick={finalStage} className="primary-btn" type="submit">
          Continue
        </button>
      </div>
    </div>
  );
};

export default AcceptTerms;
