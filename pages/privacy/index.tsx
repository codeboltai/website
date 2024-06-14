import React, {useEffect} from "react";

import Footer from "../../components/footer";
import Switcher from "../../components/switcher";
import Link from "next/link";
import Head from "next/head";
export default function Privacy() {
	useEffect(() => {
		document.documentElement.setAttribute("dir", "ltr");
		document.documentElement.classList.add("dark");
		document.documentElement.classList.remove("light");
	}, []);
	return (
		<>

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
			<section className="relative md:pt-44 pt-32 pb-8 bg-gradient-to-b from-amber-400/20 dark:from-amber-400/40 to-transparent">
				<div className="container relative">
					<div className="grid grid-cols-1 text-center mt-6">
						<div>
							<h5 className="md:text-4xl text-3xl md:leading-normal leading-normal tracking-wider font-semibold mb-0">
								Privacy Policy
							</h5>
						</div>

						<ul className="tracking-[0.5px] mb-0 inline-block mt-5">
							<li className="inline-block capitalize font-medium duration-500 ease-in-out hover:text-amber-400">
								<Link href="/">CodeBolt</Link>
							</li>
							<li className="inline-block text-base mx-0.5 ltr:rotate-0 rtl:rotate-180">
								<i className="mdi mdi-chevron-right"></i>
							</li>
							<li className="inline-block capitalize font-medium duration-500 ease-in-out text-amber-400" aria-current="page">
								Privacy
							</li>
						</ul>
					</div>
				</div>
			</section>
			<section className="relative md:py-24 py-16">
				<div className="container relative">
					<div className="md:flex justify-center">
						<div className="md:w-3/4">
							<div className="p-6 bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 rounded-md">
								<h5 className="text-xl font-semibold mb-4">Overview :</h5>
								<p className="text-slate-400">
									At Codebolt, we are committed to protecting the privacy of our
									                  users. This Privacy Policy outlines how we collect, use,
									                  disclose, and protect your personal information when you use
									                  our Codebolt Editor software.
								</p>

								<h5 className="text-xl font-semibold mb-4 mt-8">
									1. Information We Collect:
								</h5>
								<ul className="list-none text-slate-400 mt-4  gap-2">
									<li className=" mt-2">
										- Personal Information: When you use the Codebolt Editor, we
										                    may collect personal information such as your name, email
										                    address, and contact information. This information is
										                    collected when you register for an account or voluntarily
										                    provide it while using our services.
									</li>
									<li className=" mt-2">
										- Usage Data: We may also collect usage data such as your IP
										                    address, browser type, operating system, and device
										                    information. This information helps us improve the
										                    performance and usability of our software.
									</li>
								</ul>
								<h5 className="text-xl font-semibold mb-4 mt-8">
									2. How We Use Your Information:
								</h5>
								<ul className="list-none text-slate-400 mt-4  gap-2">
									<li className=" mt-2">
										- To Provide and Improve Our Services: We use your personal
										                    information to provide you with access to the Codebolt
										                    Editor and to improve our services based on your usage
										                    patterns and feedback.
									</li>
									<li className=" mt-2">
										- To Communicate with You: We may use your contact
										                    information to send you important updates, notifications,
										                    and marketing communications related to the Codebolt Editor.
									</li>
								</ul>
								<h5 className="text-xl font-semibold mb-4 mt-8">
									3. Data Security:
								</h5>
								<ul className="list-none text-slate-400 mt-4  gap-2">
									<li className=" mt-2">
										- We employ industry-standard security measures to protect
										                    your personal information from unauthorized access,
										                    disclosure, alteration, or destruction.
									</li>
									<li className=" mt-2">
										- However, please note that no method of transmission over
										                    the internet or electronic storage is 100% secure. While we
										                    strive to protect your personal information, we cannot
										                    guarantee its absolute security.
									</li>
								</ul>
								<h5 className="text-xl font-semibold mb-4 mt-8">
									4. Sharing of Information:
								</h5>
								<ul className="list-none text-slate-400 mt-4  gap-2">
									<li className=" mt-2">
										- We do not sell, trade, or rent your personal information
										                    to third parties without your consent.
									</li>
									<li className=" mt-2">
										- We may share your personal information with trusted
										                    third-party service providers who assist us in operating our
										                    website, conducting our business, or servicing you, as long
										                    as those parties agree to keep this information
										                    confidential.
									</li>
								</ul>
								<h5 className="text-xl font-semibold mb-4 mt-8">
									5. Compliance with Laws:
								</h5>
								<ul className="list-none text-slate-400 mt-4  gap-2">
									<li className=" mt-2">
										- We may disclose your personal information if required to
										                    do so by law or in response to valid legal requests from
										                    government authorities or law enforcement agencies.
									</li>
								</ul>
								<h5 className="text-xl font-semibold mb-4 mt-8">
									6. Updates to this Privacy Policy:
								</h5>
								<ul className="list-none text-slate-400 mt-4  gap-2">
									<li className=" mt-2">
										- We reserve the right to update or modify this Privacy
										                    Policy at any time. Any changes will be effective
										                    immediately upon posting the updated Privacy Policy on our
										                    website.
									</li>
								</ul>
								<div className="mt-10">
									By using the Codebolt Editor, you consent to the collection and use of your personal information as outlined in this Privacy Policy.
								</div>
								<div className="mt-8">
									<Link href="" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded-md">
										Print
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<Footer/>
			<Switcher/>
		</>
	);
}
