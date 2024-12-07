import React from 'react';
import Head from "next/head";
import Navbar from "../../../components/navbar";
import Link from 'next/link';
import Avatar, {genConfig} from 'react-nice-avatar'
import {FiDownload} from "react-icons/fi";
import Footer from '../../../components/footer';
import Switcher from '../../../components/switcher';
import ReactMarkdown from 'react-markdown';
import {Agent} from '../../../types/types';
import { CiLink } from "react-icons/ci";
import {additionalAgents} from '../../../data/data';
import Image from 'next/image';
export async function getStaticPaths() {
    const paths = additionalAgents.map(agent => ({
        params: { agent: agent.slug }
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { agent: string } }) {
	const apiUrl = process.env.STRAPI;
    const agent = additionalAgents.find((a: Agent) => a.slug === params.agent);
	const res3 = await fetch(`${apiUrl}/api/head`);
	const HeadContent = await res3.json();
	
    return { props: { 
		agent,
		HeadContent
	 } };
}

const AgentPage = ({agent, HeadContent}: {agent: Agent, HeadContent: any}) => {
	const config = genConfig();

	return (
		<>
			<Head>
				<title>{
					HeadContent ?. title
				}</title>
				<meta name="description"
					content={
						HeadContent ?. description
					}/>

				<meta name="keywords"
					content={
						HeadContent ?. keywords
					}/>

				<meta name="author"
					content={
						HeadContent ?. author
					}/>

				<meta name="robots"
					content={
						HeadContent ?. robots
					}/>

				<meta property="og:title"
					content={
						HeadContent ?. ogtitle
					}/>

				<meta property="og:description"
					content={
						HeadContent ?. ogdescription
					}/>

				<meta property="og:image"
					content={
						HeadContent ?. ogimage ?. url
					}/>

				<meta property="og:url"
					content={
						HeadContent ?. url
					}/>

				<meta property="og:type"
					content={
						HeadContent ?. type
					}/>

				<link rel="icon"
					href={
						HeadContent ?. icon ?. url
					}/>
			</Head>
			<Navbar activePage="agentai"/>
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
							
							<div className=" bg-white rounded-full "  style={{ "width":"100px","height":"100px" ,"display":"flex","alignItems":"center","justifyContent":"center" ,borderRadius:"9999px"}}>
           
						{/* <Avatar style={{ width: '4.3rem', height: '4.2rem' }} {...config} /> */}
						<Image width={70} height={70} src={agent.avatarSrc} alt='Logo' className='rounded-full' />
					
							</div>
							<div className='mt-1'>
							<h1 className="text-3xl font-bold ">
								
								{
								agent ?. title.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
							} <span className='text-xs'>Comming Soon...</span>
							</h1>
							<h1 className="text-sm">
								
								{
								agent ?.description
							}
							</h1>
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
				<div className='w-full'>
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

					<div className='mt-6 grid gap-4 grid-cols-2 '>
						<div>
							<h1 className='text-lg text-slate-300'>Action</h1>
					{agent?.action?.map((item, index) => (
						<div key={index}>
							<h2 className='text-lg font-bold'>{item.name}</h2>
							<p className='text-sm' style={{padding: '10px 10px 10px 30px'}} >{item.description}</p>
							<p className='text-sm' style={{padding: '10px 10px 10px 30px'}}>{item.actionPrompt}</p>
							<p className='text-sm' style={{padding: '10px 10px 10px 30px'}}>{item.detailDescription}</p>
						</div>
						))}
						</div>
					<div>
					<h1 className='text-lg text-slate-300'>About</h1>
						<ReactMarkdown className='mt-6'>{
							agent?.longDescription
						}</ReactMarkdown>
					</div>
					</div>
				</div>
			</div>
			</section>
			<Footer/>
			<Switcher/>
		</>

	);
};
export default AgentPage;
