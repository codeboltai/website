import React, {useEffect, useState} from "react";
import Link from "next/link";
import {ComparisonProps} from "../types/types";
import {FiCheckCircle, AiOutlineClose} from '../assets/icons/vander'
import type {NextPage} from 'next';


const Comparison: NextPage < {
        data: ComparisonProps,
    } > = ({data}) => {
	const [businessPrice, setBusinessPrice] = useState(20)
	const [professionalPrice, setProfessionalPrice] = useState(40)


	// let businessUpdate = (parseFloat(businessPrice * 0.05).toFixed(1))

	// let professionalUpdate = (parseFloat(professionalPrice * 0.025).toFixed(1))

	return (
		<>
        <div className="relative bg-white dark:bg-slate-900 p-4 rounded-md shadow dark:shadow-gray-700">
					<div className="p-6">
						<h5 className="text-2xl leading-normal font-semibold">
							{
							data ?. title
						}</h5>
						<p className="text-slate-400 mt-2">
							{							
                            `${data?.description.substring(0, 100)}...`
						}</p>
						{/* <div className="flex mt-4">
                            <span className="text-lg font-semibold">$</span>
                            <span className="text-5xl font-semibold mb-0 ms-1">0</span>
                        </div>
                        <p className="text-slate-400 uppercase text-xs">per month</p>

                        <div className="mt-6">
                            <Link href="" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400/5 hover:bg-amber-400 rounded border-amber-400/10 hover:border-amber-400 text-amber-400 hover:text-white">Try For Free</Link>

                            <p className="text-slate-400 text-sm mt-3">No credit card required. Free 14-days trial</p>
                        </div> */} </div>

					<div className="p-6 bg-gray-50 dark:bg-slate-800">
						<ul className="list-none text-slate-400">
							<li className="font-semibold text-slate-900 dark:text-white text-sm uppercase">Features:</li>
							{
                        data?.features
                            ?.sort((a: any, b: any) => b.action.localeCompare(a.action))
                            .map((feature: any) => (
                            <>
                                {feature.action === "true" ? (
                                <li className="flex items-center mt-2">
                                    <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
                                    <span className="text-slate-900 dark:text-white me-1 font-semibold">
                                    {feature.title}
                                    </span>
                                </li>
                                ) : (
                                <li className="flex items-center mt-2 text-slate-400">
                                    <AiOutlineClose className="h-[18px] w-[18px] me-2" />
                                    {feature.title}
                                </li>
                                )}
                            </>
                            ))
                        }

{/* 
							<li className="flex items-center mt-2"><FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2"/><span className="text-slate-900 dark:text-white me-1 font-semibold">10 mins/wk</span>
								of AI generation</li>
							<li className="flex items-center mt-2"><FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2"/>
								<span className="text-slate-900 dark:text-white me-1 font-semibold">10 GB</span>
								storage</li>
							<li className="flex items-center mt-2"><FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2"/>
								<span className="text-slate-900 dark:text-white me-1 font-semibold">4 exports/wk</span>
								with invideo logo</li>
							<li className="flex items-center mt-2 text-slate-400"><AiOutlineClose className="h-[18px] w-[18px] me-2"/>
								2.5M+ standard media</li>
							<li className="flex items-center mt-2 text-slate-400"><AiOutlineClose className="h-[18px] w-[18px] me-2"/>
								iStock</li> */}
						</ul>
					</div>
				</div>
		</>

	)
}


export default Comparison;