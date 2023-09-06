/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { contact_message } from "../../lib/validate";
import Loader from "src/components/Loader.js";
import { toast } from "react-toastify";
import Layout from "@/layout";

export default function SendMail({ sheetdata }) {
  const [isFormValid, setIsFormValid] = useState(false);
  const [pending, setPending] = useState(false);
  //   const router = useRouter();

  console.log(sheetdata);

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validate: contact_message,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values) {
    console.log(values);
  }

  useEffect(() => {
    setIsFormValid(formik.isValid);
  }, [formik.values, formik.errors, formik.isValid]);

  const getInputClassNames = (fieldName) =>
    `${
      formik.errors[fieldName] && formik.touched[fieldName]
        ? "border-error text-error w-full"
        : "w-full border "
    }`;

  return (
    <Layout
      title="Mails"
      className="fixed z-[1100] w-screen top-0 bottom-0 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50 max-w-3xl "
    >
      <div className="bg-white w-80 rounded-lg p-6 dark:bg-[#00000080] dark:backdrop-blur-sm dark:text-white duration-500 relative">
        <div className="mt-6">
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col items-center  mb-6">
              <label className="text-sm mb-2" htmlFor="message">
                Write a message
              </label>
              <textarea
                id="message"
                name="message"
                type="text"
                placeholder=""
                maxLength={350}
                className={`${getInputClassNames("message")} py-1`}
                {...formik.getFieldProps("message")}
              />
              {formik.touched.message && formik.errors.message && (
                <div className="text-error text-sm">
                  {formik.errors.message}
                </div>
              )}
            </div>
            <div className=" flex justify-center ">
              <button
                type="submit"
                className={`btn--medium w-full  mt-2 flex justify-center text-white font-medium py-2 duration-300 px-4 rounded-lg  ${
                  isFormValid
                    ? `${pending ? "bg-disabledPrimary" : "bg-primaryColor"}`
                    : "bg-disabledPrimary cursor-not-allowed"
                } `}
                disabled={!isFormValid || pending}
              >
                {pending ? <Loader /> : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

// export async function getServerSideProps() {
//   const req = await fetch("http://localhost:3001/api/sheet");
//   const res = await req.json();

//   return {
//     props: {
//       sheetdata: res.data,
//     },
//   };
// }

export async function getServerSideProps() {
  try {
    // const req = await fetch("http://localhost:3001/api/sheet");
    const req = await fetch("https://www.stustle.com/api/sheet");

    if (!req.ok) {
      throw new Error("Failed to fetch data");
    }

    const res = await req.json();

    return {
      props: {
        sheetdata: res,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        sheetdata: [], // Provide a default value or handle the error accordingly
      },
    };
  }
}
