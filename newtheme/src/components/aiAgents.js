import React from "react";
import { Link } from "react-router-dom";

export default function AiAgents(){
    const featureData = [
        {
            icon:"mdi mdi-flip-horizontal",
            title:'Website Creator',
            desc:'The phrasal sequence of the is now so that many campaign and benefit'
        },
        {
            icon:"mdi mdi-email-edit-outline",
            title:'Content Generator',
            desc:'The phrasal sequence of the is now so that many campaign and benefit'
        },
        {
            icon:"mdi mdi-star-outline",
            title:'Search Engine Optimization',
            desc:'The phrasal sequence of the is now so that many campaign and benefit'
        },
        // {
        //     icon:"mdi mdi-bookmark-outline",
        //     title:'Digital name generator',
        //     desc:'The phrasal sequence of the is now so that many campaign and benefit'
        // },
        // {
        //     icon:"mdi mdi-account-check-outline",
        //     title:'Ad Targeting tips',
        //     desc:'The phrasal sequence of the is now so that many campaign and benefit'
        // },
        // {
        //     icon:"mdi mdi-comment-outline",
        //     title:'Content Rewriter',
        //     desc:'The phrasal sequence of the is now so that many campaign and benefit'
        // },
    ]
    return(
        <>
        <div className="container relative md:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-6 text-center">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Meet Some AI Agents</h3>

                    <p className="text-slate-400 max-w-xl mx-auto">Find Various AI Agents in the Codebolt Marketplace. Codebolt Editor also supports creating custom AI Agents. You can also Publish the AI Agents in the Marketplace.</p>
                </div>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-6 gap-6">
                    {featureData.map((item, index) =>{
                        return(
                            <div className="px-6 py-10 shadow hover:shadow-md dark:shadow-gray-800 dark:hover:shadow-gray-700 duration-500 rounded-lg bg-white dark:bg-slate-900" key={index}>
                                <i className={`${item.icon} text-4xl bg-gradient-to-tl to-amber-400 from-fuchsia-600  bg-clip-text`}></i>
        
                                <div className="content mt-7">
                                    <Link to="" className="title h5 text-lg font-medium hover:text-amber-400 duration-500">{item.title}</Link>
                                    <p className="text-slate-400 mt-3">The phrasal sequence of the is now so that many campaign and benefit</p>
                                    
                                    {/* <div className="mt-5">
                                        <Link to="" className="hover:text-amber-400 font-medium duration-500">Read More <i className="mdi mdi-arrow-right align-middle"></i></Link>
                                    </div> */}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="text-center mt-6">
                    <Link to="/ai-agent-marketplace" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded-md">Explore AI Agent Marketplace</Link>
                </div>
            </div>
        </>
    )
}