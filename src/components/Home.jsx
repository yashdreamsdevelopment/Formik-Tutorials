import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Formik Example</h1>

      <div>
        <Link to={"/basic"} className="button">
          Basic
        </Link>
        <Link to={"/yup-validation"} className="button">
          With Yup
        </Link>
        <Link to={"/advanced"} className="button">
          Advanced
        </Link>
        <Link to={"/fastfield"} className="button">
          FastField
        </Link>
      </div>
    </div>
  );
};

export default Home;
