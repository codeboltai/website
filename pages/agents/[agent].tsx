import React from 'react';
import Head from "next/head";
import Navbar from "../../components/navbar";
import Link from 'next/link';
import Avatar, {genConfig} from 'react-nice-avatar'
import {FiDownload} from "react-icons/fi";
import Footer from '../../components/footer';
import Switcher from '../../components/switcher';
import ReactMarkdown from 'react-markdown';
import {Agent} from '../../types/types';
import { CiLink } from "react-icons/ci";

export async function getStaticPaths() {
	const res = await fetch('https://codeboltai.web.app/api/agents/list');
	const agents: Agent[] = await res.json();

	const paths = agents.map((agent:Agent) => ({
		params: {
			agent: agent.slug
		}
	}));

	return {paths, fallback: false};
}

export async function getStaticProps({params}: {params: {agent: string}}) {
	const res = await fetch('https://codeboltai.web.app/api/agents/list');
	const agents = await res.json();
	const agent = agents.find((a: Agent) => a.slug === params.agent);

	return {props: {
			agent
		}};
}
const AgentPage = ({agent}: {agent: Agent}) => {
	const config = genConfig(agent.title);

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
			<div className="relative md:py-20 py-16">
				<div className="shape absolute sm:-bottom-px -bottom-[2px] start-0 end-0 overflow-hidden z-1 text-white dark:text-slate-900">
					<svg className="w-full h-auto scale-[2.0] origin-top" viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
					</svg>
				</div>
			</div>
			<section className="flex flex-col w-full min-h-screen">
				<div className='container'>
					<div className='flex flex-row w-full justify-between'>
						<div className='flex flex-col gap-6'>
							<div className="h-32 w-32">
								<Avatar style={
										{
											width: '4.5rem',
											height: '4.5rem'
										}
									}
									{...config}/>
							</div>
							<div className='mt-1'>
							<h1 className="text-3xl font-bold ">
								{
								agent ?. title.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
							}</h1>
							<h1 className="text-sm">
								{
								agent ?.description
							}</h1>
							</div>
							
						</div>

						<div>
							<Link href="https://codeboltai.web.app/sign-up" target="_blank" className="py-[6px] px-4 inline-block items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400 hover:bg-amber-500 border border-amber-400 hover:border-amber-500 text-white font-semibold">
								<span className="inline-flex items-center">
									View in Registry
									{/* <FiDownload className="ml-2"/> */}
									<CiLink className="h-4 w-4 " />
								</span>
							</Link>
						</div>
					</div>
					<div className="mt-6 w-full flex flex-wrap space-x-2 space-y-2">
						{
						agent.tags.map((tag, index) => (
							<span key={index}
								className="rounded-full border text-amber-200 justify-center m-1 px-3 py-1"
								style={
									{
										whiteSpace: 'nowrap',
										marginRight: "10px",
										marginTop: "10px"
									}
							}>
								{tag} </span>
						))
					} </div>
					<p className='mt-6 mb-6'>
						<ReactMarkdown>{
							agent?.longDescription
						}</ReactMarkdown>
					</p>
				</div>
			</section>
			<Footer/>
			<Switcher/>
		</>

	);
};
export default AgentPage;
