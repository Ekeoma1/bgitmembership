import React from 'react';
import { useField } from 'formik';
import Icon from '../Icon';

const TextInput = ({ handlechange, label, ...props }) => {
  // console.log('props', props);
  const [field, meta, helpers] = useField(props);
  // console.log(field, meta, helpers);
  const handleBlur = () => {
    helpers.setTouched(true);
  };

  return (
    <div className='input-wrapper'>
      <label htmlFor={props.name}>{label}</label>
      <div className='position-relative'>
        <input
          className={meta.touched && meta.error ? 'input-error' : ''}
          {...field}
          {...props}
          onBlur={handleBlur}
          onInput={(e) => {
            if (handlechange) {
              handlechange(e.target.name, e.target.value);
            }
          }}
        />
        <div className='input-icon'>
          {meta.touched && meta.error && <Icon icon='error' />}
        </div>
      </div>
      {meta.touched && meta.error && (
        <div className='error-label'>{meta.error}</div>
      )}
    </div>
  );
};

export default TextInput;
