import React from "react";
import feature4 from "../../public/images/features4.jpg";

import { MdKeyboardArrowRight } from "../../assets/icons/vander";
import Link from "next/link";
import Image from "next/image";

export default function AgentAboutFive() {
  return (
    <>
      <div className="container relative md:mt-24 mt-16">
        <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-6">
          <div className="relative overflow-hidden rounded-lg border border-amber-400/5 bg-gradient-to-tl to-amber-400/30  from-fuchsia-600/30 dark:to-amber-400/50 dark:from-fuchsia-600/50 ps-6 pt-6 lg:me-8">
          <Image
            height={800}
            width={800}
              src={feature4}
              className="ltr:rounded-tl-lg rtl:rounded-tr-lg"
              alt=""
            />
          </div>
          <div className="">
            <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
              Advantages of Creating Your Own AI Agent
            </h3>
            <p className="text-slate-300 max-w-xl">
              Creating your own AI agent offers several advantages, including
              precise customization to your specific operational requirements,
              the ability to innovate without constraints, and direct control
              over the integration and scalability of the solution. This
              approach ensures that the agent is perfectly aligned with your
              workflow, providing efficiency improvements and a competitive edge
              in your industry.
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
                href="https://docs.codebolt.ai/?docusaurus-theme=dark/"
                target="_blank"
                className="hover:text-amber-400 font-medium duration-500 inline-flex items-center"
              >
                Go to Docs <MdKeyboardArrowRight className="ms-1 text-[20px]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
