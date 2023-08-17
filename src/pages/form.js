import Loader from "@/components/Loader";
import Layout from "@/layout";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { validation } from "../../lib/validate";
import { useRouter } from "next/router";

export default function Form() {
  const router = useRouter();
  const [isFormValid, setIsFormValid] = useState(false);
  const [pending, setPending] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      agreement: false, // Initialize the checkbox
    },
    validate: validation,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values) {
    setPending(true);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        toast.success("Submission Successful");
        setPending(false);

        // formik.setFieldValue("name", "");
        // formik.setFieldValue("email", "");
        // formik.setFieldValue("phone", "");
        setTimeout(() => {
          router.push("/success");
        }, 1000);
      } else {
        toast.error("Submission failed, please try again.git");
        setPending(false);
      }

      // console.log(res);
      // console.log(res.data);
      // console.log(res.data.tableRange);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setIsFormValid(formik.isValid);
  }, [formik.values, formik.errors, formik.isValid]);

  const getInputClassNames = (fieldName) =>
    `${
      formik.errors[fieldName] && formik.touched[fieldName]
        ? "border-error text-error w-full"
        : "w-full"
    }`;

  return (
    <Layout title="Waitlist Form">
      <div className="container mx-auto bg-ble-400 py-2">
        <div className="xs:w-2/3 mt-6 bg-slate500">
          <div>
            Fill out the form below so we can keep you in the loop about our
            upcoming launch. We&apos;ll make sure you&apos;re the first to know
            when we&apos;re ready to transform the way you get things done.
            Don&apos;t miss out
          </div>
          <form onSubmit={formik.handleSubmit} className="mt-6">
            <div className="flex flex-col mb-4">
              <label className="text-sm mb-2" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                className={getInputClassNames("name")}
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-error text-sm">{formik.errors.name}</div>
              )}
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-sm mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className={getInputClassNames("email")}
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-error text-sm">{formik.errors.email}</div>
              )}
            </div>
            <div className=" mb-6">
              <label className="text-sm mb-2" htmlFor="phone">
                Phone Number (preferably whatsapp)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone"
                className={getInputClassNames("phone")}
                {...formik.getFieldProps("phone")}
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="text-error text-sm">{formik.errors.phone}</div>
              )}
            </div>

            <div className="flex items-center mt-6 ">
              <div>
                <input
                  name="checkbox"
                  id="checkbox"
                  type="checkbox"
                  className={`h-[14px] w-[14px] rounded-md ${getInputClassNames(
                    "agreement"
                  )}`}
                  {...formik.getFieldProps("agreement")}
                />
              </div>
              <div className="text-[10px]  ml-2 text-primaryColor">
                <label htmlFor="checkbox">
                  I agree with the I agree to receive promotion and marketing
                  news from your newsletter.
                </label>
              </div>
            </div>
            {formik.touched.agreement && formik.errors.agreement && (
              <div className="text-error text-sm">
                {formik.errors.agreement}
              </div>
            )}
            <div className=" flex justify-center ">
              <button
                type="submit"
                className={`btn w-3/4  mt-6 flex justify-center text-white font-medium py-2 duration-300 px-4 rounded-lg  ${
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
      <ToastContainer />
    </Layout>
  );
}
