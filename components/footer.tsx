import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import {
  FiShoppingCart,
  FiDribbble,
  FiLinkedin,
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiMail,
  FiFileText,
  FaGithub,
} from '../assets/icons/vander'

export default function Footer() {
  return (
    <>
      <div className="relative">
        <div className="shape absolute xl:-bottom-[30px] lg:-bottom-[16px] md:-bottom-[13px] -bottom-[5px] start-0 end-0 overflow-hidden z-1 rotate-180 text-white dark:text-slate-900">
          <svg
            className="w-full h-auto scale-[2.0] origin-top"
            viewBox="0 0 2880 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
      <footer className="relative bg-gray-900 overflow-hidden">
        <span className="absolute blur-[200px] w-[300px] h-[300px] rounded-full top-0 -start-[0] bg-gradient-to-tl to-amber-400  from-fuchsia-600 z-0"></span>
        <div className="container-fluid relative md:py-24 py-16">
          <div className="container relative">
            <div className="grid grid-cols-1 text-center">
              <div className="">
                <h4 className="font-bold lg:leading-normal leading-normal text-4xl lg:text-5xl text-white tracking-normal mb-4">
                  Get Started Now
                </h4>
                <p className="text-white/70 text-lg max-w-xl mx-auto">
                  Artificial intelligence makes it fast easy to create content
                  for your blog, social media, website, and more!
                </p>

                <div className="mt-6">
                  <Link
                    href="https://codeboltai.web.app/"
                    target="_blank"
                    className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-transparent hover:bg-amber-400 border-gray-800 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-400 text-white rounded-md"
                  >
                    Join Now!
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container relative text-center">
          <div className="grid grid-cols-1 border-t border-gray-800 dark:border-slate-800">
            <div className="py-[30px] px-0">
              <div className="grid md:grid-cols-2 items-center">
                <div className="md:text-start text-center">
                  <Link href="#" className="text-[22px] focus:outline-none">
                    <Image
                      src="/images/logo-light.png"
                      width={110}
                      height={300}
                      className="h-6 inline-block dark:hidden"
                      alt=""
                    />
                    <Image
                      src="/images/logo-light.png"
                      width={110}
                      height={300}
                      className="h-6 hidden dark:inline-block"
                      alt=""
                    />{' '}
                  </Link>
                </div>

                <div>
                  <ul className="list-none footer-list md:text-end text-center mt-6 md:mt-0 space-x-1">
                    <li className="inline">
                      <Link
                        href="https://github.com/codeboltai"
                        target="_blank"
                        className="h-8 w-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center border border-gray-800 dark:border-slate-800 rounded-md hover:border-amber-400 dark:hover:border-amber-400 hover:bg-amber-400 dark:hover:bg-amber-400 text-slate-300 hover:text-white"
                      >
                        <FaGithub className="h-4 w-4 align-middle" />
                      </Link>
                    </li>
                  </ul>
                  <div className="mt-6 flex justify-end space-x-4">
                    <Link
                      href="/privacy"
                      className="text-white hover:text-amber-400 dark:hover:text-amber-400"
                    >
                      Privacy Policy &nbsp;
                    </Link>
                    |
                    <Link
                      href="/terms"
                      className="text-white hover:text-amber-400 dark:hover:text-amber-400"
                    >
                      &nbsp;Terms of Service &nbsp;
                    </Link>
                    |
                    <Link
                      href="/"
                      className="text-white hover:text-amber-400 dark:hover:text-amber-400"
                    >
                      &nbsp;About Us &nbsp;
                    </Link>
                    |
                    <Link
                      href="/contact"
                      className="text-white hover:text-amber-400 dark:hover:text-amber-400"
                    >
                      &nbsp;Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-[30px] px-0 border-t border-gray-800 dark:border-slate-800">
          <div className="container relative text-center">
            <div className="grid grid-cols-1">
              <div className="text-center">
                <p className="text-gray-400">
                  © {new Date().getFullYear()} Codebolt.ai - Developed with{' '}
                  <i className="mdi mdi-heart text-orange-700"></i> in India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
