import React, { useState } from "react";
import Image from "next/image";
import { MdKeyboardArrowRight } from "../../assets/icons/vander";
import feature4 from "../../public/images/codebolt.png";

type LeftLayoutProps = {
    title: string;
    description: string; 
    image: string;
    apiUrl: string;
  };

const LeftLayout: React.FC<LeftLayoutProps> = ({ title, description, image, apiUrl }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="container relative md:mt-24 mt-16">
      <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-6">
        <div>
          <h4 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
            {title}
          </h4>
          <p className="text-md max-w-xl lg:ms-0">
            {isExpanded ? description : `${description.substring(0, 150)}...`}
          </p>
          <div className="mt-4">
            <button
              onClick={handleToggle}
              className="hover:text-amber-400 font-medium duration-500 inline-flex items-center text-md"
            >
              {isExpanded ? "View Less" : "View More"}
              <MdKeyboardArrowRight className="ms-1 text-[20px]" />
            </button>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border border-amber-400/5 bg-gradient-to-tl to-amber-400/30 from-fuchsia-600/30 dark:to-amber-400/50 dark:from-fuchsia-600/50 ps-6 pt-6 lg:me-8">
        <Image 
        src={`${apiUrl}/${image}`} 
        className="ltr:rounded-tl-lg rtl:rounded-tr-lg w-full" 
        alt="" 
        style={{ height: "400px" }} 
        width={800}  // Set appropriate width
        height={400} // Set appropriate height
        unoptimized={true} // Add this if the image is from a non-optimized source
      />
        </div>
      </div>
    </div>
  );
};

export default LeftLayout;