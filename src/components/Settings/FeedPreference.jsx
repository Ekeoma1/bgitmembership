import { useEffect, useState } from 'react';
import RadioGroup from '../Form-Input/RadioGroup';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetUpdateFeedPreference,
  triggerUpdateFeedPreference,
} from '../../Features/users/users_slice';
import MainButton from '../Molecules/MainButton';
import { renderToast } from '../Molecules/CustomToastify';
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
  useEffect(() => {
    if (updateFeedPreference.status === 'successful') {
      if (updateFeedPreference.data.user.feedPreference === 0) {
        renderToast({
          status: 'success',
          message: 'Preference set to most relevant posts',
        });
      } else if (updateFeedPreference.data.user.feedPreference === 1) {
        renderToast({
          status: 'success',
          message: 'Preference set to most recent posts',
        });
      }
      dispatch(resetUpdateFeedPreference());
    }
  }, [
    updateFeedPreference.data.user?.feedPreference,
    updateFeedPreference.status,
  ]);
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

        <div className='mt-3 text-end'>
          <MainButton
            text={'Save'}
            size={'small'}
            onClick={handleSubmit}
            loading={updateFeedPreference.status==='loading'}
          />
        </div>
      </div>
    </div>
  );
};

export default FeedPreference;
