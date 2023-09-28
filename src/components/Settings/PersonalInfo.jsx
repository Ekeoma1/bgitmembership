import React, { useEffect } from 'react';
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

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const { getMyProfile, updateMyProfile } = useSelector((state) => state.users);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().notRequired('Required'),
    secondName: Yup.string().notRequired('Required'),
    additionalName: Yup.string().notRequired('Required'),
    biography: Yup.string().notRequired('Required'),
  });

  const handleSubmit = (values) => {
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
    console.log('valuestodis', valuesToDispatch);
    dispatch(triggerUpdateMyProfile(valuesToDispatch));
  };

  const notify = () => toast('You have successfully updated your profile');

  useEffect(() => {
    if (updateMyProfile.status === 'successful') {
      dispatch(triggerGetMyProfile());
      dispatch(resetUpdateMyProfile());
      notify();
    }
  }, [updateMyProfile.status]);

  useEffect(() => {
    dispatch(triggerGetMyProfile());
  }, []);
  return (
    <div className='settings-card shadow'>
      <div className='header'>Personal Info</div>
      <div className='mt-3'>
        <Formik
          initialValues={{
            firstName: getMyProfile.data?.firstName ?? '',
            secondName: getMyProfile.data?.secondName ?? '',
            additionalName: getMyProfile.data?.additionalName ?? '',
            biography: getMyProfile.data?.biography ?? '',
            dob: getMyProfile.data?.dob ?? '',
            tags: getMyProfile.data?.tags ?? [],
            skills: getMyProfile.data?.skills ?? [],
            industry: getMyProfile.data?.industry ?? '',
            country: getMyProfile.data?.country ?? '',
            city: getMyProfile.data?.city ?? '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
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
            <TextInput label='Industry' name='industry' type='text' />
            <CountryInput name='country' />
            <TextInput label='City' name='city' type='text' />
            <div className='mt-3 text-end'>
              <button className='primary-btn small-btn' type='submit'>
                save
              </button>
            </div>
          </Form>
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PersonalInfo;
