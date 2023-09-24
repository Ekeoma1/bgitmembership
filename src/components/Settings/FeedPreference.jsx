import { useEffect, useState } from 'react';
import RadioGroup from '../Form-Input/RadioGroup';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetUpdateFeedPreference,
  triggerUpdateFeedPreference,
} from '../../Features/users/users_slice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainButton from '../Molecules/MainButton';
const FeedPreference = () => {
  const dispatch = useDispatch();
  const { updateFeedPreference } = useSelector((state) => state.users);
  const [selectedValue, setSelectedValue] = useState(0);

  const handleRadioChange = (newValue) => {
    setSelectedValue(newValue);
  };

  const handleSubmit = () => {
    const values = { FeedPreference: selectedValue };
    dispatch(triggerUpdateFeedPreference(values));
  };
  const notify = (toastText) => toast(toastText);
  useEffect(() => {
    if (updateFeedPreference.status === 'successful') {
      if (updateFeedPreference.data.user.feedPreference === 0) {
        notify('Preference set to most relevant posts');
      } else if (updateFeedPreference.data.user.feedPreference === 1) {
        notify('Preference set to most recent posts');
      }
      dispatch(resetUpdateFeedPreference());
    }
  }, [updateFeedPreference.status]);
  return (
    <div className='settings-card shadow'>
      <div className='header'>Feed Preference</div>

      <div className='mt-3 feed-details'>
        <p>
          Take control of your feed and choose what type of content you’d like
          to see
        </p>

        <p>Select Preferred feed view</p>

        <RadioGroup
          selectedValue={selectedValue}
          onRadioChange={handleRadioChange}
          firstValue='Most relevant posts (interests)'
          secondValue='Most recent posts'
        />

        <div
          className='mt-3 text-end'
        >
          {/* <button
            onClick={handleSubmit}
            type='submit'
            className='primary-btn small-btn'
          >
            save
          </button> */}
          <MainButton
            text={'Save'}
            size={'small'}
            onClick={handleSubmit}
            width={'17.5rem'}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default FeedPreference;
