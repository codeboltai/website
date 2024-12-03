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

// For dynamic routing, use getStaticPaths along with getStaticProps
export async function getStaticPaths() {
  const res = await fetch('http://localhost:1337/api/blogs');
  const blogs = await res.json();

  // Generate paths for each blog post
  const paths = blogs.data.map((blog: Blog) => ({
    params: { blog: blog.slug }
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }: { params: { blog: string } }) {
  const res = await fetch(`http://localhost:1337/api/blogs`);
  const blogs = await res.json();
	const blog = blogs?.data.find((a: Blog) => a.slug === params.blog);

  return {
    props: {
      blog: blog
    }
  };
}

const BlogPage = ({ blog }: { blog: Blog }) => {
  const config = genConfig(blog.title);

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Codebolt is a next-gen Code Editor, designed with an AI Agents-first approach." />
        <meta name="keywords" content="Code Editor, AI Code Generation, AI Agents, Codebolt, Programming, Software Development" />
        <meta name="author" content="Codebolt Team" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Codebolt - AI-Centric Code Editor" />
        <meta property="og:description" content="Codebolt is a next-gen Code Editor, designed with an AI Agents-first approach." />
        <meta property="og:image" content="/images/classic02.png" /> {/* Fixed image path */}
        <meta property="og:url" content="https://www.codebolt.com" />
        <meta property="og:type" content="website" />
      </Head>

      <Navbar activePage="features" />
      <main>
        <section className="blog-container">
          <div className="blog-header">
            <Avatar {...config} />
            <h1>{blog.title}</h1>
          </div>

          <ReactMarkdown>{blog.description}</ReactMarkdown>
          {/* Add a link to related content or blog */}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
