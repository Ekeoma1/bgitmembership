import { useState } from 'react';
import TextInput from '../Form-Input/TextInput';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CountryInput from '../Form-Input/CountryInput';
import 'react-phone-number-input/style.css';
import PhoneInputField from '../Form-Input/PhoneNumberInput';
import { useDispatch } from 'react-redux';
import { addSignUpFormData } from '../../Features/signup/signup_slice';

const PersonalDetailsForm = ({ tabChanger, currentTab }) => {
  const [value, setValue] = useState();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    // Handle form submission here
    console.log(values);
    dispatch(addSignUpFormData(values));
    tabChanger(currentTab + 1);
  };

  const validationSchema = Yup.object().shape({
    FirstName: Yup.string().required('Required'),
    SecondName: Yup.string().required('Required'),
    Address1: Yup.string().required('Required'),
    // Address2: Yup.string().required('Required'),
    PostCode: Yup.string().required('Required'),
    Country: Yup.string().required('Required'),
    City: Yup.string().required('Required'),
    DOB: Yup.date()
      .max(new Date(), 'Birthdate must be in the past')
      .test('age', 'Age should be between 18 and 99', (value) => {
        const birthdate = new Date(value);
        const currentDate = new Date();
        const minAgeDate = new Date(
          currentDate.getFullYear() - 99,
          currentDate.getMonth(),
          currentDate.getDate()
        );
        const maxAgeDate = new Date(
          currentDate.getFullYear() - 18,
          currentDate.getMonth(),
          currentDate.getDate()
        );
        return birthdate >= minAgeDate && birthdate <= maxAgeDate;
      })
      .required('Birthdate is required'),
    PhoneNumber: Yup.string()
      .required('Required')
      .matches(/^\+[1-9]{1}[0-9]{3,14}$/, 'Invalid phone number'),
  });

  return (
    <div className='details-wrapper'>
      <header>
        <h3>Personal Details</h3>
        <p>Please fill out your details below.</p>
      </header>

      <Formik
        initialValues={{
          FirstName: '',
          SecondName: '',
          DOB: '',
          Address1: '',
          // Address2: '',
          PostCode: '',
          Country: '',
          City: '',
          PhoneNumber:''
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className='row row-cols-lg-2 row-cols-1'>
            <div className='col'>
              <TextInput
                name='FirstName'
                label='First Name'
                type='text'
                placeholder='First Name'
              />
            </div>

            <div className='col'>
              <TextInput
                name='SecondName'
                label='Last Name'
                type='text'
                placeholder='Last Name'
              />
            </div>

            <div className='col'>
              <TextInput
                name='DOB'
                label='Date of Birth'
                type='date'
                placeholder='dd/mm/yyyy'
              />
            </div>

            <div className='col'>
              <PhoneInputField name='PhoneNumber' />
            </div>
          </div>

          <header className='mt-4'>
            <h3>Address</h3>
            <p>Please fill out your details below.</p>
          </header>

          <TextInput
            name='Address1'
            label='Address 1'
            placeholder='Enter your address here'
          />
          <TextInput
            name='Address2'
            label='Address 2'
            placeholder='Enter your address here'
          />
          <div className='row'>
            <div className='col-lg'>
              <TextInput
                // type='number'
                name='PostCode'
                label='Post code'
                placeholder='Enter your postcode'
              />
            </div>

            <div className='col-lg'>
              <CountryInput name='Country' label='Country' />
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              <TextInput
                name='City'
                label='City'
                type='text'
                placeholder='Enter your city'
              />
            </div>
          </div>

          <div className='text-center'>
            <button className='primary-btn' type='submit'>
              Next
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default PersonalDetailsForm;
