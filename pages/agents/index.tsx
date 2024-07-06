import React from 'react';
import Link from 'next/link';
import Head from "next/head";
import Navbar from "../../components/navbar";
import Avatar, { genConfig } from 'react-nice-avatar'
import Footer from '../../components/footer';
import Switcher from '../../components/switcher';
import { Agent } from './types';
export async function getServerSideProps() {
	const res = await fetch('https://codeboltai.web.app/api/agents/list');
	const agents = await res.json();

	return {props: {
			agents
		}};
}

const AgentsPage = ({agents}: {agents: Agent[]}) => {
	return (
		<>
			<Head>

				<link rel="icon" href="/favicon.ico"/>

				<meta name="description" content="Codebolt is a next-gen Code Editor, designed with an AI Agents-first approach. It natively supports AI Code Generation Workflows and can run multiple AI agents tailored to specific coding languages or tasks."/>

				<meta name="keywords" content="Code Editor, AI Code Generation, AI Agents, Codebolt, Programming, Software Development"/>

				<meta name="author" content="Codebolt Team"/>

				<meta name="robots" content="index, follow"/>

				<meta property="og:title" content="Codebolt - AI-Centric Code Editor"/>

				<meta property="og:description" content="Codebolt is a next-gen Code Editor, designed with an AI Agents-first approach. It natively supports AI Code Generation Workflows and can run multiple AI agents tailored to specific coding languages or tasks."/>

				<meta property="og:image" content="/public/images/classic02.png"/>

				<meta property="og:url" content="https://www.codebolt.com"/>

				<meta property="og:type" content="website"/>

				<link rel="icon" href="/favicon.ico"/>

			</Head>
        <Navbar activePage="features"/>
        <section className="relative md:py-44 py-32 bg-no-repeat bg-bottom bg-cover" style={{backgroundImage:"url('/images/bg/bg-pages.jpg')"}}>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-slate-900/70"></div>
        <div className="container relative">
          <div className="grid grid-cols-1 text-center mt-6">
            <div>
              <h5 className="md:text-4xl text-3xl md:leading-normal leading-normal tracking-wider font-semibold text-white mb-0">
                Agents Marketplace
              </h5>
            </div>

            <ul className="tracking-[0.5px] mb-0 inline-block mt-5">
              <li className="inline-block capitalize text-[15px] font-medium duration-500 ease-in-out text-white/50 hover:text-white">
                <Link href="/">CodeBolt</Link>
              </li>
              <li className="inline-block text-base text-white/50 mx-0.5 ltr:rotate-0 rtl:rotate-180">
                <i className="mdi mdi-chevron-right"></i>
              </li>
              <li
                className="inline-block capitalize text-[15px] font-medium duration-500 ease-in-out text-white"
                aria-current="page"
              >
               Agents Marketplace
              </li>
            </ul>
          </div>
        </div>
      </section>
      <div className="relative">
        <div className="shape absolute sm:-bottom-px -bottom-[2px] start-0 end-0 overflow-hidden z-1 text-white dark:text-slate-900">
          <svg
            className="w-full h-auto scale-[2.0] origin-top"
            viewBox="0 0 2880 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
<div className='container mb-5'>
  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-6 gap-6">
    {agents.map((item, index) => {
      const config = genConfig(item.title);
      return (
        <Link
          href={`/agents/${item.slug}`}
          className="px-6 py-10 shadow hover:shadow-md dark:shadow-gray-800 dark:hover:shadow-gray-700 duration-500 rounded-lg bg-white dark:bg-slate-900 border-white border-[3px]"
          key={index}
        >
          <div className="w-14 h-14 rounded-full">
            <Avatar style={{ width: '3.5rem', height: '3.5rem' }} {...config} />
          </div>

          <div className="content mt-7">
            <div
              className="title h5 text-lg font-medium hover:text-amber-400 duration-500"
            >
              {item.title}
            </div>
            <p className="text-slate-400 mt-3">
              {item.description}
            </p>
            <div className="mt-6 w-full flex flex-wrap space-x-2 space-y-2">
              {item.tags.map((tag, index) => (
                  <span
                      key={index}
                      className="rounded-full border text-amber-200 justify-center m-1 px-3 py-1"
                      style={{ whiteSpace: 'nowrap', marginRight: "10px", marginTop: "10px"}}
                  >
                      {tag}
                  </span>
              ))}
          </div>
          </div>
        </Link>
      );
    })}
  </div>
</div>
<Footer/>
<Switcher />
		</>
	);
};

export default AgentsPage;
