import React from "react";
import Link from "next/link";
import feature4 from "../../public/images/agents_icons.png";

import { MdKeyboardArrowRight } from "../../assets/icons/vander";
import Image from "next/image";
import classic02 from '../../public/images/classic02.png';

export default function Main() {
  return (
    <>
      <div className="container relative ">
        <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-12">
          <div className="">
            <h3 className="mb-4 md:text-2xl md:leading-normal text-2xl leading-normal font-semibold">
            Effortless Software Customization with specialised AI agents
            </h3>
            <p className="text-slate-300 max-w-xl"> 

             Codebolt is a code editor enabling developers to build and use adaptable use-case specific AI agent toolkits. This gives more accurate software generation, allowing developers and even end users to customise complex softwares using text prompts.
            </p>

            {/* <ul className="list-none text-slate-400 mt-4">
              <li className="mb-2 flex items-center">
                <div className="h-5 w-5 me-2">
                  <FiCheckCircle className="text-amber-400 h-5 w-5 me-2" />{" "}
                </div>
                Seamless Integration: Seamlessly integrate AI agent creation
                into your workflow by following our clear and concise
                documentation.
              </li>
              <li className="mb-2 flex items-center">
                <div className="h-5 w-5 me-2">
                  <FiCheckCircle className="text-amber-400 h-5 w-5 me-2" />{" "}
                </div>
                Efficiency Boost: Save time and resources with a straightforward
                process that eliminates the need for complex coding or
                specialized training.
              </li>
              <li className="mb-2 flex items-center">
                <div className="h-5 w-5 me-2">
                  <FiCheckCircle className="text-amber-400 h-5 w-5 me-2" />{" "}
                </div>{" "}
                <>Customization: </> Tailor AI agents to your specific needs by
                following our step-by-step instructions, ensuring your agents
                are perfectly suited to your tasks.
              </li>
            </ul> */}

            <div className="mt-4">
              <Link
                href="#"
                  className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded-md"
              >
                Download Codebolt{" "}
                {/* <MdKeyboardArrowRight className="ms-1 text-[20px]" /> */}
              </Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border border-amber-400/5 bg-gradient-to-tl to-amber-400/30  from-fuchsia-600/30 dark:to-amber-400/50 dark:from-fuchsia-600/50 ps-6 pt-6 lg:me-8 w-full">
          <Image width={800} height={800} src={classic02} className="ltr:rounded-tl-lg rtl:rounded-tr-lg" alt=""/>
          </div>
        </div>
      </div>
    </>
  );
}
