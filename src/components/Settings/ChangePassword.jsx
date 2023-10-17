import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import PasswordInput from "../Form-Input/PasswordInput";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetChangePassword, triggerChangePassword } from "../../Features/users/users_slice";
import MainButton from "../Molecules/MainButton";
import { renderToast } from "../Molecules/CustomToastify";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { changePassword } = useSelector((state) => state.users);
  const [formData, setFormData] = useState({});
  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Required"),
    newPassword: Yup.string()
      .required("Required")
      .matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]).*$/, "Must contain at least one number, one uppercase letter, and one special character"),
    confirmNewPassword: Yup.string()
      .required("Required")
      .matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]).*$/, "Must contain at least one number, one uppercase letter, and one special character")
      .oneOf([Yup.ref("newPassword")], "Passwords do not match"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const objEntries = Object.entries(values);
    let valuesTemp = objEntries.filter((value) => value[0] === "currentPassword" || value[0] === "newPassword");
    valuesTemp = Object.fromEntries(valuesTemp);
    dispatch(triggerChangePassword(valuesTemp));
    setTimeout(() => {
      resetForm(); // Reset the form to its initial state
    }, 2000);
  };
  useEffect(() => {
    if (changePassword.status === "successful") {
      renderToast({
        status: "success",
        message: changePassword.data,
      });
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      dispatch(resetChangePassword());
    }
  }, [changePassword.data, changePassword.status]);
  useEffect(() => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  }, []);

  return (
    <div className="settings-card shadow">
      <div className="header">Change Your Password</div>
      {Object.keys(formData).length > 0 && (
        <Formik
          initialValues={{
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
            confirmNewPassword: formData.confirmNewPassword,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
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
              {/* <button className='primary-btn small-btn' type='submit'>
              Save
            </button> */}
              <MainButton text={"Save"} size={"small"} loading={changePassword.status === "loading"} />
            </div>
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default ChangePassword;
