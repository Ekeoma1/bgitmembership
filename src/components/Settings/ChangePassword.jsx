import React from "react";
import { Formik, Form } from "formik";
import PasswordInput from "../Form-Input/PasswordInput";
import { Link } from "react-router-dom";

const ChangePassword = () => {
  return (
    <div className="settings-card shadow">
      <div className="header">Change Your Password</div>

      <Formik
        initialValues={{
          password: "",
          newPassword: "",
          confirmNewPassword: "",
        }}
        //   validationSchema and onsubmit next
      >
        <Form>
          <div>
            <PasswordInput label="Current Password *" name="currentPassword" />
            <Link className="link" to="/forgot-password">
              Forgot Password?
            </Link>
          </div>
          <PasswordInput label="New Password *" name="newPassword" />

          <PasswordInput label="Confirm New Password *" name="confirmNewPassword" />

          <div className="note mt-2">
            <span>Note:</span> Changing your password will log you out of all active BGIT Membership Portal on connected devices
          </div>

          <div className="mt-3 text-end">
            <button className="primary-btn small-btn">save</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ChangePassword;
