import React, { useEffect } from "react";
import Link  from "next/link";
import type { NextPage } from 'next'
import image3 from "../../public/images/3.png";
import {
  FaGitAlt,
  VscDebugDisconnect,
  MdFitScreen,
  MdFileUpload,
} from "../../assets/icons/vander";
import Head from "next/head";
import Footer from "../../components/footer";
import Switcher from "../../components/switcher";
import local from "../../public/images/featuresPage/local.png";
import install from "../../public/images/featuresPage/install.png";
import "../../node_modules/react-modal-video/css/modal-video.css";
import Image from "next/image";
import Navbar from "../../components/navbar";


export async function getStaticProps() {
  try {
    const apiUrl = process.env.STRAPI; 
    const res2 = await fetch(`${apiUrl}/api/mainpagedata?populate[codeboltfeature][populate]=*`);
    const res3 = await fetch(`${apiUrl}/api/head`);
    const HeadContent = await res3.json();
    const featureData = await res2.json();
    return {
      props: {
        featureData: featureData?.data?.codeboltfeature,
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

const Features: NextPage<{ featureData: any, HeadContent: any }> = ({ featureData, HeadContent}) => {

  useEffect(() => {
    document.documentElement.setAttribute("dir", "ltr");
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
  }, []);

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

      <Navbar activePage="features"/>
      <section className="relative md:py-44 py-32 bg-no-repeat bg-bottom bg-cover" style={{backgroundImage:"url('/images/bg/bg-pages.jpg')"}}>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-slate-900/70"></div>
        <div className="container relative">
          <div className="grid grid-cols-1 text-center mt-6">
            <div>
              <h5 className="md:text-4xl text-3xl md:leading-normal leading-normal tracking-wider font-semibold text-white mb-0">
                Features
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
                Features
              </li>
            </ul>
          </div>
        </div>
      </section>
      <div className="relative">
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
      </div>

      
      <div className="container w-full sidebarContainer" >
        <div className="sidebar">
          <ul>
            {featureData?.map((item: any, index: number) => (
              <li key={index} className="py-2">
                <a href={`#section${index}`} onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(`section${index}`);
                  if(element) {
                    element.scrollIntoView({
                      behavior: 'smooth'
                    });
                  }
                }} className="hover:text-amber-400">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="container w-full sidebarContent">
          {featureData?.map((item: any, index: number) => {
            // const IconComponent = item.icon;
            return (
              <div id={`section${index}`} key={index} className="flex mt-20">
                {/* <div className="h-12 w-12 flex p-2 border-2 border-amber-400 text-center rounded-full  me-2">
                 <IconComponent className="h-full w-full" />
                </div> */}

                <div className="">
                  <h1 className="text-2xl font-semibold p-2">{item.title}</h1>
                  <p className="p-2">{item.description}</p>
                  <div className="mt-2 bg-gradient-to-tl to-amber-400 from-fuchsia-600 rounded-lg">
                    <Image width={800} height={800} src={item?.images?.url} alt="" className="rounded-lg p-5" unoptimized={true}/>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
      <Switcher />
    </>
  );
}


export default Features;