import React from "react";
import Link  from "next/link";
// import feature5 from "../../public/images/features5.png";
import feature5 from "../../public/images/agents_icons.png";

import {FiCheckCircle, MdKeyboardArrowRight} from '../../assets/icons/vander'
import Image from "next/image";

export default function AboutOne(){
    return(
        <>
        <div className="container  md:mt-24 mt-16">
            <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-6">
                <div className=" overflow-hidden rounded-lg border border-amber-400/5 bg-gradient-to-tl to-amber-400/30  from-fuchsia-600/30 dark:to-amber-400/50 dark:from-fuchsia-600/50 ps-6 pt-6 lg:me-8">
                    <Image src={feature5} className="ltr:rounded-tl-lg rtl:rounded-tr-lg w-full" alt="" style={{height: "400px"}}/>
                </div>

                <div className="">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Use Or Create Custom AI Agents Right For Your Task</h3>
                   <p className="text-md max-w-xl lg:ms-0">

                    With CodeBolt, developers can easily create AI-driven solutions tailored to specific use cases, integrating deep knowledge of the application, code generation processes, deployment workflows, and security best practices. This powerful platform simplifies the complexities of AI development, empowering teams to build smarter, more efficient tools with greater speed and confidence, all while maintaining robust security standards throughout the lifecycle.
                    </p>
                  <div className="mt-4">
                        <Link href="/agents" className="hover:text-amber-400 font-medium duration-500 inline-flex items-center text-md">Find Out More <MdKeyboardArrowRight className="ms-1 text-[20px]"/></Link>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}