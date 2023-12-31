import { useEffect, useState } from 'react';
import RadioGroup from '../Form-Input/RadioGroup';
import Icon from '../Icon';
import BlockedUser from './BlockedUser';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetUpdatePrivacySettings,
  triggerGetPrivacySettings,
  triggerUpdatePrivacySettings,
} from '../../Features/users/users_slice';
import MainButton from '../Molecules/MainButton';
import { renderToast } from '../Molecules/CustomToastify';

const PrivacyOption = ({ title, selectedValue, onRadioChange }) => {
  return (
    <div className='mb-3'>
      <p>{title}</p>
      <RadioGroup
        selectedValue={selectedValue}
        onRadioChange={onRadioChange}
        firstValue='Everyone'
        secondValue='Connections only'
      />
    </div>
  );
};

const Privacy = () => {
  const dispatch = useDispatch();
  const { getPrivacySettings, updatePrivacySettings } = useSelector(
    (state) => state.users
  );
  const [showBlocked, setShowBlocked] = useState(false);
  const [save, setSave] = useState(false);
  const [privacySettings, setPrivacySettings] = useState([
    {
      tag: 'isProfileVisible',
      title: 'Manage who can see your Profile',
      selectedValue: 0,
    },
    {
      tag: 'isPostVisible',
      title: 'Manage who can see your Posts',
      selectedValue: 0,
    },
    {
      tag: 'isInterestVisible',
      title: 'Manage who can see your Interests and Tags',
      selectedValue: 1,
    },
    {
      tag: 'isLocationVisible',
      title: 'Manage who can see your Location',
      selectedValue: 0,
    },
    {
      tag: 'isMembersFollowedVisible',
      title: 'Manage who can see members you follow',
      selectedValue: 1,
    },
  ]);

  const handleRadioChange = (index, newValue) => {
    const updatedSettings = [...privacySettings];
    updatedSettings[index].selectedValue = newValue;
    setPrivacySettings(updatedSettings);
  };

  const handleSubmit = () => {
    if (save) {
      const privacySettingsTemp = [...privacySettings];
      console.log(privacySettingsTemp);
      const values = {
        isInterestVisible: 0,
        isPostVisible: 0,
        isLocationVisible: 0,
        isMembersFollowedVisible: 0,
        isProfileVisible: 0,
      };
      privacySettingsTemp.forEach((item) => {
        values[item.tag] = item.selectedValue;
      });
      dispatch(triggerUpdatePrivacySettings(values));
    }
  };
  useEffect(() => {
    if (updatePrivacySettings.status === 'successful') {
      renderToast({
        status: 'success',
        message: 'Privacy settings successfully updated',
      });
      dispatch(resetUpdatePrivacySettings());
      dispatch(triggerGetPrivacySettings());
    }
  }, [updatePrivacySettings.status]);

  useEffect(() => {
    if (getPrivacySettings.status === 'successful') {
      const getPrivacySettingsTemp = { ...getPrivacySettings.data };
      const array = privacySettings.map((item) => {
        const x = getPrivacySettingsTemp[item.tag];
        const y = { ...item, selectedValue: x };
        return y;
      });
      setPrivacySettings(array);
    }
  }, [getPrivacySettings]);

  useEffect(() => {
    if (getPrivacySettings.status === 'successful') {
      const getPrivacySettingsTemp = { ...getPrivacySettings.data };
      const array = privacySettings.map((item) => {
        const x = getPrivacySettingsTemp[item.tag];
        const y = { ...item, selectedValue: x };
        return y;
      });
      const privacySettingsTemp = [...privacySettings];

      function arraysDiffer(arr1, arr2) {
        for (let i = 0; i < arr1.length; i++) {
          if (arr1[i].selectedValue !== arr2[i].selectedValue) {
            return true;
          }
        }
        return false;
      }
      const userUpdatedThePrivacySettings = arraysDiffer(
        array,
        privacySettingsTemp
      );
      if (userUpdatedThePrivacySettings) {
        setSave(true);
      } else {
        setSave(false);
      }
    }
  }, [privacySettings, getPrivacySettings]);

  useEffect(() => {
    dispatch(triggerGetPrivacySettings());
  }, []);

  return (
    <div className='settings-card shadow'>
      <div className='header mb-3'>Privacy Settings</div>

      {privacySettings.map((setting, index) => (
        <PrivacyOption
          key={index}
          title={setting?.title}
          selectedValue={setting?.selectedValue}
          onRadioChange={(newValue) => handleRadioChange(index, newValue)}
          firstValue={setting?.firstValue}
          secondValue={setting?.secondValue}
        />
      ))}
      <div className='text-end'>
        <MainButton
          text={'Save'}
          size={'small'}
          onClick={handleSubmit}
          disabled={!save}
          loading={updatePrivacySettings.status === 'loading'}
        />
      </div>
      <div className='my-5 position-relative'>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='header'>Blocked List</div>
          <button onClick={() => setShowBlocked(!showBlocked)}>
            <Icon
              icon={!showBlocked ? 'chevronRightBigger' : 'chevronDownBig'}
            />
          </button>
        </div>

        <div className={!showBlocked && 'd-none'}>
          <BlockedUser />
        </div>
      </div>
    </div>
  );
};

export default Privacy;
