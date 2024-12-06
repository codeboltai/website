import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { FiCheckCircle } from "../assets/icons/vander";

import ModalVideo from "react-modal-video";

interface Image {
  url: string;
} 
interface Video {
  url: string;
}

interface List {
  title: string;
}

interface About {
  title: string;
  description: string;
  lists: List[];
}

interface Language {
  title: string;
  image: Image;
}

interface Media {
  video: Video;
  image: Image;
}

type FrameWorkProps = {
  language: Language[];
  about: About;
  media: Media;
};

const AboutThree: React.FC<FrameWorkProps> = ({ language, about, media }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className="container relative md:mt-24 mt-16">
        <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-6">
          <div className="relative overflow-hidden after:content-[''] after:absolute after:inset-0 after:mx-auto after:w-72 after:h-72 after:bg-gradient-to-tl after:to-amber-400 after:from-fuchsia-600 after:blur-[80px] after:rounded-full p-6 bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-slate-800">
            <div className="relative overflow-hidden rounded-lg shadow-md dark:shadow-gray-800 z-1">
              <div className="relative">
                <video controls autoPlay loop>
                  <source src={media?.video?.url} type="video/mp4" />
                </video>
                <Link
                  href=""
                  className="absolute top-2 start-2 rounded-full p-0.5 bg-white dark:bg-slate-900 shadow dark:shadow-slate-800 z-10"
                  passHref
                >
                  <Image
                    src={media?.image?.url}
                    width={28}
                    height={28}
                    className="h-7 w-7 rounded-full"
                    alt=""
                    unoptimized={true}
                  />
                </Link>
              </div>

              <div className="absolute bottom-2/4 translate-y-2/4 start-0 end-0 text-center">
                <Link
                  href="#"
                  onClick={() => setOpen(true)}
                  className="lightbox lg:h-16 h-14 lg:w-16 w-14 rounded-full shadow-lg dark:shadow-gray-800 inline-flex items-center justify-center bg-white dark:bg-slate-900 hover:bg-amber-400 dark:hover:bg-amber-400 text-amber-400 hover:text-white duration-500 ease-in-out mx-auto"
                  passHref
                >
                  <i className="mdi mdi-play inline-flex items-center justify-center text-2xl"></i>
                </Link>
              </div>
            </div>

            <div className="mt-6">
              {language?.map((item, index) => (
                <Link
                  href=""
                  className="py-[6px] px-2 inline-flex items-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400/5 hover:bg-amber-400 border border-amber-400/10 hover:border-amber-400 text-amber-400 hover:text-white font-semibold m-0.5"
                  key={index}
                  passHref
                >
                  <Image
                    src={item.image?.url}
                    width={20}
                    height={20}
                    className="h-5 w-5 me-1"
                    alt=""
                    unoptimized={true}
                  />
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="">
            <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
              {about?.title}
            </h3>
            <p className="text-slate-400 max-w-xl">{about?.description}</p>

            <ul className="list-none text-slate-400 mt-4">
              {about?.lists?.map((item, index) => (
                <li
                  className="mb-2 flex items-center"
                  key={index}
                >
                  <FiCheckCircle className="text-amber-400 h-5 w-5 me-2" />{" "}
                  {item?.title}
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <Link
                href=""
                className="hover:text-amber-400 font-medium duration-500"
                passHref
              >
                Find Out More{" "}
                <i className="mdi mdi-chevron-right text-[20px] align-middle"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ModalVideo
        channel="youtube"
        youtube={{ mute: 0, autoplay: 0 }}
        isOpen={isOpen}
        videoId="S_CGed6E610"
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default AboutThree;
