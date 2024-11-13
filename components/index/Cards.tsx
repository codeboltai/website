export default function Cards () {
    return(
        <>
         <div className="container relative md:mt-24 mt-16">
                <div className="grid lg:grid-cols-6 md:grid-cols-2 grid-cols-1 mt-6 gap-6">
                    
                            <div className="p-6 rounded-md shadow dark:shadow-gray-800 group bg-white dark:bg-slate-900 hover:bg-amber-400/5 dark:hover:bg-amber-400/5 duration-500">
                            
        
                                <div className="content mt-6">
                                    <p className="font-semibold text-xl hover:text-amber-400 flex justify-center items-center">Codebolt For Developers</p>
                                    <div style={{marginTop: '20px', marginBottom: '20px', marginLeft: '50px', marginRight: '50px'}}>

                                    
                                    <p className="text-slate-400 mt-3 md:py-4">
                                    Streamlined Development Process
                                    </p>
                                    <p className="text-slate-400 mt-3">
                                    Improved Accuracy
                                    </p>
                                    <p className="text-slate-400 mt-3">
                                    Integrated Knowledge Base
                                    </p>
                                    <p className="text-slate-400 mt-3">
                                    Easier Collaboration and Knowledge Sharing
                                    </p>
                                    </div>

                                </div>
                            </div>

                            <div className="p-6 rounded-md shadow dark:shadow-gray-800 group bg-white dark:bg-slate-900 hover:bg-amber-400/5 dark:hover:bg-amber-400/5 duration-500">
                            
        
                          
                            <div className="content mt-6">
                                <p className="font-semibold text-xl hover:text-amber-400 flex justify-center items-center">Codebolt For Businesses</p>
                                <div style={{marginTop: '20px', marginBottom: '20px', marginLeft: '50px', marginRight: '50px'}}>
                                <p className="text-slate-400 mt-3">
                                Cost and Time Efficiency
                                </p>
                                <p className="text-slate-400 mt-3">
                                Adaptability to Changing Needs
                                </p>
                                <p className="text-slate-400 mt-3">
                                Reduced Developer Dependency
                                </p>
                                <p className="text-slate-400 mt-3">
                                Enhanced Security and Compliance
                                </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>

        </>
    )
}