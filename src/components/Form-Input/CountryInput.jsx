import React from "react";
import ReactFlagsSelect from "react-flags-select";
import { Field, useField } from "formik";

const CountryInput = ({ name }) => {
  const [field, meta] = useField(name);
  return (
    <>
      <div className="input-wrapper">
        <label htmlFor={name}>Country</label>
        <Field name={name}>
          {({ form }) => (
            <ReactFlagsSelect
              searchable
              selected={field.value}
              onSelect={(code) => form.setFieldValue(field.name, code)}
              placeholder="Please select your country"
            />
          )}
        </Field>
        {meta.touched && meta.error && <div className="error-label">{meta.error}</div>}
      </div>
    </>
  );
};

export default CountryInput;
