import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSignUpFormData } from '../../Features/auth/auth_slice';

const descriptionData = [
  {
    id: 1,
    text: 'I want to be mentored',
  },

  {
    id: 2,
    text: 'I want to Network',
  },

  {
    id: 3,
    text: 'I want to upskill',
  },

  {
    id: 4,
    text: 'I want to get into tech',
  },

  {
    id: 5,
    text: 'I want to attend events',
  },

  {
    id: 6,
    text: 'I want to mentor others',
  },
];

const DescriptionSection = ({ tabChanger, currentTab }) => {
  const dispatch = useDispatch();
  const [desc, setDesc] = useState(0);
  const [errorMesssage, setErrorMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState({});
  const nextStep = () => {
    if (desc !== 0) {
      tabChanger(currentTab + 1);
    } else {
      setErrorMessage('Please select an option');
    }
  };

  const selectOption = (id) => {
    setDesc(id);
    errorMesssage !== '' && setErrorMessage('');
  };
  const handleSubmit = () => {
    if (
      selectedOption !== null &&
      selectedOption !== undefined &&
      Object.keys(selectedOption).length !== 0
    ) {
      nextStep();
      const values = {
        Purpose: selectedOption.id,
      };
      dispatch(addSignUpFormData(values));
      tabChanger(currentTab + 1);
    } else {
      alert('please select an option');
    }
  };

  useEffect(() => {
    setSelectedOption(descriptionData.find((item) => item.id === desc));
  }, [desc]);
  return (
    <div className='details-wrapper'>
      <header>
        <h3>What best describes you?</h3>
        <p>Please select what best describes you.</p>
      </header>

      <div className='radio-wrapper row flex-wrap'>
        {descriptionData.map((data) => {
          return (
            <div key={data.id} className='col-md-4'>
              <div
                onClick={() => selectOption(data.id)}
                className='radio-box mx-md-0 mx-auto'
              >
                <div
                  className={`radio-out-circle ${desc === data.id && 'active'}`}
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

export default DescriptionSection;
