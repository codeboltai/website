import React from "react";
import Link  from "next/link";
import feature5 from "../../public/images/features5.png";

import {FiCheckCircle, MdKeyboardArrowRight} from '../../assets/icons/vander'
import Image from "next/image";

export default function AboutOne(){
    return(
        <>
        <div className="container relative md:mt-24 mt-16">
            <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-6">
                <div className="relative overflow-hidden rounded-lg border border-amber-400/5 bg-gradient-to-tl to-amber-400/30  from-fuchsia-600/30 dark:to-amber-400/50 dark:from-fuchsia-600/50 ps-6 pt-6 lg:me-8">
                    <Image width={800} height={800} src={feature5} className="ltr:rounded-tl-lg rtl:rounded-tr-lg" alt=""/>
                </div>

                <div className="">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Unleash the Power of AI Agents with Ease</h3>
                    <p className="text-slate-400 max-w-xl">"Empower users to effortlessly create AI agents by simply reading our comprehensive documentation, streamlining the agent creation process."</p>

                    <ul className="list-none text-slate-400 mt-4">
                        <li className="mb-2 flex items-center"><div className="h-5 w-5 me-2"><FiCheckCircle className="text-amber-400 h-5 w-5 me-2"/>  </div>Seamless Integration: Seamlessly integrate AI agent creation into your workflow by following our clear and concise documentation.</li>
                        <li className="mb-2 flex items-center"><div className="h-5 w-5 me-2"><FiCheckCircle className="text-amber-400 h-5 w-5 me-2"/>  </div>Efficiency Boost: Save time and resources with a straightforward process that eliminates the need for complex coding or specialized training.</li>
                        <li className="mb-2 flex items-center"><div className="h-5 w-5 me-2"><FiCheckCircle className="text-amber-400 h-5 w-5 me-2"/>  </div> <>Customization: </>  Tailor AI agents to your specific needs by following our step-by-step instructions, ensuring your agents are perfectly suited to your tasks.</li>
                    </ul>

                    <div className="mt-4">
                        <Link href="https://docs.codebolt.ai/?docusaurus-theme=dark" target="_blank" className="hover:text-amber-400 font-medium duration-500 inline-flex items-center">Find Out More <MdKeyboardArrowRight className="ms-1 text-[20px]"/></Link>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}