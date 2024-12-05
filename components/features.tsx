import React from "react";

import feature2 from '../public/images/features2.jpg'
import feature3 from '../public/images/features3.jpg'
import feature4 from '../public/images/features4.jpg'
import Image from "next/image";


interface Image {
    url: string;
  }

interface Feature {
    title: string;
    description: string;
    icon: string;
    image: Image;
  }
  
  type FrameWorkProps = {
    features: Feature[];
    classlist: string;
    description: string;
    title: string;
  };
  
  
const Features: React.FC<FrameWorkProps> = ({ features, classlist, description, title }) => {

    return(
        <>
            <div className={classlist}>
                <div className="grid grid-cols-1 pb-6 text-center">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">{title}</h3>

                    <p className="text-slate-400 max-w-xl mx-auto">
                     {description}
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-6 gap-6">
                    {features?.map((item,index) => {
                        return(
                        <div className="relative overflow-hidden bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-gray-800" key={index}>
                            <div className="p-6 pb-0 relative overflow-hidden after:content-[''] after:absolute after:inset-0 after:mx-auto after:w-72 after:h-72 after:bg-gradient-to-tl after:to-amber-400 after:from-fuchsia-600 after:blur-[80px] after:rounded-full">
                                <Image  height={800} width={800} src={item?.image?.url} className="relative rounded-t-md shadow-md dark:shadow-slate-700 z-1 h-72 " alt="" unoptimized={true}/>
                            </div>

                            <div className="p-6">
                                <h5 className="text-lg font-semibold">{item.title}</h5>
                                <p className="text-slate-400 mt-3">{item.description}</p>
                            </div>
                        </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Features;