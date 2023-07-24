import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextArea from "../Form-Input/TextArea";
import TextInput from "../Form-Input/TextInput";

const ProfileDetails = ({ tabChanger, currentTab }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (values) => {
    // Handle form submission here
    console.log(values);
    tabChanger(currentTab + 1);
  };

  return (
    <div className="details-wrapper">
      <div className="d-flex flex-wrap align-items-center justify-content-between">
        <header>
          <h3>Personal Details</h3>
          <p>Please fill out your details below.</p>
        </header>

        <div className="circle-container">
          {image ? <img src={image} alt="Uploaded" className="uploaded-image" /> : <div className="placeholder-text">Add photo</div>}
          <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" />
        </div>
      </div>

      <Formik initialValues={{}} onSubmit={handleSubmit}>
        <Form>
          <TextArea label="Bio" name="bio" placeholder="Tell us about yourself..." />

          <div className="row">
            <div className="col-lg">
              <TextInput name="Tag" label="Tags" placeholder="Please Select" />
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
