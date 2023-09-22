import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextArea from "../Form-Input/TextArea";
import TextInput from "../Form-Input/TextInput";
import CircleImageUploader from "../Form-Input/CircleImageUploader";
import SelectInput from "../Form-Input/SelectInput";
import { useDispatch } from "react-redux";
import { addSignUpFormData } from '../../Features/auth/auth_slice';

const ProfileDetails = ({ tabChanger, currentTab }) => {
  const dispatch = useDispatch();
  const handleSubmit = (values) => {
    dispatch(addSignUpFormData(values));
    tabChanger(currentTab + 1);
  };

  const validationSchema = Yup.object({
    // Add validation rules for other form fields, if needed
    photo: Yup.string().required("Please upload an image"),
    Biography: Yup.string().required("Tell us about yourself"),
    Niche: Yup.string().required("Please select your niche"),
    Profession: Yup.string().required("Your profession is required"),
  });

  return (
    <div className="details-wrapper">
      <Formik
        initialValues={{
          photo: "",
          Biography: "",
          Niche: "",
          Profession: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="d-flex flex-wrap align-items-center justify-content-between">
            <header>
              <h3>Personal Details</h3>
              <p>Please fill out your details below.</p>
            </header>

            <div className="input-wrapper">
              <CircleImageUploader name="photo" />
              <ErrorMessage name="image" component="div" className="error-label" />
            </div>
          </div>

          <TextArea label="Biography" name="Biography" placeholder="Tell us about yourself..." />

          <div className="row">
            <div className="col-lg">
              {/* <SelectInput name="favoriteColor" label="Favorite Color:" options={colorOptions} /> */}
              <SelectInput name="Niche" label="Niche" />
            </div>
            <div className="col-lg">
              <TextInput name="Profession" label="Profession" />
            </div>
          </div>

          <div className="text-center">
            <button className="primary-btn" type="submit">
              Next
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ProfileDetails;
