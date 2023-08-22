import React from "react";
import { useField } from "formik";
import Select from "react-select";

const MultiSelectInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);

  //   const handleChange = (selectedOptions) => {
  //     field.onChange(name)(selectedOptions);
  //   };

  const handleBlur = () => {
    // field.onBlur(name, true);
    helpers.setTouched(true);
  };
  return (
    <div className="input-wrapper">
      <label htmlFor={props.name}>{label}</label>
      <Select isMulti {...props} {...field} onBlur={handleBlur} />
      {meta.touched && meta.error && <div>{meta.error}</div>}
    </div>
  );
};

export default MultiSelectInput;
