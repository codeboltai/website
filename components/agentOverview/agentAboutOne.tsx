import React from "react";

import {  MdKeyboardArrowRight } from "../../assets/icons/vander";
import Link from "next/link";

export default function AgentAboutOne() {
  return (
    <>
      <div className="container relative md:mt-24 mt-16">
    
         

          <div style={{display: 'flex', flexDirection:"column", alignItems:"center"}}>
            <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
              What is an AI agent ?
            </h3>
            <p className="text-slate-300 max-w-xl">
              AI agents efficiently manage complex tasks by coordinating
              multiple specialized models, such as natural language processing,
              image recognition, and decision-making algorithms. Among these,
              Devin and Devika are examples of such agents, where Devin focuses
              on natural language interactions and Devika specializes in
              optimizing software engineering processes.
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
                href="https://codeboltai.web.app/registry"
                target="_blank"
                className="hover:text-amber-400 font-medium duration-500 inline-flex items-center"
              >
                Find Out More{" "}
                <MdKeyboardArrowRight className="ms-1 text-[20px]" />
              </Link>
            </div>
          </div>
    
      </div>
    </>
  );
}
