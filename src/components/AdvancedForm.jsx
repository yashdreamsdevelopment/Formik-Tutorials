import React from "react";
import * as Yup from "yup";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
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
    phoneNumber: ["", ""],
    phNumbers: [""],
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
    phoneNumber: Yup.array()
      .of(
        Yup.string().matches(
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
          { message: "Not a valid phone no." }
        )
      )
      .required("Phone no. is required")
      .min(1, "At least one contact is required"),
    phNumber: Yup.array()
      .of(
        Yup.string().matches(
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
          { message: "Not a valid phone no." }
        )
      )
      .required("Contact no. is required")
      .min(1, "At least one contact field is required"),
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
                placeholder="Enter your name"
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
                placeholder="Enter your email"
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
                placeholder="Enter your Fav. YT channel"
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
                placeholder="Any comments"
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
              <FastField
                type="text"
                className="input-field"
                name="address"
                placeholder="Enter your address"
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
                placeholder="Facebook username"
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
                placeholder="Twitter username"
                className="input-field"
              />
            </div>

            <ErrorMessage name="social.twitter" component={FormFieldError} />
          </div>

          <div>
            <div className="input-group">
              <label htmlFor="primaryPh" className="input-label">
                Phone Number
              </label>
              <Field
                type="text"
                id="primaryPh"
                placeholder="Enter your primary phone no."
                name="phoneNumber[0]"
                className="input-field"
              />
            </div>
            <ErrorMessage name="phoneNumber[0]" component={FormFieldError} />
          </div>

          <div>
            <div className="input-group">
              <label htmlFor="secondaryPh" className="input-label">
                Alt. Phone Number
              </label>
              <Field
                type="text"
                id="secondayPh"
                name="phoneNumber[1]"
                className="input-field"
                placeholder="Alternate phone no."
              />
            </div>
            <ErrorMessage name="phoneNumber[1]" component={FormFieldError} />
          </div>

          <div>
            <div className="input-group">
              <label htmlFor="" className="input-label">
                List of phone numbers
              </label>
              <FieldArray name="phNumbers">
                {(fieldArrayProps) => {
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { phNumbers } = values;
                  return (
                    <div>
                      {phNumbers.map((phNumber, index) => (
                        <div key={index}>
                          <div key={index}>
                            <Field
                              name={`phNumber[${index}]`}
                              id={`phNumber[${index}]`}
                              className="input-field"
                              placeholder={`Enter your contact ${index + 1}`}
                            />
                            <button
                              type="button"
                              className="button"
                              disabled={index === 0}
                              onClick={() => remove(index)}
                            >
                              -
                            </button>
                            <button
                              type="button"
                              className="button"
                              onClick={() => push("")}
                            >
                              +
                            </button>
                          </div>
                          <ErrorMessage
                            name={`phNumber`}
                            component={FormFieldError}
                          />
                        </div>
                      ))}
                    </div>
                  );
                }}
              </FieldArray>
            </div>
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
