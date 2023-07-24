import React from "react";
import { Formik, Form } from "formik";
import PasswordInput from "../Form-Input/PasswordInput";
import TextInput from "../Form-Input/TextInput";
import * as Yup from "yup";

const LoginForm = ({ actionForForm }) => {
  const handleSubmit = (values) => {
    // Handle form submission here
    console.log(values);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Required")
      .matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]).*$/, "Must contain at least one number, one uppercase letter, and one special character"),
  });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="form-card mx-lg-0 mx-auto">
        <div>
          <header>
            <h2>Log In</h2>
            <div>Please login to your membership account using the form below.</div>
          </header>

          <TextInput name="email" label="Email" type="email" placeholder="Input your email here" />
          <PasswordInput name="password" label="Password" placeholder="Input your password here" />

          <div onClick={() => actionForForm(2)} className="other-action-btn mt-3">
            Forgot Password?
          </div>
        </div>

        <div className="text-center">
          <button className="primary-btn" type="submit">
            Log in
          </button>

          <div className="mt-3 next-action-text">
            <span>Don't have an account?</span> <span>Sign Up</span>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default LoginForm;
