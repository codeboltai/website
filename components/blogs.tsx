import React from "react";
import Link from "next/link";
import Image from "next/image";

import {FiClock, FiCalendar} from '../assets/icons/vander'
const blogData = [
    {
        id:1,
        image:"/images/blog/1.jpg",
        title:'What is Artificial Intelligence and How Does AI Work For Human',
        author:'Calvin Carlo',
        client:"/images/client/01.jpg",
        date:'Sep 13, 2023'
    },
    {
        id:2,
        image:"/images/blog/2.jpg",
        title:'Lignin and the future circular make sssay form AI support system',
        author:'Steven Townsend',
        client:"/images/client/02.jpg",
        date:'Nov 29, 2023'
    },
    {
        id:3,
        image:"/images/blog/3.jpg",
        title:'Research Operations vs Research Is Always Essay On MasAI Theme',
        author:'Tiffany Betancourt',
        client:"/images/client/03.jpg",
        date:'Dec 29, 2023'
    },
    {
        id:4,
        image:"/images/blog/4.jpg",
        title:'Ensuring Your Data Security: Mas.ai is Now SOC 2 Type II Compliant',
        author:'Mari Harrington',
        client:"/images/client/04.jpg",
        date:'March 13, 2023'
    },
    {
        id:5,
        image:"/images/blog/5.jpg",
        title:'9 Best AI Translation Software (That You’ll Actually Use for translation)',
        author:'Floyd Glasgow',
        client:"/images/client/05.jpg",
        date:'May 6, 2023'
    },
    {
        id:6,
        image:"/images/blog/6.jpg",
        title:'How to choose the right qualitative',
        author:'Donna Schultz',
        client:"/images/client/06.jpg",
        date:'June 19, 2023'
    },
    {
        id:7,
        image:"/images/blog/7.jpg",
        title:'Scientists speculate that ours might not be held',
        author:'Joshua Morris',
        client:"/images/client/07.jpg",
        date:'June 20, 2023'
    },
    {
        id:8,
        image:"/images/blog/8.jpg",
        title:'The Multiverse is the collection of alternate universes',
        author:'Rosaria Vargas',
        client:"/images/client/08.jpg",
        date:'Aug 31, 2023'
    },
    {
        id:9,
        image:"/images/blog/9.jpg",
        title:'That share a universal hierarchy a large variety of these',
        author:'Carl Williams',
        client:"/images/client/01.jpg",
        date:'Sep 1, 2023'
    },
]
export default function Blogs(){
    return(
        <>
        <div className="container relative md:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-6 text-center">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Latest News</h3>

                    <p className="text-slate-400 max-w-xl mx-auto">Artificial intelligence makes it fast easy to create content for your blog, social media, website, and more!</p>
                </div>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-6 gap-6">
                    {blogData.slice(0,3).map((item,index) => {
                        return(
                            <div className="relative bg-white dark:bg-slate-900 p-4 rounded-md shadow dark:shadow-gray-700" key={index}>
                                <Image src={item.image} width={0} height={0} sizes="100vw" style={{width:"100%", height:"auto"}} className="rounded-md shadow dark:shadow-gray-700" alt=""/>
                                <div className="pt-4">
                                    <div className="flex justify-between items-center">
                                        <div className="space-x-1">
                                            <Link href="" className="bg-amber-400/10 text-amber-500 dark:text-amber-400 text-[12px] font-semibold px-2.5 py-0.5 rounded h-5">AI</Link>
                                            <Link href="" className="bg-amber-400/10 text-amber-500 dark:text-amber-400 text-[12px] font-semibold px-2.5 py-0.5 rounded h-5">Marketing</Link>
                                        </div>

                                        <span className="flex items-center"><FiClock className="h-4 w-4"/><span className="ms-1 text-slate-400">5 min read</span></span>
                                    </div>

                                    <div className="mt-5">
                                        <Link href={`/blog-detail/${item.id}`} className="text-lg font-semibold hover:text-amber-400">{item.title}</Link>
                                    </div>

                                    <div className="mt-5 flex justify-between items-center">
                                        <span className="flex items-center">
                                            <Image src={item.client} width={28} height={28} className="h-7 w-7 rounded-full" alt=""/>
                                            <Link href="" className="ms-1 text-slate-400 hover:text-amber-400">{item.author}</Link>
                                        </span>

                                        <span className="flex items-center"><FiCalendar className="h-4 w-4"/><span className="ms-1 text-slate-400">{item.date}</span></span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    
                </div>
            </div>
        </>
    )
}