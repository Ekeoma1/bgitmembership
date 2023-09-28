import React from "react";
import { Field, useField } from "formik";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const PhoneInputField = ({ name }) => {
  const [field, meta] = useField(name);

  return (
    <div className="input-wrapper">
      <label htmlFor={name}>Phone Number</label>
      <Field name={name}>
        {({ form }) => (
          <PhoneInput
            className={meta.touched && meta.error && "input-error"}
            {...field}
            defaultCountry="US" // Set the default country code if needed
            onChange={(value) => form.setFieldValue(name, value)}
          />
        )}
        {/* <div className="input-icon">{meta.touched && meta.error && <Icon icon="error" />}</div> */}
      </Field>
      {meta.touched && meta.error && <div className="error-label">{meta.error}</div>}
    </div>
  );
};

export default PhoneInputField;
