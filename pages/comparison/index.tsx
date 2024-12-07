import React from 'react';
import Link from 'next/link';
import Head from "next/head";
import Navbar from "../../components/navbar";
import Avatar, { genConfig } from 'react-nice-avatar'
import Footer from '../../components/footer';
import Switcher from '../../components/switcher';
import {ComparisonProps} from '../../types/types';
import Image from 'next/image';
import {FiClock, FiCalendar} from '../../assets/icons/vander'
import Comparison from '../../components/comparison';

export async function getStaticProps() {
    const apiUrl = process.env.STRAPI;
	const res = await fetch(`${apiUrl}/api/comparisons?pLevel`);
	const comparison = await res.json();
    const res3 = await fetch(`${apiUrl}/api/head`);
	const HeadContent = await res3.json();
	return {props: {
        comparison: comparison.data,
        HeadContent: HeadContent
	}};
}

const ComparisonPage = ({comparison, HeadContent}: {comparison: ComparisonProps[], HeadContent: any}) => {
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
        <Navbar activePage="comparison"/>

        <section className="relative md:py-44 py-32  bg-no-repeat bg-bottom bg-cover" style={{backgroundImage:"url('/images/bg/bg-pages.jpg')"}}>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-slate-900/70"></div>
            <div className="container relative">
                <div className="grid grid-cols-1 text-center mt-6">
                    <div>
                        <h5 className="md:text-4xl text-3xl md:leading-normal leading-normal tracking-wider font-semibold text-white mb-0">Comparison</h5>
                    </div>

                    <ul className="tracking-[0.5px] mb-0 inline-block mt-5">
                        <li className="inline-block capitalize text-[15px] font-medium duration-500 ease-in-out text-white/50 hover:text-white"><Link href="/">Codebolt</Link></li>
                        <li className="inline-block text-base text-white/50 mx-0.5 ltr:rotate-0 rtl:rotate-180"><i className="mdi mdi-chevron-right"></i></li>
                        <li className="inline-block capitalize text-[15px] font-medium duration-500 ease-in-out text-white" aria-current="page">Comparison</li>
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

        <section className="relative md:py-24 py-16">
            <div className="container relative">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
					{/* <div className="grid grid-cols-1 pb-6 text-center">
						<h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">You dont have to choose between cost, time and quality</h3>

						<p className="text-slate-400 max-w-xl mx-auto">Artificial intelligence makes it fast easy to create content for your blog, social media, website, and more!</p>
					</div> */}
                    {comparison?.map((item, index) => (
                        <Comparison key={index} data={item} />
                    ))}

					
				</div>
				</div>
				{/* <ClientsTwo/> */}
			</section>

<Footer/>
<Switcher />
		</>
	);
};

export default ComparisonPage;
