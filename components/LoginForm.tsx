"use client";
import Swal from "sweetalert2";
import { Formik, Form, Field, ErrorMessage, FormikHelpers  } from "formik";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/auth/authSlice";
import { AppDispatch } from "@/redux/userStore";

type LoginFormValues = {
    email: string;
    password: string;
}

const LoginForm  = () => {
    const dispatch = useDispatch<AppDispatch>()


    const validate = (values: LoginFormValues) => {
        const errors: Partial<Record<keyof LoginFormValues, string>> = {};
        if (!values.email) {
            errors.email = 'Required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            errors.email = "Invalid email address";
        }
        if (!values.password) {
            errors.password = 'Required'
        }
        return errors;
    }

    const initialValues: LoginFormValues = {
        password: '',
        email: '',
    }

    async function handleSubmit (values: LoginFormValues, {setSubmitting, setErrors}: FormikHelpers<LoginFormValues>) {
        try {
            const response = await fetch('api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password

                })
            })
            const result = await response.json()
            
            if (!response.ok) {
                if (result.error.includes('Invalid email')) {
                    setErrors({ email: "Email not registered" });
                } else if (result.error.includes("Invalid password")) {
                    setErrors({ password: "Incorrect Password" });
                } else {
                Swal.fire('Error', result.error, 'error')
        }
        
        return;
      }
        dispatch(
            setUser({
                user: {
                    id: result.user.id,
                    first_name: result.user.first_name,
                    second_name: result.user.second_name,
                    email: result.user.email,
                    phone: result.user.phone,
                    role: result.user.user_metadata?.role || "",
                },
                session: result.data.session
            })
        )
        localStorage.setItem("user", JSON.stringify(result.user));
        Swal.fire({
            title: "Good Job",
            text: "Login successful!",
            icon: "success",
        });

        } catch (error) {
            console.log(error, "login failed");

            Swal.fire({
                title: "Error",
                text: "Something went wrong",
                icon: "error",
            });

        } finally {
            setSubmitting(false);
        }
        

    }
    return (
        <div className="flex-column items-center justify-center pt-8 px-4 sm:px-6 lg:px-8">
            <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl pb-6">
                Login to continue
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
                    }) =>(
                        <Form className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-transparent" onSubmit={handleSubmit}>
                            <div className="flex flex-col pb-4">
                                <label className="text-xs text-neutral-900 pb-1"
                                    htmlFor="email"
                                >
                                    EMAIL
                                </label>
                                <Field
                                    type='email'
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name='email'
                                    className="bg-white border-none outline-none rounded-sm pt-1"
                                />
                                <ErrorMessage
                                    name="email"
                                    render={(msg) => <div className="text-red-500 text-xs">{msg}</div>}
                                    />

                            </div>
                            <div className="flex flex-col pb-4">
                                <label className="text-xs text-neutral-900 pb-1"
                                    htmlFor="password"
                                >
                                    PASSWORD
                                </label>
                                <Field
                                    type='password'
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name='password'
                                     className="bg-white border-none outline-none rounded-sm pt-1"
                                />
                                <ErrorMessage
                                    name="password"
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
    )



}
export default LoginForm;