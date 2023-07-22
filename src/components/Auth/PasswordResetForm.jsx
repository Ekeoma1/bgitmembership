import React, { useState } from "react";

const PasswordResetForm = () => {
  const [codeSent, setCodeSent] = useState(false);
  const [codeConfirmed, setCodeConfirmed] = useState(false);
  const [email, setEmail] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (codeConfirmed && codeSent) {
      alert("Updating new password");
    } else if (codeSent && !codeConfirmed) {
      alert("Confirming code");
      setCodeConfirmed(true);
    } else {
      alert("Sending code");
      setCodeSent(true);
    }
  };

  const renderContent = () => {
    if (codeConfirmed && codeSent) {
      return (
        <>
          {/* Enter new password */}
          <div className="input-wrapper">
            <label>New Password</label>
            <input type="password" />
          </div>
          <div className="input-wrapper">
            <label>Re-enter New Password</label>
            <input type="password" />
          </div>
        </>
      );
    } else if (codeSent && !codeConfirmed) {
      return (
        <div className="input-wrapper">
          <label>Enter Code</label>
          <input type="number" placeholder="Input the code sent" />
        </div>
      );
    } else {
      return (
        <div className="input-wrapper">
          <label htmlFor="emailInput">Email</label>
          <input
            // value={email} onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Input your email here"
            id="emailInput"
          />
        </div>
      );
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="form-card">
      <div>
        <header>
          <h2>Password Reset</h2>
          {codeSent ? <div>Please enter the code sent to b*******@gmail.com</div> : <div>Please fill your email below to reset your password.</div>}
        </header>
        {renderContent()}
      </div>
      <div className="text-center">
        {codeSent && !codeConfirmed && <div className="other-action-btn mb-3">Resend Code</div>}
        <button className="primary-btn" type="submit">
          {codeSent ? "Continue" : "Send Code"}
        </button>
        <div className="mt-3 next-action-text">
          <span>Don't have an account?</span> <span>Sign Up</span>
        </div>
      </div>
    </form>
  );
};

export default PasswordResetForm;
