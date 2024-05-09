import React from "react";
import { Link } from "react-router-dom";
import Avatar, { genConfig } from 'react-nice-avatar'


export default function AiAgents() {
  const featureData = [
    {
    
      title: "Agent 1",
      desc: "Agent for Writing Documentation",
    },
    {

      title: "Agent 2",
      desc: "Agent for Writing Code",
    },
    {
   
      title: "Agent 3",
      desc: "Agent for Writing Blog",
    },

  ];

  return (
    <>
      <div className="container  md:mt-24 mt-16  ">
        <div className="grid grid-cols-1 pb-6 text-center relative">
          <span className="absolute blur-[200px] w-[300px] h-[300px] rounded-full top-[800px]  bg-gradient-to-tl to-amber-400  from-fuchsia-600 z-0"></span>

          <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
            Featured AI Agents
          </h3>

          <p className="text-slate-400 max-w-xl mx-auto">
            Find Various AI Agents in the Codebolt Marketplace. Codebolt Editor
            also supports creating custom AI Agents. You can also Publish the AI
            Agents in the Marketplace.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-6 gap-6">
          {featureData.map((item, index) => {
              const config = genConfig(item.title)
            return (
              <div
                className="px-6 py-10 shadow hover:shadow-md  dark:shadow-gray-800 dark:hover:shadow-gray-700 duration-500 rounded-lg bg-white dark:bg-slate-900 border-white border-[3px]"
                key={index}
              >
                <div className="w-14 h-14 rounded-full ">
                <Avatar style={{ width: '3.5rem', height: '3.5rem' }} {...config} />
                </div>

                <div className="content mt-7">
                  <Link
                    to=""
                    className="title h5 text-lg font-medium hover:text-amber-400 duration-500"
                  >
                    {item.title}
                  </Link>
                  <p className="text-slate-400 mt-3">
                  {item.desc}
                  </p>

                  {/* <div className="mt-5">
                                        <Link to="" className="hover:text-amber-400 font-medium duration-500">Read More <i className="mdi mdi-arrow-right align-middle"></i></Link>
                                    </div> */}
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-6">
          <Link
            to="https://codeboltai.web.app/"
            target="_blank"
            className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded-md"
          >
            Explore AI Agent Marketplace
          </Link>
        </div>
      </div>
    </>
  );
}
