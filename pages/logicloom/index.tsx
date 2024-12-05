import React, {useEffect} from "react";
import type { NextPage } from 'next'
import BannerImg from "../../public/images/classic02.png"
import Switcher from "../../components/switcher";
import FrameWorkFeatures from "../../components/agentsFramework/frameWorkFeatures";
// import FrameWorkFooter from "../../components/logicloom/frameWorkFooter";
import Footer from "../../components/footer";
import Image from "next/image";
import Head from "next/head";
import Navbar from "../../components/navbar";



export async function getStaticProps() {
	try {
	  const apiUrl = process.env.STRAPI; 
	  const res2 = await fetch(`${apiUrl}/api/llm?pLevel`);
	  const res3 = await fetch(`${apiUrl}/api/head`);
	  const HeadContent = await res3.json();
	  const featureData = await res2.json();
	  return {
		props: {
		  featureData: featureData?.data,
		  HeadContent: HeadContent
		}
	  };
	} catch (error) {
	  console.error('Failed to fetch agents:', error);
	  return {
		props: {
		  featureData: [],
		  HeadContent: []
		}
	  };
	}
  }
  
const LogicLoom: NextPage<{ featureData: any, HeadContent: any }> = ({ featureData, HeadContent}) => {
	useEffect(() => {
		document.documentElement.setAttribute("dir", "ltr");
		document.documentElement.classList.add('dark');
		document.documentElement.classList.remove('light');
	}, []);
	const workData = [
		{
			icon: 'mdi mdi-account-search-outline',
			title: ' Access Ready-to-Use AI Agents',
			desc: 'Discover a wide range of prebuilt AI agents in CodeSquad, powered by the Codebolt Framework. Avoid the complexities of building AI agents from scratch. Choose from our diverse library tailored to various tasks and industries, ensuring you find an agent that aligns with your business needs right from the start.'
		}, {
			icon: 'mdi mdi-wallet-outline',
			title: 'Customize Effortlessly with Codebolt Tools',
			desc: 'Leverage the Codebolt Frameworks advanced tools to easily customize your chosen AI agent. Adapt its behavior, responses, and overall functionality to meet your specific requirements. With intuitive controls and no need for deep coding skills, you can personalize the agent quickly and efficiently.'
		}, {
			icon: 'mdi mdi-home-plus-outline',
			title: 'Deploy Smoothly and Scale Effectively',
			desc: 'Implement your customized AI agent into your business systems without hassle, thanks to the robust integration features of the Codebolt Framework. This framework facilitates not only easy deployment but also ensures that your AI solutions are scalable, capable of handling varying interaction volumes to grow with your business needs.'
		},
	]
	return (
		<>

			<Head>

			<title>{HeadContent?.title}</title>
			<meta name="description" content={HeadContent?.description} />

			<meta name="keywords" content={HeadContent?.keywords} />

			<meta name="author" content={HeadContent?.author} />

			<meta name="robots" content={HeadContent?.robots} />

			<meta property="og:title" content={HeadContent?.ogtitle} />

			<meta property="og:description" content={HeadContent?.ogdescription} />

			<meta property="og:image" content={HeadContent?.ogimage?.url} />

			<meta property="og:url" content={HeadContent?.url}/>

			<meta property="og:type" content={HeadContent?.type} />

			<link rel="icon" href={HeadContent?.icon?.url} />
			</Head>
			<Navbar activePage="logicloom"/>


			<section className="relative table w-full lg:py-40 md:py-36 pt-36 pb-24 overflow-hidden bg-white dark:bg-slate-900">
				<div className="container relative z-1">
					<div className="relative grid lg:grid-cols-12 grid-cols-1 items-center mt-10 gap-[30px]">
						<div className="lg:col-span-7">
							<div className="lg:me-6 lg:text-start text-center">
								<h1 className="font-bold lg:leading-normal leading-normal text-4xl lg:text-6xl ">
								</h1>
								<h1 className="font-bold lg:leading-normal leading-normal text-2xl lg:text-4xl mb-5">
									{featureData?.main?.title}
								</h1>
								<p className="text-lg max-w-xl lg:ms-0 mx-auto">

								{featureData?.main?.description}
								</p>
								<div className="subcribe-form mt-6 mb-3  w-full">
									<button type="submit" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center  h-[46px] bg-amber-400 hover:bg-amber-500 border border-amber-400 hover:border-amber-500 text-white rounded-md">Get Started</button>


								</div>
							</div>
						</div>

						<div className="lg:col-span-5">
							<div className="relative after:content-[''] after:absolute lg:after:-top-0 after:-top-10 after:-right-32 after:w-[36rem] after:h-[36rem] after:border-2 after:border-dashed after:border-slate-700/10 dark:after:border-slate-200/10 after:rounded-full after:animate-[spin_120s_linear_infinite] after:-z-1 before:content-[''] before:absolute lg:before:-top-24 before:-top-36 before:-right-56 before:w-[48rem] before:h-[48rem] before:border-2 before:border-dashed before:border-slate-700/10 dark:before:border-slate-200/10 before:rounded-full before:animate-[spin_240s_linear_infinite] before:-z-1">
								<div className="relative after:content-[''] after:absolute lg:after:-top-24 after:-top-10 after:-right-0 after:w-[42rem] after:h-[42rem] after:bg-gradient-to-tl after:to-amber-400/30  after:from-fuchsia-600/30 dark:after:to-amber-400/50 dark:after:from-fuchsia-600/50 after:blur-[200px] after:rounded-full after:-z-1">
								<Image
									 src={featureData?.main?.image?.url}
										height={800}
										width={800}
										className="lg:max-w-2xl lg:ms-14"
										alt=""
										unoptimized={true}
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

				<div className="container relative md:mt-24 mt-16">
					<div className="grid grid-cols-1 pb-6 text-center">
						<h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">{featureData?.howworks?.title}</h3>
						<p className="text-slate-400 max-w-xl mx-auto">
						{featureData?.howworks?.description}
						</p>
					</div>
					<div className="grid md:grid-cols-3 grid-cols-1 mt-6 gap-6">
						{
						featureData?.works?.map((item: any, index: number) => {
							return (
								<div className="relative p-6 border-2 rounded-xl"
									key={index}>
									<i className={
										`${
											item.icon
										} bg-gradient-to-tl to-amber-400 from-fuchsia-600 bg-clip-text text-[45px]`
									}></i>

									<h5 className="text-xl font-semibold my-5">
										{
										item.title
									}</h5>

									<p className="text-slate-400">
										{
										item.description
									}</p>
								</div>
							)
						})
					} </div>
				</div>

				<FrameWorkFeatures  features={featureData?.codesquad} featuredata={featureData?.codesquaddata}/>
				
				</section>
			<Footer/>
			<Switcher/>
		</>
	)
}


export default LogicLoom