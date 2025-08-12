"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import { FormikHelpers } from "formik";
import Swal from "sweetalert2";

type RegisterFormValues = {
  first_name: string;
  second_name: string;
  email: string;
  password: string;
  confirm_password: string;
  phone: string;
};

const RegisterForm = () => {
  // const [formData, setFormData] = useState({
  //     first_name: '',
  //     second_name: '',
  //     email: '',
  //     password: '',
  //     confirm_password: '',
  //     phone: '',
  // })

  const validate = (values: RegisterFormValues) => {
    const errors: Partial<Record<keyof RegisterFormValues, string>> = {};
    if (!values.first_name) {
      errors.first_name = "Required";
    } else if (values.first_name.length > 15) {
      errors.first_name = "Must be 15 characters or less";
    }

    if (!values.second_name) {
      errors.second_name = "Required";
    } else if (values.second_name.length > 20) {
      errors.second_name = "Must be 20 characters or less";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (!/^.{8,}$/.test(values.password)) {
      errors.password = "Password Must be 8 characters";
    }

    if (!values.confirm_password) {
      errors.confirm_password = "Required";
    } else if (values.password !== values.confirm_password) {
      errors.confirm_password = "Password Must match";
    }

    if (!values.phone) {
      errors.phone = "Required";
    } else if (!/^\d{10}$/.test(values.phone)) {
      errors.phone = "phone must be 10 digits";
    }
    return errors;
  };

  const initialValues: RegisterFormValues = {
    first_name: "",
    second_name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
  };

  async function handleSubmit(
    values: RegisterFormValues,
    { setSubmitting, resetForm }: FormikHelpers<RegisterFormValues>
  ) {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: values.first_name,
          second_name: values.second_name,
          email: values.email,
          password: values.password,
          confirm_password: values.confirm_password,
          phone: values.phone,
        }),
      });

      const result = await response.json();
      resetForm();

      if (!response.ok) {
        Swal.fire({
          title: "Error",
          text: result.error || "Registration failed",
          icon: "error",
        });
        return;
      }
      Swal.fire({
        title: "Success",
        text: "Registration successful!",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
          title: "Error",
          text: "Registration failed",
          icon: "error",
      });
      console.log("Error registering user", error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex-column items-center justify-center pt-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl pb-6">
        Register to continue
      </h1>
      <div className="flex items-center justify-center">
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-transparent" onSubmit={handleSubmit}>
              <div className="flex flex-col pb-4">
                <label
                  className="text-xs text-neutral-900 pb-1"
                  htmlFor="first_name"
                >
                  FIRST NAME
                </label>
                <Field
                  className="bg-white border-none outline-none rounded-sm pt-1"
                  value={values.first_name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  name="first_name"
                />
               <ErrorMessage
                    name="first_name"
                    render={(msg) => <div className="text-red-500 text-xs">{msg}</div>}
                />
              </div>
              <div className="flex flex-col pb-4">
                <label
                  className="text-xs text-neutral-900 pb-1"
                  htmlFor="second_name"
                >
                  SECOND NAME
                </label>
                <Field
                  className="bg-white border-none outline-none rounded-sm pt-1"
                  type="text"
                  name="second_name"
                />
                <ErrorMessage
                    name="second_name"
                    render={(msg) => <div className="text-red-500 text-xs">{msg}</div>}
                />
              </div>
              <div className="flex flex-col pb-4">
                <label
                  className="text-xs text-neutral-900 pb-1"
                  htmlFor="email"
                >
                  EMAIL
                </label>
                <Field
                  className="bg-white border-none outline-none rounded-sm pt-1"
                  type="email"
                  name="email"
                />
                <ErrorMessage
                    name="email"
                    render={(msg) => <div className="text-red-500 text-xs">{msg}</div>}
                />
              </div>
              <div className="flex flex-col pb-4">
                <label
                  className="text-xs text-neutral-900 pb-1"
                  htmlFor="password"
                >
                  PASSWORD
                </label>
                <Field
                  className="bg-white border-none outline-none rounded-sm pt-1"
                  type="password"
                  name="password"
                />
                <ErrorMessage
                    name="password"
                    render={(msg) => <div className="text-red-500 text-xs">{msg}</div>}
                />
              </div>
              <div className="flex flex-col pb-4">
                <label
                  className="text-xs text-neutral-900 pb-1"
                  htmlFor="confirm_password"
                >
                  CONFIRM PASSWORD
                </label>
                <Field
                  className="bg-white border-none outline-none rounded-sm pt-1"
                  type="pasword"
                  name="confirm_password"
                />
                <ErrorMessage
                    name="confirm_password"
                    render={(msg) => <div className="text-red-500 text-xs">{msg}</div>}
                />
              </div>
              <div className="flex flex-col pb-4">
                <label
                  className="text-xs text-neutral-900 pb-1"
                  htmlFor="phone"
                >
                  PHONE NO.
                </label>
                <Field
                  className="bg-white border-none outline-none rounded-sm pt-1"
                  type="text"
                  name="phone"
                />
                <ErrorMessage
                    name="phone"
                    render={(msg) => <div className="text-red-500 text-xs">{msg}</div>}
                />
              </div>
              <button type='submit' className="bg-black text-white pt-2 pb-2 pl-8 pr-8 rounded-sm mt-4 hover:bg-white hover:text-black duration-300 delay-200">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
