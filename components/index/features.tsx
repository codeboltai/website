import React, { useState } from "react";
import Link from "next/link";
import { MdKeyboardArrowDown } from "../../assets/icons/vander";
import Image from "next/image";
import feature from '../../public/images/features1.jpg';
import { Feature } from "../../types/types";

interface FeaturesPageProps {
  featureData: Feature[];
}

const FeaturesPage: React.FC<FeaturesPageProps> = ({ featureData }) => {
  const [activeIndex, setActiveIndex] = useState<number>(4);

  return (
    <>
      <div className="container relative md:mt-24 mt-16">
        <div className="grid grid-cols-1 pb-6 text-center">
          <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
            Features
          </h3>
          <p className="text-md max-w-xl mx-auto">What makes Codebolt Different!</p>
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-6">
          <div className="mt-6">
            {featureData?.map((item, index) => (
              <div
                className="relative shadow dark:shadow-gray-800 rounded-md overflow-hidden mt-4"
                key={index}
              >
                <h2 className="text-base font-semibold">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(item.id)}
                    className={`${
                      activeIndex === item.id
                        ? "bg-gray-50 dark:bg-slate-800 text-amber-400"
                        : ""
                    } flex justify-between items-center p-5 w-full font-medium text-start`}
                  >
                    <span>{item.title}</span>
                    <MdKeyboardArrowDown
                      className={`${
                        activeIndex === item.id ? "rotate-180" : ""
                      } w-4 h-4 shrink-0`}
                    />
                  </button>
                </h2>
                <div className={activeIndex === item.id ? "" : "hidden"}>
                  <div className="p-5">
                    <p
                      className="text-md max-w-xl lg:ms-0"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    ></p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-lg border border-amber-400/5 bg-gradient-to-tl to-amber-400/30 from-fuchsia-600/30 dark:to-amber-400/50 dark:from-fuchsia-600/50 ps-6 pt-6 lg:me-8">
            <Image
              src={feature}
              alt="Feature image"
              height={400} // Specify height for image optimization
              width={600}  // Specify width for image optimization
              className="ltr:rounded-tl-lg rtl:rounded-tr-lg w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturesPage;
