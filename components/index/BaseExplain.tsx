import React from "react";
import {FiEdit2, FiAirplay, FiCreditCard, FiGlobe, FiLayout,FiLifeBuoy} from "../../assets/icons/vander"

// import feature2 from '../../assets/images/features2.jpg'
// import feature3 from '../../assets/images/features3.jpg'
// import feature4 from '../../assets/images/features4.jpg'


export default function BaseExplain({classlist}:any){
    const featureData = [
        {
            icon:FiEdit2,
            title:'AI Generator',
            desc:'Effortlessly generate code snippets and entire functions with intelligent AI.'
        },
        {
            icon:FiAirplay,
            title:'Advanced Dashboard',
            desc:'Monitor and manage your AI agents and workflows with a user-friendly, intuitive dashboard.'
        },
        {
            icon:FiCreditCard,
            title:'Payment Gateways',
            desc:'One disadvantage of Lorum Ipsum is that in Latin frequently than others'
        },
        {
            icon:FiGlobe,
            title:'Multi-Lingual',
            desc:'One disadvantage of Lorum Ipsum is that in Latin frequently than others'
        },
        {
            icon:FiLayout,
            title:'Custom Templates',
            desc:'One disadvantage of Lorum Ipsum is that in Latin frequently than others'
        },
        {
            icon:FiLifeBuoy,
            title:'Support Platform',
            desc:'One disadvantage of Lorum Ipsum is that in Latin frequently than others'
        },
    ]
    return(
        <>
            <div className={classlist}>
                <div className="grid grid-cols-1 pb-6 text-center">
                    <h1 className="mb-4 md:text-4xl md:leading-normal text-3xl leading-normal font-bold"> More than just a Code Editor <br/> but a  <span className="bg-gradient-to-br from-amber-400 to-fuchsia-600 text-transparent bg-clip-text">[[Code Powerhouse]]</span></h1>
                    <p className="text-slate-400 max-w-xl mx-auto">
                    Imagine the intelligence of AI code generation combined with the versatility of agent-based workflow,welcome to Codebolt, where innovation meets efficiency!
                    </p>
                </div>

                {/* <div className="grid grid-cols-1 pb-6 text-center">
                    <h1 className="mb-4 md:text-4xl md:leading-normal text-3xl leading-normal font-bold"> Code Editor built from ground up for Revolutionizing Coding Workflows <br/> outstanding <span className="bg-gradient-to-br from-amber-400 to-fuchsia-600 text-transparent bg-clip-text">CodeBolt</span></h1>
                    <p className="text-slate-400 max-w-xl mx-auto">
                    Imagine the intelligence of AI code generation combined with the versatility of agent-based workflow,welcome to Codebolt, where innovation meets efficiency!
                    </p>
                </div> */}

                <div className="grid md:grid-cols-3 grid-cols-1 mt-6 gap-6">
                    {featureData.map((item,index)=>{
                        const Icon = item.icon
                        return(
                            <div className="group flex duration-500 xl:p-3" key={index}>
                                <div className="flex align-middle justify-center items-center w-14 h-14 mt-1 bg-amber-400/5 group-hover:bg-amber-400 group-hover:text-white border-2 border-amber-400/20 text-amber-400 rounded-lg text-2xl shadow-sm dark:shadow-gray-800 duration-500">
                                    <Icon className="w-5 h-5"/>
                                </div>
                                <div className="flex-1 ms-4">
                                    <h4 className="mb-0 text-lg font-semibold">{item.title}</h4>
                                    <p className="text-slate-400 mt-2">{item.desc}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}