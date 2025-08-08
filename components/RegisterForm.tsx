"use client"

import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import { FormikHelpers } from 'formik';
import Swal from 'sweetalert2';


type RegisterFormValues = {
    first_name: string;
    second_name: string;
    email: string;
    password: string;
    confirm_password: string;
    phone: string;
}
 

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
        const errors: Partial<Record<keyof RegisterFormValues, string>>= {}; 
        if (!values.first_name) {
            errors.first_name = 'Required';
        } else if (values.first_name.length > 15) {
            errors.first_name = 'Must be 15 characters or less';
        }

        if (!values.second_name) {
            errors.second_name = 'Required';
        } else if (values.second_name.length > 20) {
            errors.second_name = 'Must be 20 characters or less';
        }

        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        if (!values.password) {
            errors.password = 'Required'
        } else if (!/^.{8,}$/.test(values.password)) {
            errors.password = 'Password Must be 8 characters'
        }

         if (!values.confirm_password) {
            errors.confirm_password = 'Required'
        } else if (values.password !== values.confirm_password) {
            errors.confirm_password = 'Password Must match'
        }

        if (!values.phone) {
            errors.phone = 'Required'
        } else if (!/^\d{10}$/.test(values.phone)) {
            errors.phone = 'phone must be 10 digits'
        }
        return errors
    }

      const initialValues : RegisterFormValues = {
        first_name: "",
        second_name: "",
        email: "",
        password: "",
        confirm_password: "",
        phone: "",
    };


    async function handleSubmit (values: RegisterFormValues, {setSubmitting, resetForm}: FormikHelpers<RegisterFormValues>) {
    
        try {
            const response = await fetch('/api/register/routes', {
                method: 'POST',
                headers : {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                   first_name: values.first_name,
                   second_name: values.second_name,
                   email: values.email,
                   password: values.password,
                   confirm_password: values.confirm_password,
                   phone: values.phone

                }),
            })

            const result = await response.json();
            resetForm()

            if (!response.ok) {
                Swal.fire({
                    title: 'Error',
                    text: result.error || 'Registration failed',
                    icon: 'error'
                })
                return
            }
            Swal.fire({
                title: 'Success',
                text: 'Registration successful!',
                icon: 'success',
                });

        } catch (error) {
            console.log('Error registering user', error)

        } finally {
            setSubmitting(false)
        }
    }

    

  return (
    <div className='flex-column items-center justify-center'>
        <h1>Register to continue</h1>
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

            })=> (
                <Form>
                    <div>
                        <label htmlFor="first_name">First Name</label>
                        <Field type="text" name="first_name" />
                        <ErrorMessage name="first_name" component="div" />
                    </div>
                    <div>
                        <label htmlFor="second_name">Second Name</label>
                        <Field type="text" name="second_name" />
                        <ErrorMessage name="second_name" component="div" />
                    </div>
                    <div>
                        <label htmlFor="email">email</label>
                        <Field type="email" name="email" />
                        <ErrorMessage name="email" component="div" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <Field type="password" name="password" />
                        <ErrorMessage name="password" component="div" />
                    </div>
                    <div>
                        <label htmlFor="confirm_password">Confirm Password</label>
                        <Field type="pasword" name="confirm_password" />
                        <ErrorMessage name="confirm_password" component="div" />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone No.</label>
                        <Field type="text" name="phone" />
                        <ErrorMessage name="phone" component="div" />
                    </div>
                    <button>Submit</button>
                </Form>

            )}

        </Formik>

    </div>
  )
}

export default RegisterForm