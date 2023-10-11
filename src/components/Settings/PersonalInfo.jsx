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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { renderToast } from '../Molecules/CustomToastify';
import MainButton from '../Molecules/MainButton';

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const { getMyProfile, updateMyProfile } = useSelector((state) => state.users);
  const [formData, setFormData] = useState({});
  const [formData2, setFormData2] = useState({});
  const [save, setSave] = useState(false);

  // const validationSchema = Yup.object().shape({
  //   firstName: Yup.string().notRequired('Required'),
  //   secondName: Yup.string().notRequired('Required'),
  //   additionalName: Yup.string().notRequired('Required'),
  //   biography: Yup.string().notRequired('Required'),
  // });

  const handleSubmit = (values) => {
    if (save) {
      console.log('values login', values);
      let { tags, skills } = values;
      let tagsFinal, skillsFinal;
      console.log(typeof skills);
      console.log(typeof tags);
      if (typeof tags === 'string') {
        const tagsTemp = tags.split(/[ .:;?!~,`"&|()<>{}[\]\r\n/\\]+/);
        tagsFinal = tagsTemp.map((tag) => {
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
      }
      if (typeof tags === 'object') {
        tagsFinal = tags.map((tag) => {
          return { name: tag };
        });
        tags = tagsFinal;
      }
      if (typeof skills === 'object') {
        skillsFinal = skills.map((skill) => {
          return { name: skill };
        });
        skills = skillsFinal;
      }
      const valuesToDispatch = { ...values, tags, skills };
      // console.log('valuestodis', valuesToDispatch);
      // console.log('getmyprofile', getMyProfile.data);
      // dispatch(triggerUpdateMyProfile(valuesToDispatch));
    }
  };
  const handleChange = (name, value) => {
    // console.log(name, value);
    console.log(formData);

    setFormData2({ ...formData2, [name]: value });
    let object1 = {
      ...formData,
      dob: formData.dob.split('T')[0],
      // skills: JSON.stringify(formData.skills),
      // tags: JSON.stringify(formData.tags),
      // skills: JSON.stringify({ name: formData.skills.join(' ') }),
      tags: JSON.stringify({ name: formData.tags.join(' ') }),
    };
    console.log('object1', object1);
    let object2;
    if (name === 'skills') {
      const skillsTemp = value
        .split(/[ .:;?!~,`"&|()<>{}[\]\r\n/\\]+/)
        .join(',')
        .split(',');
      console.log('skillsTemp', skillsTemp);
      // skillsFinal = skillsTemp.map((skill) => {
      //   return { name: skill };
      // });
      // skills = skillsFinal;

      const skillsFinal = formData.skills.map((skill) => {
        return { name: skill };
      });
      object2 = { ...formData2, skills: skillsFinal };
      // console.log(name);
    } else {
      object2 = { ...formData2, [name]: value };
    }
    console.log('object2', object2);
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
    // console.log();

    // if (!haveSameValuesForCommonKeys(object1, object2)) {
    //   setSave(true);
    // } else {
    //   setSave(false);
    // }
  };
  useEffect(() => {
    if (updateMyProfile.status === 'successful') {
      renderToast({
        status: 'success',
        message: 'You have successfully updated your profile',
      });
      dispatch(resetUpdateMyProfile());
      dispatch(triggerGetMyProfile());
    }
  }, [updateMyProfile.status]);

  useEffect(() => {
    if (getMyProfile.status === 'successful') {
      setFormData(getMyProfile.data);
    }
  }, [getMyProfile.status]);

  console.log('save', save);
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
