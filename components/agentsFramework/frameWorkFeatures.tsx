import React from "react";
import {FiEdit2, FiAirplay, FiCreditCard, FiGlobe, FiLayout,FiLifeBuoy,FaBuilding,FaClock,CgDebug,FaChartBar,FaMagic,GoVersions} from "../../assets/icons/vander"

interface Feature {
    title: string;
    description: string;
    icon: string;
    image: string;
  }
  
  type FrameWorkProps = {
    features: Feature;
    featuredata: Feature[]; // Corrected to an array of Feature objects
  };
  
  
const FrameWorkFeatures: React.FC<FrameWorkProps> = ({ features, featuredata }) => {

    // const featureData = [
    //     {
    //         icon: FaBuilding,
    //         title:' Modular AI Agents',
    //         desc:' This specializes in tasks such as code completion, syntax checking, and error detection, working together to provide a cohesive and efficient development experience.'
    //     },
    //     {
    //         icon:FaClock,
    //         title:'Real-Time Assistance',
    //         desc:'Provides context-aware code completions and dynamic error detection, continuously enhancing code quality as developers work.'
    //     },
    //     {
    //         icon:CgDebug,
    //         title:'Advanced Debugging Tools',
    //         desc:'Offers sophisticated, AI-powered debugging capabilities that swiftly identify and resolve issues with step-by-step guidance.'
    //     },
    //     {
    //         icon:FaChartBar,
    //         title:'Scalability',
    //         desc:'Easily scale your AI solutions to match your business growth without compromising performance, thanks to the robust infrastructure of CodeSquad.'
    //     },
    //     {
    //         icon:FaMagic,
    //         title:'No Coding Required',
    //         desc:'Adjust and deploy AI agents without any need for deep technical knowledge, making advanced AI accessible to all users.'
    //     },
    //     {
    //         icon: GoVersions,
    //         title:'Collaboration and Version Control Integration',
    //         desc:'Codebolt seamlessly integrates with version control systems like Git and facilitates collaborative development by providing AI-assisted code reviews and feedback.'
    //     },
    // ]
    return(
        <>
        <div className="container relative md:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-6 text-center">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">{features?.title}</h3>

                    <p className="text-slate-400 max-w-xl mx-auto">
                        {features?.description}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 grid-cols-1 mt-6 gap-6">
                    {featuredata?.map((item: Feature,index: number)=>{
                        // const Icon = item.icon
                        return(
                            <div className="group flex duration-500 xl:p-3" key={index}>
                                <div className="flex align-middle justify-center items-center w-14 h-14 mt-1 bg-amber-400/5 group-hover:bg-amber-400 group-hover:text-white border-2 border-amber-400/20 text-amber-400 rounded-lg text-2xl shadow-sm dark:shadow-gray-800 duration-500">
                                    {/* <Icon className="w-5 h-5"/> */}
                                </div>
                                <div className="flex-1 ms-4">
                                    <h4 className="mb-0 text-lg font-semibold">{item.title}</h4>
                                    <p className="text-slate-400 mt-2">{item.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}


export default FrameWorkFeatures;