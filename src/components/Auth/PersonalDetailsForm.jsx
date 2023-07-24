import { useState } from "react";
import TextInput from "../Form-Input/TextInput";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CountryInput from "../Form-Input/CountryInput";
import "react-phone-number-input/style.css";
import PhoneInputField from "../Form-Input/PhoneNumberInput";

const PersonalDetailsForm = ({ tabChanger, currentTab }) => {
  const [value, setValue] = useState();

  const handleSubmit = (values) => {
    // Handle form submission here
    console.log(values);
    tabChanger(currentTab + 1);
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("Required"),
    lastname: Yup.string().required("Required"),
    address1: Yup.string().required("Required"),
    postcode: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    dob: Yup.date()
      .max(new Date(), "Birthdate must be in the past")
      .test("age", "Age should be between 18 and 99", (value) => {
        const birthdate = new Date(value);
        const currentDate = new Date();
        const minAgeDate = new Date(currentDate.getFullYear() - 99, currentDate.getMonth(), currentDate.getDate());
        const maxAgeDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
        return birthdate >= minAgeDate && birthdate <= maxAgeDate;
      })
      .required("Birthdate is required"),
    phoneNumber: Yup.string()
      .required("Required")
      .matches(/^\+[1-9]{1}[0-9]{3,14}$/, "Invalid phone number"),
  });

  return (
    <div className="details-wrapper">
      <header>
        <h3>Personal Details</h3>
        <p>Please fill out your details below.</p>
      </header>

      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          dob: "",
          address1: "",
          address2: "",
          postcode: "",
          country: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="row row-cols-lg-2 row-cols-1">
            <div className="col">
              <TextInput name="firstname" label="First Name" type="text" placeholder="First Name" />
            </div>

            <div className="col">
              <TextInput name="lastname" label="Last Name" type="text" placeholder="Last Name" />
            </div>

            <div className="col">
              <TextInput name="dob" label="Date of Birth" type="date" placeholder="dd/mm/yyyy" />
            </div>

            <div className="col">
              <PhoneInputField name="phoneNumber" />
            </div>
          </div>

          <header className="mt-4">
            <h3>Address</h3>
            <p>Please fill out your details below.</p>
          </header>

          <TextInput name="address1" label="Address 1" placeholder="Enter your address here" />
          <TextInput name="address2" label="Address 2" placeholder="Enter your address here" />
          <div className="row">
            <div className="col-lg">
              <TextInput type="number" name="postcode" label="Postcode" placeholder="Enter your postcode" />
            </div>

            <div className="col-lg">
              <CountryInput name="country" label="Country" />
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

export default PersonalDetailsForm;
