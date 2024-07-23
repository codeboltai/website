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
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Experience the Power of AI Agents with Ease</h3>
                    <p className="text-slate-400 max-w-xl">Create AI agents effortlessly with our easy-to-follow documentation.Simplify the process and empower your creations.
                    </p>

                    <ul className="list-none text-slate-400 mt-4">
                        <li className="mb-2 flex items-center"><div className="h-5 w-5 me-2"><FiCheckCircle className="text-amber-400 h-5 w-5 me-2"/>  </div>Easily add AI agents to your workflow with our simple, clear documentation.</li>
                        <li className="mb-2 flex items-center"><div className="h-5 w-5 me-2"><FiCheckCircle className="text-amber-400 h-5 w-5 me-2"/>  </div>Save time and resources with a simple process. No complex coding or special training needed.</li>
                        <li className="mb-2 flex items-center"><div className="h-5 w-5 me-2"><FiCheckCircle className="text-amber-400 h-5 w-5 me-2"/>  </div> <>Customization: </> Customize AI agents for your needs with our easy step-by-step guide.
                        </li>
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