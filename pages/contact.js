import React from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const contact = ({ initialMessageCount }) => {
  const { data, error } = useSWR("/api/contact", fetcher, {
    fallbackData: initialMessageCount,
    revalidateIfStale: true,
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const responce = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json;",
        },
      });

      if (responce.status === 201) {
        toast.success("message sent");

        resetForm();
      } else {
        toast.error("something went wrong");
      }
    },
  });

  return (
    <div className="m-40 bg-white p-20 ">
      <form onSubmit={formik.handleSubmit}>
        <span className="flex justify-center font-mono">
          Total Messages[using SWR-revalidateIfStale]: {data}
        </span>
        <div className="flex justify-center items-center">
          <div action="#" className="w-full md:w-3/4 lg:w-3/6 p-4">
            <div className="p-3">
              <input
                className="block appearance-none placeholder-gray-500 placeholder-opacity-100 border border-light-blue-400 rounded-md w-full py-3 px-4 text-gray-700 leading-5 focus:outline-none focus:ring-2 focus:ring-light-blue-300"
                type="text"
                placeholder="Name"
                name="name"
                id="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                required
              />
            </div>
            <div className="p-3">
              <input
                className="block appearance-none placeholder-gray-500 placeholder-opacity-100 border border-light-blue-400 rounded-md w-full py-3 px-4 text-gray-700 leading-5 focus:outline-none focus:ring-2 focus:ring-light-blue-300"
                type="email"
                placeholder="Email Id"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                required
              />
            </div>
            <div className="p-3">
              <input
                className="block appearance-none placeholder-gray-500 placeholder-opacity-100 border border-light-blue-400 rounded-md w-full py-3 px-4 text-gray-700 leading-5 focus:outline-none focus:ring-2 focus:ring-light-blue-300"
                type="number"
                placeholder="Mobile Number"
                name="phoneNumber"
                id="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                required
              />
            </div>
            <div className="p-3">
              <textarea
                className="resize-none border rounded-md block appearance-none placeholder-gray-500 placeholder-opacity-100 border border-light-blue-400 rounded-md w-full py-3 px-4 text-gray-700 leading-5 focus:outline-none focus:ring-2 focus:ring-light-blue-300 h-56"
                placeholder="Message"
                type="text"
                name="message"
                id="message"
                value={formik.values.message}
                onChange={formik.handleChange}
                required
              />
            </div>
            <div className="p-3 pt-4">
              <button
                // type="submit"
                className="w-full bg-gray-700 hover:bg-gray-900 text-white font-bold py-3 px-4 rounded text-2xl"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default contact;

export async function getStaticProps(context) {
  const messageData = await fetch("http://localhost:3000/api/contact");
  const messageJson = await messageData.json();

  return {
    props: { initialMessageCount: messageJson, revalidate: 1 }, // will be passed to the page component as props
  };
}
