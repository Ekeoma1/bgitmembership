import { useState } from "react";
import Icon from "../Icon";
import { useField } from "formik";

const PasswordInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleBlur = () => {
    helpers.setTouched(true);
  };
  return (
    // the input wrapper would be styled in each scss assigned to that component
    <div className="input-wrapper">
      <label htmlFor={props.name}>{label}</label>
      <div className="position-relative">
        <input
          className={meta.touched && meta.error ? "input-error" : " "}
          {...field}
          {...props}
          type={`${showPassword ? "text" : "password"}`}
          onBlur={handleBlur}
        />
        <div className="input-icon">
          <div className="show-password-btn" onClick={toggleShowPassword}>
            <Icon icon={`${!showPassword ? "eyeOpened" : "eyeClosed"}`} />
          </div>
          {meta.touched && meta.error && <Icon icon="error" />}
        </div>
      </div>
      {meta.touched && meta.error && <div className="error-label">{meta.error}</div>}
    </div>
  );
};

export default PasswordInput;
