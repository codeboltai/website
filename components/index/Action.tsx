import Image from "next/image"

export default function Action(){

    const featuresData = [
        {
            image: '/images/shopify.jpg',
            title: "Shopify",
            desc: "Create, manage, and scale your online store with ease using Shopify’s powerful e-commerce tools."
        },
        {
            image: '/images/crm.webp',
            title: "CRM",
            desc: "Enhance customer relationships by tracking interactions and managing data with a robust CRM system."
        },
        {
            image: '/images/features1.jpg',
            title: "AI",
            desc: "Automate tasks and gain insights with AI, driving smarter decisions and personalized customer experiences."
        },
    ];
    

    return(
        <>
          <div className="container relative md:py-16 py-16 ">
          <div className="grid grid-cols-1 pb-6 text-center">
          <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold justify-center"> Watch it in Action</h3>
          </div>
             <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-6 gap-6">
                    {featuresData.map((item,index) => {
                        return(
                        <div className="relative overflow-hidden bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-gray-800" key={index}>
                            <div className="p-6 pb-0 relative overflow-hidden after:content-[''] after:absolute after:inset-0 after:mx-auto after:w-72 after:h-72 after:bg-gradient-to-tl after:to-amber-400 after:from-fuchsia-600 after:blur-[80px] after:rounded-full">
                                <Image src={item.image} width={0} height={0} sizes="100vw" style={{width:"100%", height:"250px"}} className="relative rounded-t-md shadow-md dark:shadow-slate-700 z-1" alt=""/>
                            </div>

                            <div className="p-6">
                                <h5 className="text-lg font-semibold">{item.title}</h5>
                                <p className="text-slate-400 mt-3">{item.desc}</p>
                            </div>
                        </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}


