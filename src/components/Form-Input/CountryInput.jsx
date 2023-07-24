import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
// import "react-flags-select/css/react-flags-select.css";
import { Field, useField } from "formik";

const CountryInput = ({ form, name }) => {
  const [field, meta] = useField(name);
  return (
    <>
      <div className="input-wrapper">
        <label htmlFor={name}>Country</label>
        <Field name={name}>
          {({ form }) => (
            //   <PhoneInput
            //     className={meta.touched && meta.error && "input-error"}
            //     {...field}
            //     defaultCountry="US" // Set the default country code if needed
            //     onChange={(value) => form.setFieldValue(name, value)}
            //   />
            <ReactFlagsSelect
              //   selected={selected} onSelect={(code) => setSelected(code)}
              searchable
              selected={field.value}
              onSelect={(code) => form.setFieldValue(field.name, code)}
              placeholder="Please select your country"
            />
          )}
          {/* <div className="input-icon">{meta.touched && meta.error && <Icon icon="error" />}</div> */}
        </Field>
        {meta.touched && meta.error && <div className="error-label">{meta.error}</div>}
      </div>

      {/* <div className="input-wrapper">
      <label htmlFor={props.name}>{label}</label>
      <ReactFlagsSelect
        //   selected={selected} onSelect={(code) => setSelected(code)}
        searchable
        selected={field.value}
        onSelect={(code) => form.setFieldValue(field.name, code)}
        placeholder="Please select your country"
      />
    </div> */}
    </>
  );
};

export default CountryInput;
