import Head from "next/head";
import Image from "next/image";
import React from "react";
import Logo from "../../public/stustle_logo.svg";
import Link from "next/link";

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? title + " | Stustle" : " Stustle"}</title>
        <meta name="description" content="Service Rendering Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/stustle_logo.svg" />
      </Head>
      <div className=" max-h-screen h-screen">
        <header className="bg-green300 px-4 bg-white mx-auto h-[6vh]  max-w-xl ">
          <div className="container mx-auto  bg-red300 h-full flex items-end">
            <Link href="/">
              <Image src={Logo} alt="Stustle" height={16} width={80} priority />
            </Link>
          </div>
        </header>
        <main className="px-4 max-h-[90vh] bg-slate900 mx-auto bg-white max-w-xl">
          {children}
        </main>
      </div>
    </>
  );
}
