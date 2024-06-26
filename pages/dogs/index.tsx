import type {GetStaticProps, NextPage}
from "next";
import Head from "next/head";
import Link from "next/link";

const Doggo: NextPage = () => {
	return (
		<div>
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
			<main>
				<h1>Check out our doggos.</h1>


				<p style={
					{color: "#0070f3"}
				}>
					<Link href="/">Back Home</Link>
				</p>
			</main>
		</div>
	);
};

export default Doggo;
