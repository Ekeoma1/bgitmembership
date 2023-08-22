import React from "react";
import { Formik, Form } from "formik";
import TextInput from "../Form-Input/TextInput";
import TextArea from "../Form-Input/TextArea";
import CountryInput from "../Form-Input/CountryInput";
import MultiSelectInput from "../Form-Input/MultiSelectInput";

const PersonalInfo = () => {
  return (
    <div className="settings-card shadow">
      <div className="header">Personal Info</div>
      <div className="mt-3">
        <Formik initialValues={{}}>
          <Form>
            <TextInput label="First Name *" name="firstName" type="text" />

            <TextInput label="Last Name *" name="lastName" type="text" />

            <TextInput label="Additional Name" name="otherName" type="text" />

            <TextArea label="Edit about info" name="bio" />

            <TextInput name="dob" label="Date of Birth" type="date" />
            {/* for this multi select data of api should be passed to the option props */}
            <MultiSelectInput name="tags" label="Tags" />
            <MultiSelectInput name="skills" label="Skills" />

            <TextInput label="Industry" name="industry" type="text" />

            <CountryInput name="country" />

            <TextInput label="City" name="city" type="text" />

            <div className="mt-3 text-end">
              <button className="primary-btn small-btn">save</button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default PersonalInfo;
