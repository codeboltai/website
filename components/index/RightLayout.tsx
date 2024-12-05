import React from "react";
import Link  from "next/link";
// import feature5 from "../../public/images/features5.png";
import feature5 from "../../public/images/agents_icons.png";

import {FiCheckCircle, MdKeyboardArrowRight} from '../../assets/icons/vander'
import Image from "next/image";



type image = {
    url: string;
  };

type RightLayoutProps = {
    title: string;
    description: string;
    image: image;
  };

const RightLayout: React.FC<RightLayoutProps> = ({ title, description, image }) => {

    return(
        <>
        <div className="container  md:mt-24 mt-16">
            <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-6">
                <div className=" overflow-hidden rounded-lg border border-amber-400/5 bg-gradient-to-tl to-amber-400/30  from-fuchsia-600/30 dark:to-amber-400/50 dark:from-fuchsia-600/50 ps-6 pt-6 lg:me-8">
                <Image 
                src={image?.url} 
                className="ltr:rounded-tl-lg rtl:rounded-tr-lg w-full" 
                alt="" 
                style={{ height: "400px" }} 
                width={800}  // Set appropriate width
                height={400} // Set appropriate height
                unoptimized={true} // Add this if the image is from a non-optimized source
                />
                </div>

                <div className="">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">{title}</h3>
                   <p className="text-md max-w-xl lg:ms-0">
                    {description}
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

export default RightLayout;