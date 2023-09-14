import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import FormFieldError from "./FormFieldError";

const AdvancedForm = () => {
  const initialValues = {
    name: "",
    email: "",
    channel: "",
    comments: "",
    address: "",
    social: {
      facebook: "",
      twitter: "",
    },
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
    comments: Yup.string().required("Comments is required"),
    address: Yup.string().required("Address is required"),
    social: Yup.object().shape({
      facebook: Yup.string().required("Facebook is required"),
      twitter: Yup.string().required("Twitter is required"),
    }),
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
            <ErrorMessage name="name" component={FormFieldError} />
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
            <ErrorMessage name="email">
              {(msg) => <FormFieldError>{msg}</FormFieldError>}
            </ErrorMessage>
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
            <ErrorMessage
              name="channel"
              render={(msg) => <div className="input-error">{msg}</div>}
            />
          </div>
          <div>
            <div className="input-group">
              <label htmlFor="comments" className="input-label">
                Comments
              </label>
              <Field
                as="textarea"
                id="comments"
                name="comments"
                className="input-field"
              />
            </div>
            <ErrorMessage name="comments" component={FormFieldError} />
          </div>

          {/* address field using prop rendering */}
          {/* <div>
            <div className="input-group">
              <label htmlFor="address" className="input-label">
                Address
              </label>
              <Field name="address">
                {(props) => {
                  const { field, form, meta } = props;
                  //   console.log(meta);
                  return (
                    <>
                      <input
                        type="text"
                        id="address"
                        className="input-field"
                        name="address"
                        {...field}
                      />
                      {meta.touched && meta.error ? (
                        <p className="input-error">{meta.error}</p>
                      ) : null}
                    </>
                  );
                }}
              </Field>
            </div>
          </div> */}

          <div>
            <div className="input-group">
              <label htmlFor="address" className="input-label">
                Address
              </label>
              <Field
                type="text"
                className="input-field"
                name="address"
                id="address"
              />
            </div>
            <ErrorMessage name="address" component={FormFieldError} />
          </div>

          <div>
            <div className="input-group">
              <label htmlFor="facebook" className="input-label">
                Facebook profile
              </label>
              <Field
                type="text"
                id="facebook"
                name="social.facebook"
                className="input-field"
              />
            </div>
            <ErrorMessage name="social.facebook">
              {(msg) => <FormFieldError>{msg}</FormFieldError>}
            </ErrorMessage>
          </div>

          <div>
            <div className="input-group">
              <label htmlFor="twitter" className="input-label">
                Twitter profile
              </label>
              <Field
                type="text"
                id="twitter"
                name="social.twitter"
                className="input-field"
              />
            </div>

            <ErrorMessage name="social.twitter" component={FormFieldError} />
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
