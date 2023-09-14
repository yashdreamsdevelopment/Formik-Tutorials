import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";

const AdvancedForm = () => {
  const initialValues = {
    name: "",
    email: "",
    channel: "",
  };

  const onSubmit = (values) => {
    alert(JSON.stringify(values, undefined, 2));
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Not a valid email")
      .required("Email is required"),
    channel: Yup.string().required("Channel name is required"),
  });

  return (
    <>
      <h1>Advanced Form with Formik + YUP </h1>
      <Link to={"/"}>&larr; Back</Link>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="form">
          <div>
            <div className="input-group">
              <label htmlFor="name" className="input-label">
                Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="input-field"
              />
            </div>
            <ErrorMessage name="name" />
          </div>
          <div>
            <div className="input-group">
              <label htmlFor="email" className="input-label">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="input-field"
              />
            </div>
            <ErrorMessage name="email" />
          </div>
          <div>
            <div className="input-group">
              <label htmlFor="channel" className="input-label">
                Channel
              </label>
              <Field
                type="channel"
                id="channel"
                name="channel"
                className="input-field"
              />
            </div>
            <ErrorMessage name="channel" />
          </div>

          <button type="submit" className="button">
            Submit
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default AdvancedForm;
