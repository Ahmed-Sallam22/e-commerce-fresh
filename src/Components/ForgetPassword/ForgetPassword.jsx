import React from "react";
import styles from "./ForgetPassword.module.css";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ForgetPassword() {
  let validationSchema = Yup.object({
    email: Yup.string().required("email is required").email("email invalid"),
  });
  let nav = useNavigate();

  //variable for toast
  const notify = (mess, type) => {
    toast[type](mess);
  };

  let Navigate = useNavigate();
  const [isloading, setisloading] = useState(false);
  const [FalageData, setFalageData] = useState(false);
  const [messageErrors, setmessageErrors] = useState("");

  async function ForgetPassword(values) {
    //Call APi
    setisloading(true);
    await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      )
      .then((data) => {
        if (data.status === 200) {
          setisloading(false);
          setFalageData(true);
          notify("The code has been sent successfully", "success");
        }
      })
      .catch((errors) => {
        if (errors.response.status === 401) {
          setisloading(false);
          notify(errors.response.data.message, "error");
        }
      });
  }

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: ForgetPassword,
  });

  async function resetPassword(val) {
    //Call APi
    setisloading(true);
    await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, val)
      .then((data) => {
        if (data.status === 200) {
          setisloading(false);
          notify("Sucess", "success");
          nav("/ResetPassword");
        }
      })
      .catch((errors) => {
        if (errors.response.status === 400) {
          setisloading(false);
          notify(errors.response.data.message, "error");
        }
      });
  }

  let reset = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: (values) => {
      resetPassword(values);
    },
  });

  return (
    <>
      <Helmet>
        <title>Forget Password</title>
      </Helmet>

      <div className="w-75 mx-auto py-3">
        <h3>Forget Password</h3>
        {FalageData ? (
          <form onSubmit={reset.handleSubmit}>
            <label htmlFor="ResetCode">Verify ResetCode</label>
            <input
              onBlur={reset.handleBlur}
              onChange={reset.handleChange}
              type="text"
              className="form-control mb-2"
              name="resetCode"
              id="resetCode"
              value={reset.values.resetCode}
            />
            {reset.errors.resetCode && reset.touched.resetCode ? (
              <div className="alert alert-danger">{reset.errors.resetCode}</div>
            ) : null}

            {isloading ? (
              <button className="btn bg-main text-white">
                <i className="fa fa-spinner fa-spin"></i>
              </button>
            ) : (
              <button type="submit" className="btn bg-main text-white">
                Verify
              </button>
            )}
          </form>
        ) : (
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

            {isloading ? (
              <button className="btn bg-main text-white">
                <i className="fa fa-spinner fa-spin"></i>
              </button>
            ) : (
              <button type="submit" className="btn bg-main text-white">
                Send
              </button>
            )}
          </form>
        )}

        <div className="col-md-10 mx-auto mb-2">
          <p className="text-center text-muted my-3">
            {" "}
            <Link className="text-decoration-none text-dark-main" to={"/login"}>
              Back To Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
