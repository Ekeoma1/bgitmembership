import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSignUpFormData } from '../../Features/auth/auth_slice';

const descriptionData = [
  {
    id: 1,
    text: 'Student',
  },

  {
    id: 2,
    text: 'Entry Level',
  },

  {
    id: 3,
    text: 'Mid Level',
  },

  {
    id: 4,
    text: 'Senior Level',
  },

  {
    id: 5,
    text: 'Lead Level',
  },

  {
    id: 6,
    text: 'Exec Level',
  },
];

const ExperienceLevel = ({ tabChanger, currentTab }) => {
  const dispatch = useDispatch();
  const [level, setLevel] = useState(0);
  const [errorMesssage, setErrorMessage] = useState('');

  const nextStep = () => {
    if (level != 0) {
      tabChanger(currentTab + 1);
    } else {
      setErrorMessage('Please select an option');
    }
  };

  const selectOption = (id) => {
    setLevel(id);
    errorMesssage != '' && setErrorMessage('');
  };
  const handleSubmit = () => {
    if (
      selectedOption !== null &&
      selectedOption !== undefined &&
      Object.keys(selectedOption).length !== 0
    ) {
      nextStep();
      const values = {
        Experience: selectedOption.id,
      };
      dispatch(addSignUpFormData(values));
      tabChanger(currentTab + 1);
    } else {
      alert('please select an option');
    }
  };
  const [selectedOption, setSelectedOption] = useState({});
  useEffect(() => {
    setSelectedOption(descriptionData.find((item) => item.id === level));
  }, [level]);
  return (
    <div className='details-wrapper'>
      <header>
        <h3>What’s your experience level ?</h3>
        <p>Please select what best describes you.</p>
      </header>

      <div className='radio-wrapper row flex-wrap'>
        {descriptionData.map((data) => {
          return (
            <div key={data.id} className='col-md-4 col'>
              <div onClick={() => selectOption(data.id)} className='radio-box'>
                <div
                  className={`radio-out-circle ${
                    level === data.id && 'active'
                  }`}
                >
                  <div className='radio-in-circle'></div>
                </div>

                <div className='radio-text'>{data.text}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className='text-center text-danger'>{errorMesssage}</div>

      <div className='text-center my-5'>
        <button onClick={handleSubmit} className='primary-btn' type='submit'>
          Next
        </button>
      </div>
    </div>
  );
};

export default ExperienceLevel;
