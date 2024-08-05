import React, { useEffect,useState } from "react";

import Footer from "../../components/footer";
import Switcher from "../../components/switcher";
import Link from "next/link";
import Head from "next/head";
import Navbar from "../../components/navbar";
export default function Submit() {
  useEffect(() => {
    document.documentElement.setAttribute("dir", "ltr");
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
  }, []);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    contactAddress: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/saveFormData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Form submitted successfully:', data);
        // Handle success (e.g., show a message, clear the form, etc.)
      } else {
        console.error('Error submitting form:', response.statusText);
        // Handle error (e.g., show an error message)
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <>

      <Head>

        <link rel="icon" href="/favicon.ico" />

        <meta name="description" content="Codebolt is a next-gen Code Editor, designed with an AI Agents-first approach. It natively supports AI Code Generation Workflows and can run multiple AI agents tailored to specific coding languages or tasks." />

        <meta name="keywords" content="Code Editor, AI Code Generation, AI Agents, Codebolt, Programming, Software Development" />

        <meta name="author" content="Codebolt Team" />

        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="Codebolt - AI-Centric Code Editor" />

        <meta property="og:description" content="Codebolt is a next-gen Code Editor, designed with an AI Agents-first approach. It natively supports AI Code Generation Workflows and can run multiple AI agents tailored to specific coding languages or tasks." />

        <meta property="og:image" content="/public/images/classic02.png" />

        <meta property="og:url" content="https://www.codebolt.com" />

        <meta property="og:type" content="website" />

        <link rel="icon" href="/favicon.ico" />

      </Head>
      <Navbar activePage="form" />
      <section className="relative md:pt-20 pt-32 pb-6 bg-gradient-to-b from-amber-400/20 dark:from-amber-400/40 to-transparent">
        <div className="container relative">
          <div className="grid grid-cols-1 text-center mt-4">
            <div>
              <h5 className="md:text-3xl  text-2xl md:leading-normal leading-normal tracking-wider font-semibold mb-0">
                Request Form For the Application
              </h5>
            </div>

            {/* <ul className="tracking-[0.5px] mb-0 inline-block mt-5"> */}
              {/* <li className="inline-block capitalize font-medium duration-500 ease-in-out hover:text-amber-400">
                <Link href="/">CodeBolt</Link>
              </li> */}
              {/* <li className="inline-block text-base mx-0.5 ltr:rotate-0 rtl:rotate-180">
                <i className="mdi mdi-chevron-right"></i>
              </li>
              <li className="inline-block capitalize font-medium duration-500 ease-in-out text-amber-400" aria-current="page">
                Request Form
              </li> */}
            {/* </ul> */}
          </div>
        </div>
      </section>
      <section className="relative md:py-5 mb-10">
        <div className="container relative">
          <div className="md:flex justify-center">
            <div className="md:w-3/4">
              {/* <div className="p-2 bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 rounded-md"> */}


                <form onSubmit={handleSubmit}  className="max-w-md mx-auto  p-4 shadow-md rounded-lg text-gray-700">
                  <div className="mb-4">
                    <label htmlFor="firstName" className="block text-xs font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className=" t mt-1 p-2 w-full border rounded-md"
                      required
                      placeholder="Your First Name"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="lastName" className="block text-xs font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className=" t mt-1 p-2 w-full border rounded-md text-gray-700"
                      required
                      placeholder="Your Last Name"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="block text-xs font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="t mt-1 p-2 w-full border rounded-md text-gray-700"
                      required
                      placeholder="Your Email"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="address" className="block text-xs font-medium text-gray-700">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="t mt-1 p-2 w-full border rounded-md text-gray-700"
                      required
                      placeholder="Your Address"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="contactNumber" className="block text-xs font-medium text-gray-700">Contact Number</label>
                    <input
                      type="text"
                      id="contactAddress"
                      name="contactAddress"
                      value={formData.contactAddress}
                      onChange={handleChange}
                      className=" t mt-1 p-2 w-full border rounded-md text-gray-700"
                      required
                      placeholder="Your Contact Address"
                    />
                  </div>





                  <div className="mt-8">
                    <button
                      type="submit"
                      className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded-md"
                    >
                      Submit
                    </button>
                  </div>
                  </form>
              {/* </div> */}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Switcher />
    </>
  );
}
