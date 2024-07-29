import React from "react";
import advantage from "../../public/images/advantage.png";

import { MdKeyboardArrowRight } from "../../assets/icons/vander";
import Link from "next/link";
import Image from "next/image";
import { FiCheckCircle } from "react-icons/fi";

export default function AgentAboutFive() {
  return (
    <>
      <div className="container relative md:mt-24 mt-16">
        <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-6">
          <div className="relative overflow-hidden rounded-lg border border-amber-400/5 bg-gradient-to-tl to-amber-400/30  from-fuchsia-600/30 dark:to-amber-400/50 dark:from-fuchsia-600/50 ps-6 pt-6 lg:me-8">
            <Image
              height={800}
              width={800}
              src={advantage}
              className="ltr:rounded-tl-lg rtl:rounded-tr-lg"
              alt=""
            />
          </div>
          <div className="">
            <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
              Advantages of Creating Your Own AI Agent
            </h3>
            <p className="text-slate-300 max-w-xl">
              Creating your own AI agent offers several advantages:
            </p>

            <ul className="list-none text-slate-400 mt-4">
                        <li className="mb-2 flex items-center"><div className="h-5 w-5 me-2"><FiCheckCircle className="text-amber-400 h-5 w-5 me-2"/>  </div><>Precise Customization:</> Tailor the agent to your specific operational requirements.
                        </li>
                        <li className="mb-2 flex items-center"><div className="h-5 w-5 me-2"><FiCheckCircle className="text-amber-400 h-5 w-5 me-2"/>  </div><>Innovation Freedom:</> Innovate without constraints, ensuring the agent meets your unique needs.</li>
                        <li className="mb-2 flex items-center"><div className="h-5 w-5 me-2"><FiCheckCircle className="text-amber-400 h-5 w-5 me-2"/>  </div> <>Direct Control: </> Manage the integration and scalability of your solution directly.
                        </li>
                        <li className="mb-2 flex items-center"><div className="h-5 w-5 me-2"><FiCheckCircle className="text-amber-400 h-5 w-5 me-2"/>  </div> <>Workflow Alignment: </> Ensure the agent is perfectly aligned with your workflow for maximum efficiency.

                        </li>
                        <li className="mb-2 flex items-center"><div className="h-5 w-5 me-2"><FiCheckCircle className="text-amber-400 h-5 w-5 me-2"/>  </div> <>Competitive Edge: </>  Gain a competitive advantage in your industry through improved efficiency and tailored solutions.

                        </li>
            </ul>

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
