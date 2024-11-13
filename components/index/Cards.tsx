import {FiCheckCircle} from '../../assets/icons/vander'

export default function Cards () {
    return(
        <>
         <div className="container relative md:mt-24 mt-16">
                <div className="grid lg:grid-cols-6 md:grid-cols-2 grid-cols-1 mt-6 gap-6">
                    
                            <div className="p-6 rounded-md shadow dark:shadow-gray-800 group bg-white dark:bg-slate-900 hover:bg-amber-400/5 dark:hover:bg-amber-400/5 duration-500">
                            
        
                                <div className="content mt-6">
                                    <p className="font-semibold text-xl hover:text-amber-400 flex justify-center items-center">Codebolt For Developers</p>
                                    <div style={{marginTop: '20px', marginBottom: '20px', marginLeft: '50px', marginRight: '50px'}}>


                                    <ul className="list-none text-slate-400 mt-4">
                            <li className="mb-2 flex items-center"><FiCheckCircle className="text-amber-400 h-5 w-5 me-2"/> Streamlined Development Process</li>
                            <li className="mb-2 flex items-center"><FiCheckCircle className="text-amber-400 h-5 w-5 me-2"/> Improved Accuracy</li>
                            <li className="mb-2 flex items-center"><FiCheckCircle className="text-amber-400 h-5 w-5 me-2"/>  Integrated Knowledge Base</li>

                            <li className="mb-2 flex items-center"><FiCheckCircle className="text-amber-400 h-5 w-5 me-2"/>   Easier Collaboration and Knowledge Sharing </li>
                        </ul>      
                                
                                    </div>

                                </div>
                            </div>

                            <div className="p-6 rounded-md shadow dark:shadow-gray-800 group bg-white dark:bg-slate-900 hover:bg-amber-400/5 dark:hover:bg-amber-400/5 duration-500">
                            
        
                          
                            <div className="content mt-6">
                                <p className="font-semibold text-xl hover:text-amber-400 flex justify-center items-center">Codebolt For Businesses</p>
                                <div style={{marginTop: '20px', marginBottom: '20px', marginLeft: '50px', marginRight: '50px'}}>


                                <ul className="list-none text-slate-400 mt-4">
                            <li className="mb-2 flex items-center"><FiCheckCircle className="text-amber-400 h-5 w-5 me-2"/>   Cost and Time Efficiency</li>
                            <li className="mb-2 flex items-center"><FiCheckCircle className="text-amber-400 h-5 w-5 me-2"/>   Adaptability to Changing Needs</li>
                            <li className="mb-2 flex items-center"><FiCheckCircle className="text-amber-400 h-5 w-5 me-2"/>   Reduced Developer Dependency</li>

                            <li className="mb-2 flex items-center"><FiCheckCircle className="text-amber-400 h-5 w-5 me-2"/>  Enhanced Security and Compliance</li>
                        </ul> 
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>

        </>
    )
}