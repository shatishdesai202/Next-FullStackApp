import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { getSession, signOut } from "next-auth/client";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const ChangePassword = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.push("/signin");
      } else {
        setLoading(false);
      }
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    onSubmit: async (values) => {
      const responce = await fetch("api/user/change-password", {
        method: "PATCH",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json;",
        },
      });
      if (responce.status === 403) {
        return toast.error("invalid password");
      }
      toast.success("password updated");
      await signOut();
      router.push("/signin");
      return;
    },
  });
  if (loading) {
    return <p>Loading....</p>;
  }
  return (
    <div className="m-5">
      <form onSubmit={formik.handleSubmit} className="flex justify-center">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-6/12">
          <div className="mb-4">
            <label
              className="block text-grey-darker text-sm font-bold mb-2 font-mono"
              for="username"
            >
              Old Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              type="password"
              placeholder="oldPassword"
              id="oldPassword"
              name="oldPassword"
              onChange={formik.handleChange}
              value={formik.values.oldPassword}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-grey-darker text-sm font-bold mb-2 font-mono"
              for="password"
            >
              New Password
            </label>
            <input
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
              type="password"
              placeholder="*******"
              id="newPassword"
              name="newPassword"
              onChange={formik.handleChange}
              value={formik.values.newPassword}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Update Password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
