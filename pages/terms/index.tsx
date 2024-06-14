import React, { useEffect } from "react";

import Footer from "../../components/footer";
import Switcher from "../../components/switcher";
import Link from "next/link";
import Head from "next/head";
import Navbar from "../../components/navbar";

export default function Terms() {
  useEffect(() => {
    document.documentElement.setAttribute("dir", "ltr");
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
  }, []);

  return (
    <>
    <Navbar activePage="terms"/>
      <section className="relative md:pt-44 pt-32 pb-8 bg-gradient-to-b from-amber-400/20 dark:from-amber-400/40 to-transparent">
        <div className="container relative">
          <div className="grid grid-cols-1 text-center mt-6">
            <div>
              <h5 className="md:text-4xl text-3xl md:leading-normal leading-normal tracking-wider font-semibold mb-0">
                Terms of Services
              </h5>
            </div>

            <ul className="tracking-[0.5px] mb-0 inline-block mt-5">
              <li className="inline-block capitalize text-[15px] font-medium duration-500 ease-in-out hover:text-amber-400">
                <Link href="/">CodeBolt</Link>
              </li>
              <li className="inline-block text-base mx-0.5 ltr:rotate-0 rtl:rotate-180">
                <i className="mdi mdi-chevron-right"></i>
              </li>
              <li
                className="inline-block capitalize text-[15px] font-medium duration-500 ease-in-out text-amber-400"
                aria-current="page"
              >
                Terms
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="relative md:py-24 py-16">
        <div className="container relative">
          <div className="md:flex justify-center">
            <div className="md:w-3/4">
              <div className="p-6 bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 rounded-md">
                <h5 className="text-xl font-semibold mb-4">Introduction :</h5>
                <p className="text-slate-400">
                  Welcome to CodeBolt! These Terms of Service Terms govern
                  your use of the CodeBolt Editor software and any related
                  services provided by us. By using CodeBolt, you agree to these
                  Terms. Please read them carefully.
                </p>

                <h5 className="text-xl font-semibold mb-4 mt-8">
                  1. Use of CodeBolt
                </h5>
                <p className="text-slate-400">
                  1.1. License: We grant you a limited, non-exclusive,
                  non-transferable license to use the CodeBolt Editor for your
                  personal or internal business purposes.
                </p>
                <p className="text-slate-400 mt-2">
                  1.2. Restrictions: You may not:{" "}
                </p>
                <ul className="text-slate-400">
                  <li>
                    - Modify, adapt, or hack the CodeBolt Editor or modify
                    another website so as to falsely imply that it is associated
                    with CodeBolt.
                  </li>
                  <li>
                    - Reproduce, duplicate, copy, sell, resell, or exploit any
                    portion of the CodeBolt Editor without our express written
                    permission.
                  </li>
                  <li>
                    - Use the CodeBolt Editor for any illegal or unauthorized
                    purpose.
                  </li>
                </ul>

                <h5 className="text-xl font-semibold mb-4 mt-8">
                  2. User Accounts
                </h5>

                <ul className="list-none text-slate-400 mt-3">
                  <li className="flex mt-2">
                    2.1. Registration: To access and use certain features of the
                    CodeBolt Editor, you may be required to register for an
                    account. You agree to provide accurate, current, and
                    complete information during the registration process.
                  </li>
                  <li className="flex mt-2">
                    2.2. Security: You are responsible for maintaining the
                    security of your account and password. CodeBolt cannot and
                    will not be liable for any loss or damage from your failure
                    to comply with this security obligation.
                  </li>
                </ul>
                <h5 className="text-xl font-semibold mb-4 mt-8">3. Privacy</h5>

                <ul className="list-none text-slate-400 mt-3">
                  <li className="flex mt-2">
                    3.1. Data Collection: By using CodeBolt, you consent to the
                    collection and use of your information as outlined in our
                    Privacy Policy.
                  </li>
                </ul>
                <h5 className="text-xl font-semibold mb-4 mt-8">
                  4. Intellectual Property
                </h5>

                <ul className="list-none text-slate-400 mt-3">
                  <li className="flex mt-2">
                    4.1. Ownership: CodeBolt retains all rights, title, and
                    interest in and to the CodeBolt Editor, including all
                    related intellectual property rights.{" "}
                  </li>
                  <li className="flex mt-2">
                    4.2. Feedback: If you provide CodeBolt with any feedback or
                    suggestions regarding the CodeBolt Editor, you hereby assign
                    to CodeBolt all rights in such feedback and agree that
                    CodeBolt shall have the right to use and fully exploit such
                    feedback.
                  </li>
                </ul>
                <h5 className="text-xl font-semibold mb-4 mt-8">
                  5. Termination
                </h5>

                <ul className="list-none text-slate-400 mt-3">
                  <li className="flex mt-2">
                    5.1. Termination by CodeBolt: We may terminate or suspend
                    your access to the CodeBolt Editor at any time, without
                    notice, for any reason, including if we believe that you
                    have violated these Terms.
                  </li>
                  <li className="flex mt-2">
                    5.2. Termination by You: You may terminate your account at
                    any time by contacting us or using the account settings in
                    the CodeBolt Editor.
                  </li>
                </ul>
                <h5 className="text-xl font-semibold mb-4 mt-8">
                  6. Disclaimer of Warranties
                </h5>

                <ul className="list-none text-slate-400 mt-3">
                  <li className="flex mt-2">
                    6.1. No Warranty: The CodeBolt Editor is provided as is
                    and as available without any warranties of any kind,
                    express or implied.
                  </li>
                </ul>
                <h5 className="text-xl font-semibold mb-4 mt-8">
                  7. Limitation of Liability
                </h5>

                <ul className="list-none text-slate-400 mt-3">
                  <li className="flex mt-2">
                    7.1. Limitation: In no event shall CodeBolt, its officers,
                    directors, employees, or agents, be liable to you for any
                    direct, indirect, incidental, special, punitive, or
                    consequential damages whatsoever resulting from any:{" "}
                  </li>
                  <li>(a) Errors, mistakes, or inaccuracies of content.</li>
                  <li>
                    (b) Personal injury or property damage, of any nature
                    whatsoever, resulting from your access to and use of the
                    CodeBolt Editor.
                  </li>
                  <li>
                    (c) Any unauthorized access to or use of our secure servers
                    and/or any personal information stored therein.
                  </li>
                </ul>

                {/* <h5 className="text-xl font-semibold mt-8">
                  Users Question & Answer :
                </h5> */}

                {/* <div className="mt-6">
                  {accordianData.map((item, index) => {
                    return (
                      <div
                        className="relative shadow dark:shadow-gray-800 rounded-md overflow-hidden mt-4"
                        key={index}
                      >
                        <h2 className="text-base font-semibold">
                          <button
                            type="button"
                            onClick={() => setActiveIndex(item.id)}
                            className={`${
                              activeIndex === item.id
                                ? "bg-gray-50 dark:bg-slate-800 text-amber-400"
                                : ""
                            } flex justify-between items-center p-5 w-full font-medium text-start`}
                          >
                            <span>{item.title}</span>
                            <MdKeyboardArrowDown
                              className={`${
                                activeIndex === item.id ? "rotate-180" : ""
                              } w-4 h-4 shrink-0`}
                            />
                          </button>
                        </h2>
                        <div
                          className={activeIndex === item.id ? "" : "hidden"}
                        >
                          <div className="p-5">
                            <p className="text-slate-400 dark:text-gray-400">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6">
                  <Link
                    to=""
                    className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded-md"
                  >
                    Accept
                  </Link>
                  <Link
                    to=""
                    className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-transparent hover:bg-amber-400 border-amber-400 text-amber-400 hover:text-white rounded-md ms-2"
                  >
                    Decline
                  </Link>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <Switcher />
    </>
  );
}
