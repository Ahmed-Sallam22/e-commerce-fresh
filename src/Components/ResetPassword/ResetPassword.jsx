import React from "react";
import styles from "./ResetPassword.module.css";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet";

export default function ResetPassword(props) {
  console.log(props);
  //     return <>
  //         <div>ResetPassword</div>
  //     </>
  // }

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
    newPassword: Yup.string()
      .required("password is required")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "password must have a Number , UperCase , LowerCase and not less than 8 "
      ),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("newPassword")], "not matches"),
  });

  //Definition of variable For Form
  let formik = useFormik({
    initialValues: {
      email: '',
      newPassword: "",
    },
    validationSchema,
    onSubmit: handelLogin,
  });

  async function handelLogin(values) {
    //Call APi
    setisloading(true);
    await axios
      .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
      .then((data) => {
        if (data.status === 200) {
          setisloading(false);
          notify("success", "success");
          Navigate("/login");
        }
      })
      .catch((errors) => {
        if (errors.response.status === 400) {
          setisloading(false);
          notify(errors.response.data.message, "error");
        }
      });
  }

  return (
    <>
      <Helmet>
        <title>Reset New Password</title>
      </Helmet>

      <div className="w-75 mx-auto py-4">
        <h3>Reset Password</h3>
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
          <label htmlFor="newPassword">New Password</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            className="form-control mb-2"
            name="newPassword"
            id="newPassword"
            value={formik.values.newPassword}
          />
          {formik.errors.newPassword && formik.touched.newPassword ? (
            <div className="alert alert-danger">
              {formik.errors.newPassword}
            </div>
          ) : null}
          <label htmlFor="rePassword">Repassword</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            className="form-control mb-2"
            name="rePassword"
            id="rePassword"
            value={formik.values.rePassword}
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger">{formik.errors.rePassword}</div>
          ) : null}
          {isloading ? (
            <button className="btn bg-main text-white">
              <i className="fa fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button type="submit" className="btn bg-main text-white">
              Confirm
            </button>
          )}
        </form>
      </div>
    </>
  );
}
