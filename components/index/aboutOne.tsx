import React, { useState } from "react";
import Link from "next/link";
import feature5 from "../../public/images/features5.png";

import {FiCheckCircle, MdKeyboardArrowRight} from '../../assets/icons/vander'
import Image from "next/image";

export default function AboutOne() {

    const [showmoreDeveloper, setShowMoreDeveloper] = useState(false)
    const [showmoreEnterprises, setShowMoreEnterprises] = useState(false)

	return (
		<>
			<div className="container relative md:mt-16 mt-16 ">
				<div className="grid md:grid-cols-2 grid-cols-1 gap-6">
				<div className="">
					<h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">For Enterprises</h3>

					<ul className="list-none text-slate-400 mt-4">

                    <li className="mb-2 flex items-start">
                        <div className="h-5 w-5 me-2 flex-shrink-0 mt-1">
                            <FiCheckCircle className="text-amber-400 h-5 w-5 " />
                        </div>
                        <span>
                        New wave of customising softwares to the exact needs where the enterprise can themselves customise it using AI agents.
                        </span>
                        </li>
						

                        <li className="mb-2 flex items-start">
                        <div className="h-5 w-5 me-2 flex-shrink-0 mt-1">
                            <FiCheckCircle className="text-amber-400 h-5 w-5 " />
                        </div>
                        <span>
                            <strong className="mr-4">Accelerated Development:</strong> Enterprises can leverage CodeBolt to accelerate the development of software applications, reducing time-to-market and gaining a competitive advantae.
                        </span>
                        </li>

                     {showmoreEnterprises && (<>   <li className="mb-2 flex items-start">
                        <div className="h-5 w-5 me-2 flex-shrink-0 mt-1">
                            <FiCheckCircle className="text-amber-400 h-5 w-5 " />
                        </div>
                        <span>
                            <strong className="mr-4">Cost Reduction:</strong>  By automating repetitive coding tasks, enterprises can optimize resources and reduce development costs.
                        </span>
                        </li>

                        <li className="mb-2 flex items-start">
                        <div className="h-5 w-5 me-2 flex-shrink-0 mt-1">
                            <FiCheckCircle className="text-amber-400 h-5 w-5 " />
                        </div>
                        <span>
                            <strong className="mr-4">Increased Revenue:</strong>  CodeBolt's ability to adapt software to specific needs can lead to greater usability, driving revenue growth for enterprises..
                        </span>
                        </li>
                        </>)}

                        <div className="mt-4 ml-4">
						<button className="hover:text-amber-400 font-medium duration-500 inline-flex items-center" onClick={()=> setShowMoreEnterprises(!showmoreEnterprises)}> {showmoreEnterprises ? 'Read Less' : 'Read More'}
							<MdKeyboardArrowRight className="ms-1 text-[20px]"/></button>
					</div>

					</ul>
                </div>

				<div className="">
					<h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">For Developers</h3>
					{/* <p className="text-slate-400 max-w-xl">Create AI agents effortlessly with our easy-to-follow documentation.Simplify the process and empower your creations.
                    </p> */}

					<ul className="list-none text-slate-400 mt-4">

                    <li className="mb-2 flex items-start">
                        <div className="h-5 w-5 me-2 flex-shrink-0 mt-1">
                            <FiCheckCircle className="text-amber-400 h-5 w-5 " />
                        </div>
                        <span>
                            <strong className="me-4">Enhanced Productivity:</strong> CodeBolt's AI-powered code editor eliminates the need for manual coding, testing, and deployment, thereby saving developers time and effort.
                        </span>
                        </li>
	

                        <li className="mb-2 flex items-start">
                        <div className="h-5 w-5 me-2 flex-shrink-0 mt-1">
                            <FiCheckCircle className="text-amber-400 h-5 w-5 " />
                        </div>
                        <span>
                            <strong className="me-4">Simplified Software Customization:</strong> Developers can easily create software using existing AI agents and tools.
                        </span>
                        </li>

					{showmoreDeveloper && (<><li className="mb-2 flex items-center">
							<div className="h-5 w-5 me-2"><FiCheckCircle className="text-amber-400 h-5 w-5 me-2"/>
							</div>
							Providing unified functionalities for developers to easily create custom agents so that their customers can do customisations by themselves.
						</li>


                        <li className="mb-2 flex items-start">
                        <div className="h-5 w-5 me-2 flex-shrink-0 mt-1">
                            <FiCheckCircle className="text-amber-400 h-5 w-5 " />
                        </div>
                        <span>
                            <strong className="me-4">Improved Efficiency:</strong>AI agent playbooks enable developers to streamline the development process, resulting in faster delivery times.
                        </span>
                        </li>


                        <li className="mb-2 flex items-start">
                        <div className="h-5 w-5 me-2 flex-shrink-0 mt-1">
                            <FiCheckCircle className="text-amber-400 h-5 w-5 " />
                        </div>
                        <span>
                            <strong className="me-4">Enhanced Productivity:</strong> CodeBolt's AI-powered code editor eliminates the need for manual coding, testing, and deployment, thereby saving developers time and effort.
                        </span>
                        </li>
                        </>)}
                        <div className="mt-4 ml-4">
						<button className="hover:text-amber-400 font-medium duration-500 inline-flex items-center" onClick={()=> setShowMoreDeveloper(!showmoreDeveloper)}> {showmoreDeveloper ? 'Read Less' : 'Read More'}
							<MdKeyboardArrowRight className="ms-1 text-[20px]"/></button>
					</div>

					</ul>

					{/* <div className="mt-4">
						<Link href="https://docs.codebolt.ai/?docusaurus-theme=dark" target="_blank" className="hover:text-amber-400 font-medium duration-500 inline-flex items-center">Find Out More
							<MdKeyboardArrowRight className="ms-1 text-[20px]"/></Link>
					</div> */}
					{/* </div> */} 
                </div>
                </div>
				
			</div>
		</>
	)
}
