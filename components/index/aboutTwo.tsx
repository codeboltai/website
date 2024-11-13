import React from "react";
import Link from "next/link";
import feature4 from "../../public/images/codebolt.png";
import { MdKeyboardArrowRight } from "../../assets/icons/vander";
import Image from "next/image";
import { useState } from "react";

export default function AgentAboutTwo() {

  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="container relative md:mt-24 mt-16">
        <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-6">
          <div className="">
            <h4 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
              {/* CodeBolt Supports Multiple Agents */}
              Build Software using  Robust AI Code Editor
            </h4>
            <p className="text-slate-300 max-w-xl">
             {/* CodeBolt supports various AI agents like Devin, Devika, and Open Devin, each designed for specific tasks. It helps with complex conversations, software development, and community-driven ideas. With strong multi-agent support, CodeBolt integrates and manages AI functions, making it ideal for advanced solutions in different settings. */}


             {/* Our AI-powered code editor is designed to revolutionize the way you develop software. With intelligent code suggestions, real-time error detection, and seamless integration of AI-driven features, you can accelerate development and reduce the complexity of writing and deploying code. 

             Whether you're creating simple applications or sophisticated AI-powered systems, our editor streamlines the entire process, helping you write cleaner, more efficient code faster. Empower your development team with the tools they need to innovate, collaborate, and deliver high-quality software with ease. */}


             {isExpanded ? (
          `Our AI-powered code editor is designed to revolutionize the way you develop software. 
          With intelligent code suggestions, real-time error detection, and seamless integration of AI-driven features, 
          you can accelerate development and reduce the complexity of writing and deploying code. 
          Whether you're creating simple applications or sophisticated AI-powered systems, 
          our editor streamlines the entire process, helping you write cleaner, more efficient code faster. 
          Empower your development team with the tools they need to innovate, collaborate, and deliver high-quality software with ease.`
        ) : (
          `Our AI-powered code editor revolutionizes software development with intelligent code suggestions, 
          real-time error detection, and AI-driven features. Accelerate development and simplify coding, 
          whether building simple apps or complex AI systems.`
        )}
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
              <button
               onClick={handleToggle}
                className="hover:text-amber-400 font-medium duration-500 inline-flex items-center"
              >
                 {isExpanded ? 'View Less' : 'View More'}
                {/* Find Out More{" "} */}
                <MdKeyboardArrowRight className="ms-1 text-[20px]" />
              </button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border border-amber-400/5 bg-gradient-to-tl to-amber-400/30  from-fuchsia-600/30 dark:to-amber-400/50 dark:from-fuchsia-600/50 ps-6 pt-6 lg:me-8">
            <Image
            src={feature4}
            className="ltr:rounded-tl-lg rtl:rounded-tr-lg w-full"
            alt=""
            style={{height: "300px"}}
            />
          </div>
        </div>
      </div>
    </>
  );
}
