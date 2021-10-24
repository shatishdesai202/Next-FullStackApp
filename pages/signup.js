import React from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

// import * as Yup from "yup";

const signup = () => {
  const router = useRouter();
  //   const validationSchema = Yup.object().shape({
  //     password: Yup.string().required("This field is required"),
  //     confirm_password: Yup.string().oneOf(
  //       [Yup.ref("password"), null],
  //       "Passwords don't match"
  //     ),
  //   });
  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    // validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      if (values.password !== values.confirm_password) {
        return toast.error("Password mismatch!!");
      }
      const responce = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json;",
        },
      });

      if (responce.status === 422) {
        return toast.warning("user already exist");
      }

      if (responce.status === 201) {
        toast.success("User Created");
        resetForm();
        router.push("/signin");
      } else {
        toast.error("something went wrong");
      }
    },
  });
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col font-mono">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white text-center px-16 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4 "
              name="full_name"
              id="full_name"
              onChange={formik.handleChange}
              placeholder="Full Name"
              value={formik.values.full_name}
            />

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              id="email"
              onChange={formik.handleChange}
              placeholder="Email"
              value={formik.values.email}
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              id="password"
              onChange={formik.handleChange}
              placeholder="Password"
              value={formik.values.password}
            />
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="confirm_password"
              id="confirm_password"
              onChange={formik.handleChange}
              placeholder="Confirm Password"
              value={formik.values.confirm_password}
            />

            <button
              type="submit"
              className="w-full text-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Create Account
            </button>
          </form>
          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Terms of Service
            </a>{" "}
            and
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account?
          <a
            className="no-underline border-b border-blue text-blue"
            href="/signin"
          >
            Log in
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default signup;
