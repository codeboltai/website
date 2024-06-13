import React from "react";

import feature2 from '../public/images/features2.jpg'
import feature3 from '../public/images/features3.jpg'
import feature4 from '../public/images/features4.jpg'
import Image from "next/image";


export default function Features({classlist}:any){
    const featuresData = [
        {
            image:feature2,
            title:"Agent Creation Functionality.",
            desc:"Empower your workflow with CodeBolt's agent creation functionality. Agents tailored to your needs and preferences."
        },
        {
            image:feature3,
            title:"Seamless Model Integration.",
            desc:" CodeBolt simplifies the integration of additional models into your agents, enhancing their capabilities with professionalism and ease."
        },
        {
            image:feature4,
            title:"Versatile Agent Selection.",
            desc:" CodeBolt enables users to seamlessly switch between specialized agents for different tasks, optimizing efficiency and workflow management."
        },
    ]
    return(
        <>
            <div className={classlist}>
                <div className="grid grid-cols-1 pb-6 text-center">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">AI + CodeEditor = <br/> outstanding <span className="bg-gradient-to-br from-amber-400 to-fuchsia-600 text-transparent bg-clip-text">CodeBolt</span></h3>

                    <p className="text-slate-400 max-w-xl mx-auto">
                    Imagine the intelligence of AI code generation combined with the versatility of agent-based workflow,welcome to Codebolt, where innovation meets efficiency!
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-6 gap-6">
                    {featuresData.map((item,index) => {
                        return(
                        <div className="relative overflow-hidden bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-gray-800" key={index}>
                            <div className="p-6 pb-0 relative overflow-hidden after:content-[''] after:absolute after:inset-0 after:mx-auto after:w-72 after:h-72 after:bg-gradient-to-tl after:to-amber-400 after:from-fuchsia-600 after:blur-[80px] after:rounded-full">
                                <Image  height={800} width={800} src={item.image} className="relative rounded-t-md shadow-md dark:shadow-slate-700 z-1 h-72 " alt=""/>
                            </div>

                            <div className="p-6">
                                <h5 className="text-lg font-semibold">{item.title}</h5>
                                <p className="text-slate-400 mt-3">{item.desc}</p>
                            </div>
                        </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}