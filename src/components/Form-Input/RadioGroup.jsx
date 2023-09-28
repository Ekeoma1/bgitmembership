import React from 'react';

const RadioGroup = ({
  selectedValue,
  onRadioChange,
  initialValue,
  firstValue,
  secondValue,
  radioGroup,
}) => {
  //   const [selectedOption, setSelectedOption] = useState(initialValue);

  const handleRadioChange = (event) => {
    const newValue = event.target.value; // Convert string to boolean
    onRadioChange(Number(newValue));
  };

  //   const handleSubmit = (event) => {
  //     event.preventDefault();

  //     // Now you can send the selectedOption to the server
  //     console.log("Submitting selected option:", selectedOption);

  //     // You can add your API call or other logic here to send the data to the server
  //   };

  //   useEffect(() => {
  //     setSelectedOption(initialValue);
  //   }, [initialValue]);

  return (
    <form className='radio-group'>
      <div className='d-flex align-items-center gap-2 mb-3'>
        <input
          type='radio'
          name={radioGroup}
          value='0'
          checked={selectedValue ===0}
          onChange={handleRadioChange}
        />
        <label htmlFor='true'>{firstValue}</label>
      </div>
      <div className='d-flex align-items-center gap-2'>
        <input
          type='radio'
          name={radioGroup}
          value='1'
          checked={selectedValue === 1}
          onChange={handleRadioChange}
        />
        <label htmlFor='false'>{secondValue}</label>
      </div>
    </form>
  );
};

export default RadioGroup;
