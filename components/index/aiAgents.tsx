import React from "react";
import Link from "next/link";
import Avatar, { genConfig } from 'react-nice-avatar'
import { Agent } from "../../types/types";

export default function AiAgents({ agents }: { agents: Agent[] }) {

  // console.log(agents)
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
        <div className="grid grid-cols-1 pb-6 text-center relative place-content-center">
          <span className="absolute blur-[200px] w-[300px] h-[300px] rounded-full top-[800px]  bg-gradient-to-tl to-amber-400  from-fuchsia-600 z-0"></span>

          <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
            Featured AI Agents
          </h3>

          <p className="text-slate-400 max-w-xl mx-auto">
          Explore a variety of AI agents in the Codebolt Marketplace. Use the Codebolt’s Editor to create and publish your own custom AI agents.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-6 gap-6 place-content-center">
          {agents?.slice(0, 6).map((item, index) => {
              const config = genConfig(item.title)
            return (
              <div
                className="px-6 py-10 shadow hover:shadow-md  dark:shadow-gray-800 dark:hover:shadow-gray-700 duration-500 rounded-lg bg-white dark:bg-slate-900 border-white border-[3px] place-items-center"
                key={index}
              >
                <div className="w-14 h-14 rounded-full items-center">
                <Avatar style={{ width: '3.5rem', height: '3.5rem' }} {...config} />
                </div>

                <div className="content mt-7">
                  <Link
                    href=""
                    className="title h5 text-lg font-medium hover:text-amber-400 duration-500"
                  >
                    {item.title}
                  </Link>
                  <p className="text-slate-400 mt-3">
                  {item.description}
                  </p>

                  <div className="mt-5">
                                        <Link href={`/agents/${item.slug}`}  className="hover:text-amber-400 font-medium duration-500">Read More <i className="mdi mdi-arrow-right align-middle"></i></Link>
                                    </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-6">
          <Link
            href="/agents"
            className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded-md"
          >
            Explore Agents Marketplace
          </Link>
        </div>
      </div>
    </>
  );
}
