import React from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { signIn } from "next-auth/client";

const Signin = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const isUserLogin = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (!isUserLogin.error) {
        toast.success("success");
        router.push("/");
      } else {
        toast.error(isUserLogin.error);
      }
    },
  });

  return (
    <div className="m-5">
      <form onSubmit={formik.handleSubmit} className="flex justify-center">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-6/12 ">
          <div className="mb-4">
            <label
              className="block text-grey-darker text-sm font-bold mb-2 font-mono"
              for="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              type="text"
              placeholder="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-grey-darker text-sm font-bold mb-2 font-mono"
              for="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
              type="password"
              placeholder="********"
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Sign In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signin;
