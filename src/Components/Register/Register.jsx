import React from "react";
import styles from "./Register.module.css";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet";

export default function Register() {
  //variable for toast
  const notify = (mess, type) => {
    toast[type](mess);
  };

  let Navigate = useNavigate();
  const [isloading, setisloading] = useState(false);
  const [messageErrors, setmessageErrors] = useState("");

  //Validation Form Register
  let validationSchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "minimum name is 3 letters")
      .max(20, "maximum name is 10 letters"),
    email: Yup.string().required("email is required").email("email invalid"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "password must have a Number , UperCase , LowerCase and not less than 8 "
      ),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "not matches"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}/, "phone must be Egyptian Number"),
  });

  //Definition of variable For Form
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handelRegesiter,
  });

  async function handelRegesiter(values) {
    //Call APi
    setisloading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then((data) => {
        if (data.data.message === "success") {
          setisloading(false);
          notify("success", "success");
          Navigate("/Login");
        }
      })
      .catch((errors) => {
        if (errors.response.status === 409) {
          notify(errors.response.data.message, "error");
          setisloading(false);
        }
      });
  }

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>

      <div className="w-75 mx-auto py-4">
        <h3>Register</h3>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            className="form-control mb-2"
            name="name"
            id="name"
            value={formik.values.name}
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger">{formik.errors.name}</div>
          ) : null}

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

          <label htmlFor="phone">Phone</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="tel"
            className="form-control mb-2"
            name="phone"
            id="phone"
            value={formik.values.phone}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger">{formik.errors.phone}</div>
          ) : null}

          {isloading ? (
            <button className="btn bg-main text-white">
              <i className="fa fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
              className="btn bg-main text-white"
            >
              Register
            </button>
          )}
        </form>

        <div className="col-md-10 mx-auto mb-2">
          <p className="text-center text-muted m-3">
            This site is protected by reCAPTCHA and the Google{" "}
            <a
              href="https://policies.google.com/privacy"
              className="text-decoration-none text-primary"
            >
              {" "}
              Privacy Policy{" "}
            </a>{" "}
            and{" "}
            <a
              href="https://policies.google.com/terms"
              className="text-decoration-none text-primary"
            >
              {" "}
              Terms of Service{" "}
            </a>{" "}
            apply.
          </p>
          <p className="text-center text-muted my-3">
            Already a member?
            <Link className="text-decoration-none text-dark-main" to={"/login"}>
              {" "}
              Login <i className="so fa-solid fa-chevron-right fa-xs"></i>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
