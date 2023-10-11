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
  const [formData2, setFormData2] = useState({});
  const [save, setSave] = useState(false);

  const handleSubmit = (values) => {
    if (save) {
      console.log('values login', values);
      let { tags, skills } = values;
      let tagsFinal, skillsFinal;
      console.log(typeof tags);
      if (typeof tags === 'string') {
        const tagsTemp = tags.split(/[ .:;?!~,`"&|()<>{}[\]\r\n/\\]+/);
        console.log('tags Temp', tagsTemp);
        tagsFinal = tagsTemp.map((tag) => {
          return { name: tag };
        });
        console.log('tagsFinal', tagsFinal);
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
    }
  };
  const handleChange = (name, value) => {
    setFormData2({ ...formData2, [name]: value });
    let object1 = {
      ...formData,
      dob: formData.dob.split('T')[0],
    };
    console.log('object1', object1);
    let object2;
    if (name === 'skills') {
      const skillsTemp = value.split(',');
      const skillsTemp2 = skillsTemp
        .map((item) => item.trim())
        .filter((item) => item !== '');
      function arraysHaveSameValues(arr1, arr2) {
        if (arr1.length !== arr2.length) {
          return false;
        }
        const sortedArr1 = [...arr1].sort();
        const sortedArr2 = [...arr2].sort();
        for (let i = 0; i < sortedArr1.length; i++) {
          if (sortedArr1[i] !== sortedArr2[i]) {
            setSave(true);
            return false;
          }
        }
        setSave(false);
        return true;
      }
      arraysHaveSameValues(skillsTemp2, formData.skills);
    } else if (name === 'tags') {
      const tagsTemp = value.split(',');
      const tagsTemp2 = tagsTemp
        .map((item) => item.trim())
        .filter((item) => item !== '');
      console.log(tagsTemp2);
      function arraysHaveSameValues(arr1, arr2) {
        if (arr1.length !== arr2.length) {
          return false;
        }
        const sortedArr1 = [...arr1].sort();
        const sortedArr2 = [...arr2].sort();
        for (let i = 0; i < sortedArr1.length; i++) {
          if (sortedArr1[i] !== sortedArr2[i]) {
            setSave(true);
            return false;
          }
        }
        setSave(false);
        return true;
      }
      arraysHaveSameValues(tagsTemp2, formData.tags);
    } else {
      object2 = { ...formData2, [name]: value };
      function haveSameValuesForCommonKeys(obj1, obj2) {
        for (const key in obj1) {
          if (
            obj1.hasOwnProperty(key) &&
            obj2.hasOwnProperty(key) &&
            obj1[key] !== obj2[key]
          ) {
            setSave(true);
            return false;
          }
        }
        setSave(false);
        return true;
      }
      haveSameValuesForCommonKeys(object1, object2);
    }
  };
  useEffect(() => {
    if (updateMyProfile.status === 'successful') {
      if (updateMyProfile.data.user.userId) {
        renderToast({
          status: 'success',
          message: 'You have successfully updated your profile',
        });
        dispatch(triggerGetMyProfile());
        setSave(false);
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
            // validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            <Form>
              <TextInput
                name='firstName'
                label='First Name *'
                type='text'
                handlechange={handleChange}
              />
              <TextInput
                name='secondName'
                label='Second Name *'
                type='text'
                handlechange={handleChange}
              />
              <TextInput
                name='additionalName'
                label='Additional Name'
                type='text'
                handlechange={handleChange}
              />
              <TextArea
                label='Edit about info'
                name='biography'
                handlechange={handleChange}
              />
              <TextInput
                name='dob'
                label='Date of Birth'
                type='date'
                handlechange={handleChange}
              />
              <TextInput
                name='tags'
                label='Tags'
                type='text'
                handlechange={handleChange}
              />
              <TextInput
                name='skills'
                label='Skills'
                type='text'
                handlechange={handleChange}
              />
              {/* for this multi select data of api should be passed to the option
            props
            <MultiSelectInput name='tags' label='Tags' />
            <MultiSelectInput name='skills' label='Skills' /> */}
              {/* Industry does not exist of the getUserProfile endpoint response So I commented this for now */}
              {/* <TextInput
                label='Industry'
                name='industry'
                type='text'
                handlechange={handleChange}
              /> */}
              <CountryInput name='country' handlechange={handleChange} />
              <TextInput
                label='City'
                name='city'
                type='text'
                handlechange={handleChange}
              />
              <div className='mt-3 text-end'>
                <MainButton
                  text={'Save'}
                  loading={updateMyProfile.status === 'loading'}
                  size={'small'}
                  disabled={!save}
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
