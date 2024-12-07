import React from 'react';
import Head from 'next/head';
import Navbar from "../../components/navbar";
import Link from 'next/link';
import Avatar, { genConfig } from 'react-nice-avatar';
import { FiDownload } from "react-icons/fi";
import Footer from '../../components/footer';
import ReactMarkdown from 'react-markdown';
import { Blog } from '../../types/types';
import { useRouter } from 'next/router';
import type {NextPage} from 'next';
import Image from 'next/image';
import {FiHeart,FiMessageCircle, FiUser,FiMail} from '../../assets/icons/vander'


// For dynamic routing, use getStaticPaths along with getStaticProps
export async function getStaticPaths() {
    const apiUrl = process.env.STRAPI;
  const res = await fetch(`${apiUrl}/api/blogs?pLevel`);
  const blogs = await res.json();
  // Generate paths for each blog post
  const paths = blogs.data?.map((blog: Blog) => ({
    params: { blog: blog.slug }
  }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }: { params: { blog: string } }) {

    const apiUrl = process.env.STRAPI;
  const res = await fetch(`${apiUrl}/api/blogs?pLevel`);
  const res3 = await fetch(`${apiUrl}/api/head`);
  const HeadContent = await res3.json();
  const blogs = await res.json();
	const blog = blogs?.data?.find((a: Blog) => a.slug === params.blog);
  return {
    props: {
      blog: blog,
      HeadContent: HeadContent
    }
  };
}

const BlogDetails: NextPage < {
	blog: any,
	HeadContent: any
} > = ({blog, HeadContent}) => {

  return (
    <div>
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

      <Navbar activePage="blogs" />
      <main>
      <section className="relative md:pt-44 pt-36 bg-gradient-to-b from-amber-400/20 dark:from-amber-400/40 to-transparent">
            <div className="container relative">
                <div className="md:flex justify-center">
                    <div className="lg:w-2/3 md:w-4/5">
                        <Link href="" className="bg-amber-400 text-white text-[12px] font-semibold px-2.5 py-0.5 rounded h-5">{blog?.slug}</Link>
                        <h5 className="md:text-4xl text-3xl font-bold md:tracking-normal tracking-normal md:leading-normal leading-normal mt-3">{blog?.title}</h5>
                        <p className="text-slate-400 text-lg mt-3">Hello there! I am ChatGPT, a language model developed by OpenAI, based on the powerful GPT (Generative Pre-trained Transformer) architecture.</p>

                        {/* <div className="flex items-center mt-5">
                            <Image src={blog?.client} width={48} height={48} className="h-12 w-12 rounded-full" alt=""/>
                            <div className="ms-2">
                                <h6><Link href="" className="font-medium hover:text-amber-400">{data?.author}</Link><Link href="" className="ms-1 text-green-600 font-medium"><i className="mdi mdi-circle-medium"></i>Follow</Link></h6>
                                <span className="text-slate-400 text-sm">{data?.date}<span><i className="mdi mdi-circle-medium"></i>6 min read</span></span>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>

        <section className="relative md:pb-24 pb-16 pt-7">
            <div className="container relative">
                <div className="md:flex justify-center">
                    <div className="lg:w-2/3 md:w-4/5">
                        <Image src={blog?.image?.url} width={0} height={0} sizes="100vw" style={{width:"100%", height:"auto"}} className="rounded-md" alt=""
                        unoptimized={true}
                        />

                        <p className="text-slate-400 mt-4">
                            {blog?.description}
                        </p>
                        
        
                        
                        {/* <div className="relative rounded-md border-s-4 border-amber-400 px-6 py-10 mt-4">
                            <p className="text-2xl font-medium">Its still not confirmed whether Google algorithm supports AI generated content or not</p>
                            <p className="text-slate-400 mt-4 text-end">- Mortal.Ai</p>
                            <div className="absolute text-8xl -top-0 start-4 text-amber-500/10 dark:text-amber-500/20 -z-1">
                                <i className="mdi mdi-format-quote-open"></i>
                            </div>
                        </div>
                        <p className="text-slate-400 mt-4">On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue.</p> */}

                        {/* <div className="flex justify-between py-4 border-y border-gray-100 dark:border-gray-700 mt-5">
                            <ul className="list-none">
                                <li className="inline"><Link href="#" className="inline-flex items-center text-slate-400"><FiHeart className="h-4 w-4 text-slate-900 dark:text-white hover:text-amber-400 me-1"/> 233</Link></li>
                                <li className="inline ms-2"><Link href="#" className="inline-flex items-center text-slate-400"><FiMessageCircle className="h-4 w-4 text-slate-900 dark:text-white hover:text-amber-400 me-1"/> 08 </Link></li>
                            </ul>

                            <ul className="list-none">
                                <li className="inline"><Link href="#" className="inline-flex items-center text-slate-400"><i data-feather="share-2" className="h-4 w-4 text-slate-900 dark:text-white hover:text-amber-400"></i></Link></li>
                            </ul>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetails;
