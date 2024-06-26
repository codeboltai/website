import React, { useEffect } from "react";

import BannerImg from "../assets/images/agentsOverview.png";
import Footer from "../components/footer";
import Switcher from "../components/switcher";
import AgentAboutOne from "../components/agentOverview/agentAboutOne";
import AgentAboutTwo from "../components/agentOverview/agentAboutTwo";
import AgentAboutThree from "../components/agentOverview/agentAboutThree";
import AgentAboutFour from "../components/agentOverview/agentAboutFour";
import AgentAboutFive from "../components/agentOverview/agentAboutFive";

export default function AgentOverview() {
  useEffect(() => {
    document.documentElement.setAttribute("dir", "ltr");
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
  }, []);

  return (
    <>
      <section className="relative table w-full lg:py-40 md:py-36 pt-36 pb-24 overflow-hidden bg-white dark:bg-slate-900">
        <div className="container relative z-1">
          <div className="relative grid lg:grid-cols-12 grid-cols-1 items-center mt-10 gap-[30px]">
            <div className="lg:col-span-7">
              <div className="lg:me-6 lg:text-start text-center">
                <h1 className="font-bold lg:leading-normal leading-normal text-4xl lg:text-6xl mb-5">
                  You Write AI Agents, <br /> Agents Write Code
                </h1>
                <p className="text-lg max-w-xl lg:ms-0 mx-auto">
                  Codebolt Ai Agent Framework makes it easy for anyone to write
                  their custom AI Agents
                </p>

                <div className="subcribe-form mt-6 mb-3">
                  <button
                    type="submit"
                    className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center h-[46px] bg-amber-400 hover:bg-amber-500 border border-amber-400 hover:border-amber-500 text-white rounded-md"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative after:content-[''] after:absolute lg:after:-top-0 after:-top-10 after:-right-32 after:w-[36rem] after:h-[36rem] after:border-2 after:border-dashed after:border-slate-700/10 dark:after:border-slate-200/10 after:rounded-full after:animate-[spin_120s_linear_infinite] after:-z-1 before:content-[''] before:absolute lg:before:-top-24 before:-top-36 before:-right-56 before:w-[48rem] before:h-[48rem] before:border-2 before:border-dashed before:border-slate-700/10 dark:before:border-slate-200/10 before:rounded-full before:animate-[spin_240s_linear_infinite] before:-z-1">
                <div className="relative after:content-[''] after:absolute lg:after:-top-24 after:-top-10 after:-right-0 after:w-[42rem] after:h-[42rem] after:bg-gradient-to-tl after:to-amber-400/30  after:from-fuchsia-600/30 dark:after:to-amber-400/50 dark:after:from-fuchsia-600/50 after:blur-[200px] after:rounded-full after:-z-1">
                  <img
                    src={BannerImg}
                    className="lg:max-w-2xl lg:ms-14"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative pt-6 md:pb-24 pb-16 overflow-hidden">
        <span className="absolute blur-[200px] w-[500px] h-[500px] rounded-full top-[25%] -start-[20%] bg-gradient-to-tl to-amber-400  from-fuchsia-600 -z-1"></span>
        <span className="absolute blur-[200px] w-[500px] h-[500px] rounded-full bottom-[25%] -end-[20%] bg-gradient-to-tl to-amber-400  from-fuchsia-600 -z-1"></span>
        {/* <BrandLogo/> */}

        {/* <AboutThree/> */}
        <AgentAboutOne />
        <AgentAboutTwo />
        <AgentAboutThree />
        <AgentAboutFour />
        <AgentAboutFive />
      </section>
      <Footer />
      <Switcher />
    </>
  );
}
