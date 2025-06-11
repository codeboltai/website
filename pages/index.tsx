import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar'
import AboutOne from '../components/index/aboutOne'
import Video from '../components/Video'
import Footer from '../components/footer'
import AgentAboutTwo from '../components/index/aboutTwo'
import AiAgents from '../components/index/aiAgents'
import { Agent } from '../types/types'
import Customize from '../components/index/Customise'
import Features from '../components/index/features'
import Cards from '../components/index/Cards'
import Action from '../components/index/Action'
import Switcher from '../components/switcher'
import LeftLayout from '../components/index/LeftLayout'
import RightLayout from "../components/index/RightLayout"

export async function getStaticProps() {
  try {
    const apiUrl = process.env.STRAPI; 
    const res = await fetch('https://codeboltai.web.app/api/agents/list');
    const res2 = await fetch(`${apiUrl}/api/mainpagedata?pLevel`);

    const res3 = await fetch(`${apiUrl}/api/head`);
    const HeadContent = await res3.json();

    const MainContent = await res2.json();
    const agents = await res.json();
    return {
      props: {
        agents,
        MainContent: MainContent,
        apiUrl:apiUrl,
        HeadContent: HeadContent
      }
    };
  } catch (error) {
    console.error('Failed to fetch agents:', error);
    return {
      props: {
        agents: [],
        MainContent: [],
        apiUrl:'',
        HeadContent: []
      }
    };
  }
}

const Home: NextPage<{ agents: Agent[], MainContent: any, apiUrl: any, HeadContent: any }> = ({ agents, MainContent, apiUrl , HeadContent}) => {
  const [downloadText, setDownloadText] = useState('Download Codebolt');

  useEffect(() => {
    const detectOS = () => {
      const platform = window.navigator.platform;
      console.log(platform);
      const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
      const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];

      if (macosPlatforms.indexOf(platform) !== -1) {
        setDownloadText('Download for Mac');
      } else if (windowsPlatforms.indexOf(platform) !== -1) {
        setDownloadText('Download for Windows');
      } else {
        setDownloadText('Download Codebolt');
      }
    };

    detectOS();
  }, []);

  return (
    <div className={styles.container}>
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
      <Navbar activePage="home"></Navbar>
        <section className="relative table w-full lg:py-40 md:py-36 pt-36 pb-24 overflow-hidden bg-white dark:bg-slate-900">
            <div className="container relative z-1">
                <div className="relative grid lg:grid-cols-12 grid-cols-1 items-center mt-10 gap-[30px]">
                    <div className="lg:col-span-7">
                        <div className="lg:me-6 lg:text-start text-center">
                            <h1 className="font-bold lg:leading-normal leading-normal text-4xl lg:text-4xl mb-5">
                              {MainContent?.data?.title}
                              </h1>
                            <p className="text-lg max-w-xl lg:ms-0 mx-auto">
                               {MainContent?.data?.description}
                               </p>
                            <div className="subcribe-form mt-6 mb-3">
                            <Link
                              href="https://github.com/codeboltai/codebolt/releases"
                                className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded-md"
                                target="_blank"
                            >
                              {downloadText}{" "}
                            </Link>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5">
                        <div className="relative after:content-[''] after:absolute lg:after:-top-0 after:-top-10 after:-right-32 after:w-[36rem] after:h-[36rem] after:border-2 after:border-dashed after:border-slate-700/10 dark:after:border-slate-200/10 after:rounded-full after:animate-[spin_120s_linear_infinite] after:-z-1 before:content-[''] before:absolute lg:before:-top-24 before:-top-36 before:-right-56 before:w-[48rem] before:h-[48rem] before:border-2 before:border-dashed before:border-slate-700/10 dark:before:border-slate-200/10 before:rounded-full before:animate-[spin_240s_linear_infinite] before:-z-1">
                            <div className="relative after:content-[''] after:absolute lg:after:-top-24 after:-top-10 after:-right-0 after:w-[42rem] after:h-[42rem] after:bg-gradient-to-tl after:to-amber-400/30  after:from-fuchsia-600/30 dark:after:to-amber-400/50 dark:after:from-fuchsia-600/50 after:blur-[200px] after:rounded-full after:-z-1">
                                <Image src="/images/codebolt.png" width={0} height={0} sizes="100vw" style={{width:"1175px", height:"auto"}} className="lg:max-w-none lg:ms-14 rounded-md" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> 
        {/* <Main /> */}
      <section className="relative ">
        <Video/>
        {MainContent?.data?.features.map((feature: any) => {
        const { id, title, description, leftRightStatus, image } = feature;
        if (leftRightStatus === "Left") {
          return (
            <LeftLayout
              key={id}
              title={title}
              description={description}
              image={image}
            />
          );
        } else if (leftRightStatus === "Right") {
          return (
            <RightLayout
              key={id}
              title={title}
              description={description}
              image={image}
            />
          );
        }
        return null;
      })}
        <Features featureData={MainContent?.data?.codeboltfeature}/>
        <Cards  developerData={MainContent?.data?.developers} BusinessData={MainContent?.data?.Businesses}/>
        <Action actionData={MainContent?.data?.Actions}/>
      </section>
      <Footer></Footer>
      <Switcher/>
    </div>
  )
}

export default Home
