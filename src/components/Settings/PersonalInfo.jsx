import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import TextInput from '../Form-Input/TextInput';
import TextArea from '../Form-Input/TextArea';
import CountryInput from '../Form-Input/CountryInput';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetUpdateMyProfile,
  triggerGetMyProfile,
  triggerUpdateMyProfile,
} from '../../Features/users/users_slice';

import { renderToast } from '../Molecules/CustomToastify';
import MainButton from '../Molecules/MainButton';

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const { getMyProfile, updateMyProfile } = useSelector((state) => state.users);
  const [formData, setFormData] = useState({});

  const handleSubmit = (values) => {
    // console.log('values login', values);
    let { tags, skills } = values;
    let tagsFinal, skillsFinal;
    console.log(typeof tags);
    if (typeof tags === 'string') {
      const tagsTemp = tags.split(/[ .:;?!~,`"&|()<>{}[\]\r\n/\\]+/);
      tagsFinal = tagsTemp.map((tag) => {
        return { name: tag };
      });
      tags = tagsFinal;
    } else if (typeof tags === 'object') {
      tagsFinal = tags.map((tag) => {
        return { name: tag };
      });
      tags = tagsFinal;
    }
    if (typeof skills === 'string') {
      const skillsTemp = skills.split(/[ .:;?!~,`"&|()<>{}[\]\r\n/\\]+/);
      skillsFinal = skillsTemp.map((skill) => {
        return { name: skill };
      });
      skills = skillsFinal;
    } else if (typeof skills === 'object') {
      skillsFinal = skills.map((skill) => {
        return { name: skill };
      });
      skills = skillsFinal;
    }
    const valuesToDispatch = { ...values, tags, skills };
    dispatch(triggerUpdateMyProfile(valuesToDispatch));
  };

  useEffect(() => {
    if (updateMyProfile.status === 'successful') {
      if (updateMyProfile.data.user.userId) {
        renderToast({
          status: 'success',
          message: 'You have successfully updated your profile',
        });
        dispatch(triggerGetMyProfile());
      } else if (
        updateMyProfile.data === 'Maximum of 5 tags allowed per user.'
      ) {
        renderToast({
          status: 'error',
          message: 'Maximum of 5 tags allowed per user. ',
        });
      } else if (
        updateMyProfile.data === 'Maximum of 5 skills allowed per user.'
      ) {
        renderToast({
          status: 'error',
          message: 'Maximum of 5 skills allowed per user.',
        });
      }
      dispatch(resetUpdateMyProfile());
    }
  }, [updateMyProfile.status]);

  useEffect(() => {
    if (getMyProfile.status === 'successful') {
      setFormData(getMyProfile.data);
    }
  }, [getMyProfile.status]);

  return (
    <div className='settings-card shadow'>
      <div className='header'>Personal Info</div>
      <div className='mt-3'>
        {Object.keys(formData).length > 0 && (
          <Formik
            initialValues={{
              firstName: formData.firstName,
              secondName: formData.secondName,
              additionalName: formData.additionalName,
              biography: formData.biography,
              dob: formData.dob.split('T')[0],
              tags: formData.tags,
              skills: formData.skills,
              industry: formData.industry,
              country: formData.country,
              city: formData.city,
            }}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            <Form>
              <TextInput name='firstName' label='First Name *' type='text' />
              <TextInput name='secondName' label='Second Name *' type='text' />
              <TextInput
                name='additionalName'
                label='Additional Name'
                type='text'
              />
              <TextArea label='Edit about info' name='biography' />
              <TextInput name='dob' label='Date of Birth' type='date' />
              <TextInput name='tags' label='Tags' type='text' />
              <TextInput name='skills' label='Skills' type='text' />
              {/* for this multi select data of api should be passed to the option
            props
            <MultiSelectInput name='tags' label='Tags' />
            <MultiSelectInput name='skills' label='Skills' /> */}
              {/* Industry does not exist of the getUserProfile endpoint response So I commented this for now */}
              {/* <TextInput
                label='Industry'
                name='industry'
                type='text'
                
              /> */}
              <CountryInput name='country' />
              <TextInput label='City' name='city' type='text' />
              <div className='mt-3 text-end'>
                <MainButton
                  text={'Save'}
                  loading={updateMyProfile.status === 'loading'}
                  size={'small'}
                />
              </div>
            </Form>
          </Formik>
        )}
      </div>
    </div>
  );
};

export default PersonalInfo;
