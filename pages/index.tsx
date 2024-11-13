import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
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

        <meta property="og:url" content="https://www.codebolt.ai" />

        <meta property="og:type" content="website" />

        <link rel="icon" href="/favicon.ico" />

      </Head>
      <Navbar activePage="home"></Navbar>
  
        <section className="relative table w-full lg:py-40 md:py-36 pt-36 pb-24 overflow-hidden bg-white dark:bg-slate-900">
            <div className="container relative z-1">
                <div className="relative grid lg:grid-cols-12 grid-cols-1 items-center mt-10 gap-[30px]">
                    <div className="lg:col-span-7">
                        <div className="lg:me-6 lg:text-start text-center">
                            <h1 className="font-bold lg:leading-normal leading-normal text-4xl lg:text-4xl mb-5">Effortless Software Customization With Specialised AI Agents</h1>
                            <p className="text-lg max-w-xl lg:ms-0 mx-auto"> Codebolt is a code editor enabling developers to build and use adaptable use-case specific AI agent toolkits. This gives more accurate software generation, allowing developers and even end users to customise complex softwares using text prompts.</p>
                        
                            <div className="subcribe-form mt-6 mb-3">
                            <Link
                              href="#"
                                className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded-md"
                            >
                              Download Codebolt{" "}
                              {/* <MdKeyboardArrowRight className="ms-1 text-[20px]" /> */}
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
        {/* <BaseExplain classlist="container relative" /> */}
        <AgentAboutTwo />
        <AboutOne />
        <Customize />
        <Features/>
        <Cards/>
        <Action/>

        {/* <AiAgents agents={agents} /> */}

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
