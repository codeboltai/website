import React from "react";
import { Link } from "react-router-dom";
import feature4 from "../../assets/images/agentsOverview.png";

import { MdKeyboardArrowRight } from "../../assets/icons/vander";

export default function AgentAboutFour() {
  return (
    <>
      <div className="container relative md:mt-24 mt-16">
        <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-6">
          <div className="">
            <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
              Create and Upload Your Custom Agent
            </h3>
            <p className="text-slate-300 max-w-xl">
              Craft your own AI agent using the CodeBolt Documentation and directly
              upload it to our platform. This feature empowers you to design
              customized solutions that specifically address your unique
              requirements and challenges, enhancing your operational efficiency
              with tailor-made automation.
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
                to="https://docs.codebolt.ai/?docusaurus-theme=dark/"
                target="_blank"
                className="hover:text-amber-400 font-medium duration-500 inline-flex items-center"
              >
                  Go to Docs{" "}
                <MdKeyboardArrowRight className="ms-1 text-[20px]" />
              </Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border border-amber-400/5 bg-gradient-to-tl to-amber-400/30  from-fuchsia-600/30 dark:to-amber-400/50 dark:from-fuchsia-600/50 ps-6 pt-6 lg:me-8">
            <img
              src={feature4}
              className="ltr:rounded-tl-lg rtl:rounded-tr-lg"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
