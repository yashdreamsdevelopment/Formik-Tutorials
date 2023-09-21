import React, { useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
import * as Yup from "yup";
import FormFieldError from "./FormFieldError";

const FastFieldForm = () => {
  const [formSubmitState, setFormState] = useState(false);
  const [formValues, setFormValues] = useState(null);

  const savedValues = {
    name: "Vishwas",
    email: "v@example.com",
    address: "221b bakers street NY",
    contacts: [""],
    comments: "Happy learning ",
  };

  const initialValues = {
    name: "",
    email: "",
    address: "",
    contacts: [""],
    comments: "",
  };

  const onSubmit = (values, onSubmitProps) => {
    console.log("ON-SUBMIT-RPOPS: ", onSubmitProps);
    setFormState(true);
    setTimeout(() => {
      alert(JSON.stringify(values, undefined, 2));
      onSubmitProps.setSubmitting(false);
      setFormState(false);
      onSubmitProps.resetForm();
    }, 2000);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("name is required"),
    email: Yup.string().email("Invalid email").required("email is required"),
    address: Yup.string().required("address is required"),
    contacts: Yup.array()
      .of(
        Yup.string().matches(
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
          { message: "Not a valid phone no." }
        )
        //   .required("Contact no. is required")
      )
      .required("Contact is required")
      .min(1, "Atleast 1 contact is required"),
  });

  const validateComments = (value) => {
    let error;

    if (!value) error = "comment is required";

    return error;
  };

  return (
    <Formik
      initialValues={formValues || initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize
      // validateOnMount
      // validateOnChange={false}
      // validateOnBlur={false}
      // validateOnMount
    >
      {(formik) => {
        console.log("Formik Props:", formik);
        return (
          <Form className="form">
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
              <ErrorMessage name="name" component={FormFieldError} />
            </div>
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
              <ErrorMessage name="email" component={FormFieldError} />
            </div>
            <div className="input-group">
              <label htmlFor="address" className="input-label">
                Address
              </label>
              <FastField name="address">
                {({ field, form, meta }) => {
                  return (
                    <>
                      <input
                        type="text"
                        className="input-field"
                        id="address"
                        placeholder="Enter your address"
                        {...field}
                      />
                      <ErrorMessage name="address" component={FormFieldError} />
                    </>
                  );
                }}
              </FastField>
            </div>
            <div className="input-group">
              <label htmlFor="comments" className="input-label">
                Comments
              </label>
              <Field
                as="textarea"
                name="comments"
                className="input-field"
                id="comments"
                placeholder="your comments"
                validate={validateComments}
              />

              <ErrorMessage name="comments" component={FormFieldError} />
            </div>
            <div className="input-group">
              <label htmlFor="contact" className="input-label">
                Contact
              </label>
              <FieldArray
                name="contacts"
                render={(arrayHelpers) => {
                  const { push, remove, form } = arrayHelpers;
                  // console.log("Form Errors:", form.errors);
                  const contacts = form.values.contacts;

                  return contacts.map((contact, index) => {
                    return (
                      <div className="input-group" key={index}>
                        <div>
                          <Field
                            type="text"
                            name={`contacts[${index}]`}
                            id={`contacts[${index}]`}
                            className="input-field"
                            placeholder={`Enter contact no. ${index + 1}`}
                          />

                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => remove(index)}
                            className="button"
                          >
                            -
                          </button>

                          <button
                            type="button"
                            className="button"
                            onClick={() => push()}
                          >
                            +
                          </button>
                        </div>
                        <ErrorMessage
                          name={`contacts[${index}]`}
                          component={FormFieldError}
                        />
                      </div>
                    );
                  });
                }}
              />
            </div>

            <div className="input-group">
              {/* Submit button 1: */}
              {/* <button
                className="button"
                type="submit"
                disabled={!(formik.isValid && formik.dirty)}
              >
                Submit
              </button> */}

              {/* Submit button 2: */}
              <button
                className="button"
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                {formSubmitState ? "Submitting..." : "Submit"}
              </button>

              <button
                className="button"
                type="button"
                onClick={() => setFormValues(savedValues)}
              >
                Load Saved Data
              </button>

              <button className="button" type="reset">
                Reset
              </button>

              {/* <button
                className="button"
                type="button"
                onClick={() => formik.setFieldTouched()}
              >
                Validate Comments
              </button>

              <button
                className="button"
                type="button"
                onClick={() => formik.setFieldTouched("comments")}
              >
                Visit Comments
              </button>

              <button
                className="button"
                onClick={() =>
                  formik.setTouched({
                    name: true,
                    email: true,
                    address: true,
                    comments: true,
                    contacts: true,
                  })
                }
                type="button"
              >
                Visit Field
              </button>

              <button
                className="button"
                type="button"
                onClick={() => formik.validateForm()}
              >
                Validate All
              </button> */}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FastFieldForm;
