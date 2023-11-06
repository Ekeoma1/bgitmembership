import React from 'react';

const TextInput2 = ({ label, ...props }) => {
  return (
    <div className='input-wrapper'>
      <label htmlFor={props.name}>{label}</label>
      <div
        className='position-relative'
        style={{ height: '100%', width: '100%' }}
      >
        <input
          style={{ height: '100%', width: '100%' }}
          name={props.name}
          onChange={props.onChange}
          value={props.value}
        />
      </div>
    </div>
  );
};

export default TextInput2;
