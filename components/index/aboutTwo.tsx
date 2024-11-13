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
              Build Software Using  Robust AI Code Editor
            </h4>
            <p className="text-slate-300 max-w-xl">
            


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
