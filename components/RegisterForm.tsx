import React, { useState } from 'react'
import { useFormik } from 'formik';
import { FormikHelpers } from 'formik';

type RegisterFormValues = {
    first_name: string;
    second_name: string;
    email: string;
    password: string;
    confirm_password: string;
    phone: string;
}
 

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        second_name: '',
        email: '',
        password: '',
        confirm_password: '',
        phone: '',
    })

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

            if (!response.ok) (
                alert(result.error)
            )

        } catch (error) {
            console.log('Error registering user', error)

        } finally {
            setSubmitting(false)
        }
    }

    

  return (
    <div>

    </div>
  )
}

export default RegisterForm