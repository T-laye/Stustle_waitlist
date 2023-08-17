import Button from "@/components/Button";
import Layout from "@/layout";
import Image from "next/image";
import hour from "public/hourGlass.svg";
import phone from "public/phoneMock.svg";

export default function Home() {
  return (
    <Layout>
      <div className="container mx-auto bg-slate0 min-h-[80vh] pb-10 flex flex-col items-center ">
        <h1 className="text-4xl font-medium mt-14 text-center">
          <span className="text-primaryColor">Stustle</span> App is launching
          soon!
        </h1>
        <div className="h-52 my-4 flex items-center">
          <div className="bg-primaryColor rounded-full flex items-center justify-center h-40 w-40 myShadow">
            <div className="w-52 rounded-lg  max-h-52 h-52   mx-auto ">
              <Image
                src={phone}
                width={100}
                height={100}
                alt="hour glass"
                className="object-center h-full w-full object-contain rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="text-center">
          Seemlessly connect to service providers at your fingertips. Are you
          seeking for a job or need to showcase your expertise?
        </div>
        <div className="w-full mt-10">
          <Button />
        </div>
      </div>
    </Layout>
  );
}
