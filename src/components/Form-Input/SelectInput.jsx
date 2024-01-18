import React, { useState } from 'react';
import { useField, useFormikContext } from 'formik';

const SelectInput = ({ name, ...props }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const [options] = useState([
    {
      id: 1,
      value: 'uiDesign',
      label: 'UI Design',
    },
    {
      id: 2,
      value: 'uxResearch',
      label: 'UX Research',
    },
    {
      id: 3,
      value: 'frontendDev',
      label: 'Frontend Development',
    },
  ]);
  // when api is ready this activated
  // useEffect(() => {
  //   // Fetch options from API
  //   axios
  //     .get("https://api.example.com/greetings")
  //     .then((response) => {
  //       setOptions(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching options:", error);
  //     });
  // }, []);

  const handleChange = (event) => {
    if (event.target.value !== 'select-option') {
      const selectedValue = Number(event.target.value);
      setFieldValue(name, selectedValue);
    }
  };

  return (
    <div className='input-wrapper'>
      <label htmlFor={name}>{props.label}</label>
      <select
        className={meta.touched && meta.error && 'input-error'}
        id={name}
        name={name}
        {...field}
        {...props}
        onChange={handleChange}
      >
        <option value='select-option'>Select an option</option>
        {options.map((option) => (
          <option key={option.id} value={Number(option.id)}>
            {option.label}
          </option>
        ))}
      </select>
      {meta.touched && meta.error && (
        <div className='error-label'>{meta.error}</div>
      )}
    </div>
  );
};

export default SelectInput;
