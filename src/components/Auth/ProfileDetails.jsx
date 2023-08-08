import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextArea from "../Form-Input/TextArea";
import TextInput from "../Form-Input/TextInput";
import CircleImageUploader from "../Form-Input/CircleImageUploader";
import SelectInput from "../Form-Input/SelectInput";

const ProfileDetails = ({ tabChanger, currentTab }) => {
  const handleSubmit = (values) => {
    // Handle form submission here
    console.log(values);
    tabChanger(currentTab + 1);
  };

  const validationSchema = Yup.object({
    // Add validation rules for other form fields, if needed
    image: Yup.string().required("Please upload an image"),
    bio: Yup.string().required("Tell us about yourself"),
    niche: Yup.string().required("Please select a favorite greeting"),
    profession: Yup.string().required("Your profession is required"),
  });

  return (
    <div className="details-wrapper">
      <Formik
        initialValues={{
          image: "",
          bio: "",
          niche: "",
          profession: "",
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
              <CircleImageUploader name="image" />
              <ErrorMessage name="image" component="div" className="error-label" />
            </div>
          </div>

          <TextArea label="Bio" name="bio" placeholder="Tell us about yourself..." />

          <div className="row">
            <div className="col-lg">
              {/* <SelectInput name="favoriteColor" label="Favorite Color:" options={colorOptions} /> */}
              <SelectInput name="niche" label="Niche" />
            </div>
            <div className="col-lg">
              <TextInput name="profession" label="Profession" />
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
