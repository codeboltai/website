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
        <Navbar activePage="agentai"/>
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
        <Link className="flex flex-col overflow-hidden bg-white dark:bg-slate-900" key={index} href={`/agents/agentsDetails/${item.slug}`}>
          <div className=" bg-white rounded-full "  style={{ "width":"80px","height":"80px" ,"display":"flex","alignItems":"center","justifyContent":"center" ,borderRadius:"9999px"}}>
           
            {/* <Avatar style={{ width: '4.3rem', height: '4.2rem' }} {...config} /> */}
            <Image width={70} height={70} src={item.avatarSrc} alt='Logo' className='rounded-full' />
          </div>
          <div className="py-5 px-3 pt-3 " style={{  "width": "70%"}}>
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
  </div>

<Footer/>
<Switcher />
		</>
	);
};

export default AgentsPage;
