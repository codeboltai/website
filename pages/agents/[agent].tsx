import React from 'react';
import Head from "next/head";
import Navbar from "../../components/navbar";
import Link from 'next/link';
import Avatar, {genConfig} from 'react-nice-avatar'
import { FiDownload } from "react-icons/fi";
import Footer from '../../components/footer';
import Switcher from '../../components/switcher';
export async function getStaticPaths() {
	const res = await fetch('https://codeboltai.web.app/api/agents/list');
	const agents = await res.json();

	const paths = agents.map((agent) => ({
		params: {
			agent: agent.slug
		}
	}));

	return {paths, fallback: false};
}

export async function getStaticProps({params}) {
	const res = await fetch('https://codeboltai.web.app/api/agents/list');
	const agents = await res.json();
	const agent = agents.find((a) => a.slug === params.agent);

	return {props: {
			agent
		}};
}

const AgentPage = ({agent}) => {
	const config = genConfig(agent.title);

  console.log("config---",config)
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
			<Navbar activePage="ai Agents"/>
			<section className="relative md:py-44 py-32 bg-no-repeat bg-bottom bg-cover"
				style={
					{backgroundImage: "url('/images/bg/bg-pages.jpg')"}
			}>
				<div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-slate-900/70"></div>
				<div className="container relative">
					<div className="grid grid-cols-1 text-center mt-6">
						<div>
							<h5 className="md:text-4xl text-3xl md:leading-normal leading-normal tracking-wider font-semibold text-white mb-0">
								{
								agent?.title.split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ')
							} </h5>
						</div>

						<ul className="tracking-[0.5px] mb-0 inline-block mt-5">
							<li className="inline-block capitalize text-[15px] font-medium duration-500 ease-in-out text-white/50 hover:text-white">
								<Link href="/agents">Agents Marketplace</Link>
							</li>
							<li className="inline-block text-base text-white/50 mx-0.5 ltr:rotate-0 rtl:rotate-180">
								<i className="mdi mdi-chevron-right"></i>
							</li>
							<li className="inline-block capitalize text-[15px] font-medium duration-500 ease-in-out text-white" aria-current="page">
								{
								agent?.title.split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ')
							} </li>
						</ul>
					</div>
				</div>
			</section>
			<div className="relative">
				<div className="shape absolute sm:-bottom-px -bottom-[2px] start-0 end-0 overflow-hidden z-1 text-white dark:text-slate-900">
					<svg className="w-full h-auto scale-[2.0] origin-top" viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
					</svg>
				</div>
			</div>
			<section className="flex flex-col w-full">
				<div className='container'>
					<div className='flex flex-row w-full justify-between'>
            <div className='flex flex-col gap-6'>
              <div className="h-32 w-32">
              <Avatar style={{ width: '4.5rem', height: '4.5rem' }} {...config} />
              </div>
                <h1 className="text-3xl font-bold mt-4">{agent?.title.split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ')}</h1>
            </div>
            
          <div>
						<Link
                href="https://codeboltai.web.app/sign-up"
                target="_blank"
                className="py-[6px] px-4 inline-block items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400 hover:bg-amber-500 border border-amber-400 hover:border-amber-500 text-white font-semibold"
              >
                <span className="inline-flex items-center">
                  Download <FiDownload className="ml-2" />
                </span>
              </Link>
					</div>
          </div>
          <div className="mt-6 w-full flex flex-wrap space-x-2 space-y-2">
              {agent.tags.map((tag, index) => (
                  <span
                      key={index}
                      className="rounded-full border text-amber-200 justify-center m-1 px-3 py-1"
                      style={{ whiteSpace: 'nowrap', marginRight: "10px", marginTop: "10px"}}
                  >
                      {tag}
                  </span>
              ))}
          </div>
          <p className='mt-6 mb-6'>{
					agent.longDescription
				}</p>
				</div>
			</section>
<Footer/>
<Switcher/>
			</>

	);
};export default AgentPage;
