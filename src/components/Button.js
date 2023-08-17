import { useRouter } from "next/router";
import React from "react";

export default function Button() {
  const router = useRouter();

  const goToForm = () => {
    router.push("/form");
  };

  return (
    <div className="w-full flex justify-center">
      <button
        onClick={goToForm}
        className="btn bg-primaryColor max-[290px]:w-full w-2/3"
      >
        Join the waitlist
      </button>
    </div>
  );
}
