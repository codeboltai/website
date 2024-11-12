import Link from "next/link";
import Image from "next/image";
import { MdKeyboardArrowRight } from "../assets/icons/vander";

const Video = () =>{
return (
        <div className="container md:mt-10 mt-10">
                <div className="grid grid-cols-1 pb-6 text-center">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold"> How does it works?</h3>
                    <div className="">
                                <video controls autoPlay loop muted>
                                    <source src="/videos/onboarding.mp4" type="video/mp4"/>
                                </video>
                               
                     </div>
                     <div className="justify-center mt-4">
                     <Link
                href="#"
                className="hover:text-amber-400 font-medium duration-500 inline-flex items-center"
              >
                Find Out More{" "}
                <MdKeyboardArrowRight className="ms-1 text-[20px]" />
              </Link>
              </div>
               
                </div>
            </div>
)}

export default Video;