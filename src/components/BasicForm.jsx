import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

const BasicForm = () => {
  const initialValues = {
    name: "",
    email: "",
    channel: "",
  };
  const onSubmit = (values) => {
    alert(JSON.stringify(values, undefined, 2));
    formik.resetForm();
  };

  const validate = (values) => {
    // values.name values.email values.channel
    // errors.name errors.email errors.channel

    const errors = {};

    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.email) {
      errors.email = "Required";
    } else if (!/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi.test(values.email)) {
      errors.email = "Invalid email format";
    }
    if (!values.channel) {
      errors.channel = "Required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <div>
      <h1>Basic Form with Formik</h1>
      <Link to={"/"}>&larr; Back</Link>

      <form onSubmit={formik.handleSubmit} className="form">
        <div>
          <div className="input-group">
            <label htmlFor="name" className="input-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="input-field"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched?.name && formik.errors?.name ? (
            <div className="input-error">{formik.errors.name}</div>
          ) : null}
        </div>
        <div>
          <div className="input-group">
            <label htmlFor="email" className="input-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="input-field"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched?.email && formik.errors?.email ? (
            <div className="input-error">{formik.errors.email}</div>
          ) : null}
        </div>
        <div>
          <div className="input-group">
            <label htmlFor="channel" className="input-label">
              Channel
            </label>
            <input
              type="channel"
              id="channel"
              name="channel"
              className="input-field"
              onChange={formik.handleChange}
              value={formik.values.channel}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched?.channel && formik.errors?.channel ? (
            <div className="input-error">{formik.errors.channel}</div>
          ) : null}
        </div>

        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BasicForm;
