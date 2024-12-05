import Image from "next/image"

export default function Action({actionData}:any) {

    return(
        <>
          <div className="container relative md:py-16 py-16 ">
          <div className="grid grid-cols-1 pb-6 text-center">
          <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold justify-center lg:ms-0"> Watch it in Action</h3>
          </div>
             <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-6 gap-6">
                    {actionData?.map((item: any, index: number) => {
                        return(
                        <div className="relative overflow-hidden bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-gray-800" key={index}>
                            <div className="p-6 pb-0 relative overflow-hidden after:content-[''] after:absolute after:inset-0 after:mx-auto after:w-72 after:h-72 after:bg-gradient-to-tl after:to-amber-400 after:from-fuchsia-600 after:blur-[80px] after:rounded-full">


                                <Image src={item.images.url} sizes="100vw" style={{width:"100%", height:"250px"}} className="relative rounded-t-md shadow-md dark:shadow-slate-700 z-1" alt=""
                                unoptimized={true}
                                />
                            </div>
                            <div className="p-6">
                                <h5 className="text-lg font-semibold">{item.title}</h5>
                                <p className="mt-3 text-md max-w-xl lg:ms-0">{item.description}</p>
                            </div>
                        </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}


