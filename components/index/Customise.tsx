import React from "react";
import Link from "next/link";
import feature4 from "../../public/images/customize.jpg";
import { MdKeyboardArrowRight } from "../../assets/icons/vander";
import Image from "next/image";
import { useState } from "react";

export default function Customize() {

  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="container relative md:mt-24 mt-16">
        <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-6">
          <div className="">
            <h4 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
            Enable Your Team Or Even Your  <br/> Users To Customise Your Software
            </h4>
            <p className="text-lg max-w-xl lg:ms-0">

             {isExpanded ? (
          `Our platform empowers users to easily customize software through simple text prompts, eliminating the need for complex coding or developer intervention. This intuitive approach allows businesses and individuals to make quick adjustments, implement new features, and personalize their experience without relying on technical expertise. By putting the power of innovation in the hands of the end users, we foster greater agility, creativity, and efficiency across all levels of your organization.`
        ) : (
          `Our platform empowers users to easily customize software through simple text prompts, eliminating the need for complex coding or developer intervention. This intuitive approach allows businesses and individuals to make quick adjustments, implement new features....`
        )}
      </p>

            <div className="mt-4">
              <button
               onClick={handleToggle}
                className="hover:text-amber-400 font-medium duration-500 inline-flex items-center"
              >
                 {isExpanded ? 'View Less' : 'View More'}
                {/* Find Out More{" "} */}
                <MdKeyboardArrowRight className="ms-1 text-[20px]" />
              </button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border border-amber-400/5 bg-gradient-to-tl to-amber-400/30  from-fuchsia-600/30 dark:to-amber-400/50 dark:from-fuchsia-600/50 ps-6 pt-6 lg:me-8">
            <Image
            src={feature4}
            className="ltr:rounded-tl-lg rtl:rounded-tr-lg w-full"
            alt=""
            style={{height: "400px"}}
            />
          </div>
        </div>
      </div>
    </>
  );
}
