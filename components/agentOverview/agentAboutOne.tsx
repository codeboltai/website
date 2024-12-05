import React from "react";
import {  MdKeyboardArrowRight } from "../../assets/icons/vander";
import Link from "next/link";


type AgentAboutProps = {
  title: string;
  description: string; 
};


const AgentAboutOne: React.FC<AgentAboutProps> = ({ title, description  }) => {
  return (
    <>
      <div className="container relative md:mt-24 mt-16">
          <div style={{display: 'flex', flexDirection:"column", alignItems:"center"}}>
            <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
             {title}
            </h3>
            <p className="text-slate-300 max-w-xl">
            {description}
            </p>
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

export default AgentAboutOne;