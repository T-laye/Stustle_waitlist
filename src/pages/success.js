import Layout from "@/layout";
import Image from "next/image";
import React from "react";
import hour from "public/hourGlass.png";
import Link from "next/link";

export default function Success() {
  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Stustle Link",
          url: `https://stustle-waitlist.vercel.app/`, // Replace with your site's URL
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback behavior if `navigator.share()` is not available
      try {
        await navigator.clipboard.writeText(
          `https://stustle-waitlist.vercel.app/`
        ); // Replace with your site's URL
        alert("Link copied to clipboard!");
      } catch (error) {
        console.error("Error copying to clipboard:", error);
      }
    }
  };
  return (
    <Layout>
      <div>
        <h2 className="text-center text-3xl font-medium mt-10">
          Congratulations
        </h2>
        <div>
          <p className="text-center text-2xl mt-4">
            You have successfully joined our waitlist
          </p>
        </div>
        {/* <div>
          <Image src={hour} alt="hour glass" />
        </div> */}
        <div className="w-72 rounded-lg overflow-hidden max-h-72 h-72  mx-auto cursor-pointer">
          <Image
            src={hour}
            width={100}
            height={100}
            alt="hour glass"
            className="object-center h-full w-full object-cover rounded-md"
          />
        </div>
        <div>
          <p className="text-center text-base ">
            You would be the first to be notified when the App launches.
          </p>
        </div>
        <div className=" flex justify-center ">
          <button
            onClick={shareLink}
            type="submit"
            className="btn w-40 max-[300px]:w py-4 font-normal  mt-6 flex justify-center bg-primaryColor text-white "
          >
            Invite Others
          </button>
        </div>
        <div className="text-center text-base mt-4 ">
          <Link href="/form" className="hover:underline">
            Go back
          </Link>
        </div>
      </div>
    </Layout>
  );
}
