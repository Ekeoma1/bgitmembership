import React from "react";
import { Formik, Form } from "formik";
import PasswordInput from "../Form-Input/PasswordInput";
import TextInput from "../Form-Input/TextInput";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../Features/authSlice";

// this component is used for both signup and login

const LoginForm = ({ forLogin, regFirstStep }) => {
  const dispatch = useDispatch();
  const handleSubmit = (values) => {
    // Handle form submission here
    if (forLogin) {
      console.log(values, "login");
      dispatch(login());
    } else {
      console.log(values, "for signup");
      regFirstStep(true);
    }
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
            {forLogin ? (
              <>
                <h2>Log In</h2>
                <div>Please login to your membership account using the form below.</div>
              </>
            ) : (
              <>
                <h2>Sign up</h2>
                <div>Create an account today to begin your free membership!</div>
              </>
            )}
          </header>

          <TextInput name="email" label="Email" type="email" placeholder="Input your email here" />
          <PasswordInput name="password" label="Password" placeholder="Input your password here" />

          {forLogin && (
            <Link to="/forgot-password" className="other-action-btn mt-3">
              Forgot Password?
            </Link>
          )}
        </div>

        <div className="text-center">
          <button className="primary-btn" type="submit">
            {forLogin ? "Log in" : "Sign up"}
          </button>

          <div className="mt-3 next-action-text">
            {forLogin ? (
              <>
                <span>Don't have an account?</span>{" "}
                <span>
                  <Link to="/register">Sign Up</Link>
                </span>
              </>
            ) : (
              <>
                <span>Already have an account?</span>{" "}
                <span>
                  <Link to="/login">Log in</Link>
                </span>
              </>
            )}
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default LoginForm;
