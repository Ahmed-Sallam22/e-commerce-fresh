import React from "react";
import styles from "./Login.module.css";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet";
import ForgetPassword from "../ForgetPassword/ForgetPassword";

export default function Login({ saveUserData }) {
  //variable for toast
  const notify = (mess, type) => {
    toast[type](mess);
  };

  let Navigate = useNavigate();
  const [isloading, setisloading] = useState(false);
  const [messageErrors, setmessageErrors] = useState("");

  //Validation Form Register
  let validationSchema = Yup.object({
    email: Yup.string().required("email is required").email("email invalid"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "password must have a Number , UperCase , LowerCase and not less than 8 "
      ),
  });

  //Definition of variable For Form
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handelLogin,
  });

  async function handelLogin(values) {
    //Call APi
    setisloading(true);
    await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((data) => {
        if (data.status === 200) {
          setisloading(false);
          localStorage.setItem("userToken", data.data.token);
          saveUserData();
          notify("success", "success");
          Navigate("/");
        }
      })
      .catch((errors) => {
        if (errors.response.status === 401) {
          setisloading(false);
          notify(errors.response.data.message, "error");
        }
      });
  }

  function Forget() {
    notify("now", "success");
  }

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <div className="w-75 mx-auto py-4">
        <h3>Login Now</h3>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            className="form-control mb-2"
            name="email"
            id="email"
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger">{formik.errors.email}</div>
          ) : null}

          <label htmlFor="password">Password</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            className="form-control mb-2"
            name="password"
            id="password"
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger">{formik.errors.password}</div>
          ) : null}
          {isloading ? (
            <button className="btn bg-main text-white">
              <i className="fa fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button type="submit" className="btn bg-main text-white">
              Login
            </button>
          )}
        </form>

        <div className="col-md-10 mx-auto mb-2">
          <p className="text-center text-muted my-3">
            {" "}
            <Link
              className="text-decoration-none text-dark-main"
              to={"/ForgetPassword"}
            >
              Forget Password
            </Link>
          </p>
          <p className="text-center text-muted my-3">
            Don't have an account?
            <Link
              className="text-decoration-none text-dark-main"
              to={"/register"}
            >
              {" "}
              Register<i className="so fa-solid fa-chevron-right fa-xs"></i>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
