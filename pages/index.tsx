import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar'
import AboutOne from '../components/index/aboutOne'
import AboutThree from '../components/aboutThree'
import AboutTwo from '../components/aboutTwo'
import AiFeatures from '../components/aiFeatures'
import AmazingFeatures from '../components/amazingFeatures'
import Blogs from '../components/blogs'
import BrandLogo from '../components/brandLogo'
import Clients from '../components/clients'
import ClientsTwo from '../components/clientTwo'
import Faq from '../components/Faq'
import Features from '../components/features'
import Footer from '../components/footer'
import Pricing from '../components/pricing'
import Switcher from '../components/switcher'
import classic02 from '/public/images/classic02.png';
import BaseExplain from '../components/index/BaseExplain'
import AgentAboutTwo from '../components/index/aboutTwo'
import AiAgents from '../components/index/aiAgents'
import { Agent } from '../types/types'

export async function getStaticProps() {
  try {
    const res = await fetch('https://codeboltai.web.app/api/agents/list');
    const agents = await res.json();
    return {
      props: {
        agents
      }
    };
  } catch (error) {
    console.error('Failed to fetch agents:', error);
    return {
      props: {
        agents: []
      }
    };
  }
}

const Home: NextPage<{ agents: Agent[] }> = ({ agents }) => {
  return (
    <div className={styles.container}>
      <Head>

        <title>CodeBolt AI</title>

        <meta name="description" content="Codebolt.ai - AI powered Code Editor" />

        <link rel="icon" href="/favicon.ico" />

        <meta name="description" content="Codebolt is a next-gen Code Editor, designed with an AI Agents-first approach. It natively supports AI Code Generation Workflows and can run multiple AI agents tailored to specific coding languages or tasks." />

        <meta name="keywords" content="Code Editor, AI Code Generation, AI Agents, Codebolt, Programming, Software Development" />

        <meta name="author" content="Codebolt Team" />

        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="Codebolt - AI-Centric Code Editor" />

        <meta property="og:description" content="Codebolt is a next-gen Code Editor, designed with an AI Agents-first approach. It natively supports AI Code Generation Workflows and can run multiple AI agents tailored to specific coding languages or tasks." />

        <meta property="og:image" content="/public/images/classic02.png" />

        <meta property="og:url" content="https://www.codebolt.com" />

        <meta property="og:type" content="website" />

        <link rel="icon" href="/favicon.ico" />

      </Head>
      <Navbar activePage="home"></Navbar>
      <section className="relative overflow-hidden pt-48 after:content-[''] after:absolute after:inset-0 after:mx-auto after:w-[56rem] after:h-[56rem] after:bg-gradient-to-tl after:to-amber-400/30  after:from-fuchsia-600/30 dark:after:to-amber-400/50 dark:after:from-fuchsia-600/50 after:blur-[200px] after:rounded-full after:-z-1">
        <div className="container relative z-2">
          <div className="grid grid-cols-1 text-center">
            <div className="">
              {/* <h4 className="font-bold lg:leading-normal leading-normal text-4xl lg:text-6xl mb-5">Code Editor Reimagined For<br/>  
                            <span className="typewrite bg-gradient-to-br from-amber-400 to-fuchsia-600 text-transparent bg-clip-text ms-4">AI Agents</span> to Code
                        </h4> */}
              <h4 className="font-bold lg:leading-normal leading-normal text-4xl lg:text-6xl mb-5">
                Not Human, but
                <br />
                <span className="typewrite bg-gradient-to-br from-amber-400 to-fuchsia-600 text-transparent bg-clip-text ms-4">
                  AI Centric
                </span>{' '}
                Code Editor
              </h4>
              {/* <p className="text-slate-400 dark:text-white/60 text-lg max-w-xl mx-auto">An AI Agent First Code Editor with focus on providing Easy AI Code generation based workflows by utilizing various AI Agents or even provides a simple api to create your own agents</p> */}
              {/* <p className="text-slate-400 dark:text-white/60 text-lg max-w-xl mx-auto">Codebolt is a new Generation of Code Editor that is built from ground up with AI Agents First approach and has native core support for AI Code Generation Workflows</p> */}
              <p className="text-slate-400 dark:text-white/60 text-lg max-w-xl mx-auto">
                Codebolt is an advanced code editor that adopts an AI Agents-first strategy, enabling native support for AI-driven code generation workflows and the execution of multiple specialized AI agents tailored to specific programming languages or tasks.
              </p>

              <div className="mt-6">
                <Link
                  href="/request"
                  className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded-md"
                >
                  Download Codebolt
                </Link>{' '}
                &nbsp;
                {/* <Link
                  href="/about-agents"
                  className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center border-amber-400 hover:border-amber-500 text-amber-400 hover:text-white rounded-md"
                >
                  Codebolt Agent Framework
                </Link> */}
                {/* <p className="text-slate-400 dark:text-white/60 text-sm mt-3">No credit card required. Free 14-days trial</p> */}
              </div>
            </div>
            <div className="relative mt-8 z-3 mx-auto  ">
              <Image src={classic02} width={1000} height={800} alt="Image" className="mover" />
            </div>
          </div>
        </div>

        <div className="relative after:content-[''] after:absolute lg:after:-bottom-40 after:-bottom-28 after:end-0 after:start-0 after:mx-auto xl:after:w-[56rem] lg:after:w-[48rem] md:after:w-[32rem] after:w-[22rem] xl:after:h-[56rem] lg:after:h-[48rem] md:after:h-[32rem] after:h-[22rem] after:border-2 after:border-dashed after:border-slate-700/10 dark:after:border-slate-200/10 after:rounded-full after:-z-1 before:content-[''] before:absolute lg:before:-bottom-72 before:-bottom-56 before:end-0 before:start-0 before:mx-auto xl:before:w-[72rem] lg:before:w-[64rem] md:before:w-[48rem] before:w-[24rem] xl:before:h-[72rem] lg:before:h-[64rem] md:before:h-[48rem] before:h-[24rem] before:border-2 before:border-dashed before:border-slate-700/10 dark:before:border-slate-200/10 before:rounded-full before:-z-1"></div>
      </section>
      <section className="relative md:py-24 py-16">
        {/* <Features classlist="container "/> */}
        <BaseExplain classlist="container relative" />
        <AboutOne />
        <AgentAboutTwo />
        <AiAgents agents={agents} />

      </section>
      {/* <main className={styles.main}>
        <AboutOne></AboutOne>
        <AboutThree></AboutThree>
        <AboutTwo></AboutTwo>
        <AiFeatures></AiFeatures>
        <AmazingFeatures></AmazingFeatures>
        <Blogs></Blogs>
        <BrandLogo></BrandLogo>
        <Clients></Clients>
        <ClientsTwo></ClientsTwo>
        <Faq></Faq>
        <Features></Features>
     
        <Pricing></Pricing>
        <Switcher></Switcher>

        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Let&apos;s check our <Link href="dogs/">doggos</Link>.
        </p>
      </main> */}
      <Footer></Footer>
      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  )
}

export default Home
