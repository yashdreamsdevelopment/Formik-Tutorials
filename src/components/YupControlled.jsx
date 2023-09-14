import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

const YupControlled = () => {
  const initialValues = {
    name: "",
    email: "",
    channel: "",
  };

  const onSubmit = (values) => {
    alert(JSON.stringify(values, undefined, 2));
    formik.handleReset();
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Not a valid email")
      .required("Email is required"),
    channel: Yup.string().required("Channel name is required"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div>
      <h1>Form with Formik + YUP </h1>
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

export default YupControlled;
