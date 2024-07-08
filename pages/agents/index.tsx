import React from 'react';
import Link from 'next/link';
import Head from "next/head";
import Navbar from "../../components/navbar";
import Avatar, { genConfig } from 'react-nice-avatar'
import Footer from '../../components/footer';
import Switcher from '../../components/switcher';
import {Agent} from '../../types/types';
import {additionalAgents} from '../../data/data';
import Image from 'next/image';

export async function getStaticProps() {
	const res = await fetch('https://codeboltai.web.app/api/agents/list');
	const agents = await res.json();


	return {props: {
			agents,
      additionalAgents
		}};
}

const AgentsPage = ({agents, additionalAgents}: {agents: Agent[], additionalAgents: Agent[]}) => {
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
        {/* <section className="relative md:py-44 py-32 bg-no-repeat bg-bottom bg-cover" style={{backgroundImage:"url('/images/bg/bg-pages.jpg')"}}>
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
      </section> */}
      {/* <div className="relative">
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
      </div> */}
      <div className="relative md:py-20 py-16">
				<div className="shape absolute sm:-bottom-px -bottom-[2px] start-0 end-0 overflow-hidden z-1 text-white dark:text-slate-900">
					<svg className="w-full h-auto scale-[2.0] origin-top" viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
					</svg>
				</div>
			</div>
 
  <div className='container mb-6'> 
    <h2 className='text-lg font-bold'>Trending</h2>
  <p className='text-md text-slate-300'>Discover the most popular agents in the Marketplace </p>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 mt-6 gap-6">
    {agents.map((item, index) => {
      const config = genConfig(item.title);
      return (
        <Link className="flex flex-col overflow-hidden bg-white dark:bg-slate-900" key={index} href={`/agents/${item.slug}`} >
          <div className="rounded-md">
            <Avatar style={{ width: '4.3rem', height: '4.2rem' }} {...config} />
          </div>
          <div className="py-5 px-3 pt-3">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <h3 className="text-xs" style={{ 
                overflow: "hidden", 
                display: "-webkit-box", 
                WebkitBoxOrient: "vertical", 
                WebkitLineClamp: 2 
              }}>{item.description}</h3>
          </div>
        </Link>  
      );
    })}
  </div>

  <h2 className='text-lg font-bold' style={{paddingTop: "64px"}}>Additional Agents <span className='text-sm font-semibold'>Comming Soon...</span> </h2>
  <p className='text-md text-slate-300'>Discover the most popular agents in the Marketplace </p>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 mt-6 gap-6">
    {additionalAgents.map((item, index) => {
      const config = genConfig(item.title);
      return (
        <div className="flex flex-col overflow-hidden bg-white dark:bg-slate-900" key={index}>
          <div className="rounded-md">
            {/* <Avatar style={{ width: '4.3rem', height: '4.2rem' }} {...config} /> */}
            <Image width={64} height={64} src={item.avatarSrc} />
          </div>
          <div className="py-5 px-3 pt-3">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <h3 className="text-xs" style={{ 
                overflow: "hidden", 
                display: "-webkit-box", 
                WebkitBoxOrient: "vertical", 
                WebkitLineClamp: 2 
              }}>{item.description}</h3>
          </div>
    </div>  
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
