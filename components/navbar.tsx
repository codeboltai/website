import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar({ activePage }: { activePage: string }){
    const [toggleMenu, setToggleMenu] = useState(false)
    const [scroll, setScroll] = useState(false);

    useEffect(()=>{
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 50);
          });
    },[])

    return(
        <>
        <nav id="topnav" className={`${scroll ? "nav-sticky" : "" } defaultscroll is-sticky`}>
            <div className="container">
                <Link className="logo" href="/" passHref>
                    <Image src="/images/logo-dark.png" width={128} height={24} className="h-6 inline-block dark:hidden" alt=""/>
                    <Image src="/images/logo-light.png" width={128} height={24} className="h-6 hidden dark:inline-block" alt=""/>
                </Link>
               
                <div className="menu-extras">
                    <div className="menu-item">
                        <Link href="#" className={`${toggleMenu ? 'open' : ''} navbar-toggle`}  onClick={()=>setToggleMenu(!toggleMenu)} passHref>
                            <div className="lines">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </Link>
                    </div>
                </div>
                <ul className="buy-button list-none mb-0">
                    <li className="inline mb-0">
                        <Link href="/login" passHref>
                            <span className="py-[6px] px-4 md:inline hidden items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400/5 hover:bg-amber-400 border border-amber-400/10 hover:border-amber-400 text-amber-400 hover:text-white font-semibold">Login</span>
                            <span className="py-[6px] px-4 inline md:hidden items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400 hover:bg-amber-500 border border-amber-400 hover:border-amber-500 text-white font-semibold">Login</span>
                        </Link>
                    </li>
            
                    <li className="md:inline hidden ps-1 mb-0 ">
                        <Link href="/signup" target="_blank" className="py-[6px] px-4 inline-block items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400 hover:bg-amber-500 border border-amber-400 hover:border-amber-500 text-white font-semibold">Signup</Link>
                    </li>
                </ul>
                <div id="navigation" className={`${toggleMenu ? 'block' : ''}`}>
                    <ul className="navigation-menu">
                       
                    <li><Link href="/" className={`sub-menu-item ${activePage === 'index' ? 'active' : ''}`}>Code Editor</Link></li>

                
                        <li><Link href="/features" className={`sub-menu-item ${activePage === 'features' ? 'active' : ''}`}>Features</Link></li>
                
                        <li className={`has-submenu parent-parent-menu-item ${activePage === 'pages' ? 'active' : ''}`}>
                            <Link href="#">AI Agents</Link><span className="menu-arrow"></span>
                            <ul className="submenu">
                                <li><Link href="/services" className={`sub-menu-item ${activePage === 'services' ? 'active' : ''}`}>Services</Link></li>
                        
                                <li className={`has-submenu parent-menu-item ${activePage === 'blog' ? 'active' : ''}`}><Link href="#"> Blog </Link><span className="submenu-arrow"></span>
                                    <ul className="submenu">
                                        <li><Link href="/blog" className={`sub-menu-item ${activePage === 'blogs' ? 'active' : ''}`}> Blogs</Link></li>
                                        <li><Link href="/blog-detail" className={`sub-menu-item ${activePage === 'blog-detail' ? 'active' : ''}`}> Blog Detail</Link></li>
                                    </ul> 
                                </li>
                        
                                <li><Link href="/helpcenter" className={`sub-menu-item ${activePage === 'helpcenter' ? 'active' : ''}`}>Helpcenter</Link></li>

                                <li className={`has-submenu parent-menu-item ${activePage === 'auth-pages' ? 'active' : ''}`}><Link href="#"> Auth Pages </Link><span className="submenu-arrow"></span>
                                    <ul className="submenu">
                                        <li><Link href="/login" className={`sub-menu-item ${activePage === 'login' ? 'active' : ''}`}> Login</Link></li>
                                        <li><Link href="/signup" className={`sub-menu-item ${activePage === 'signup' ? 'active' : ''}`}> Signup</Link></li>
                                        <li><Link href="/reset-password" className={`sub-menu-item ${activePage === 'forgot-password' ? 'active' : ''}`}> Forgot Password</Link></li>
                                    </ul> 
                                </li>
                                <li className={`has-submenu parent-menu-item ${activePage === 'utility' ? 'active' : ''}`}><Link href="#"> Utility </Link><span className="submenu-arrow"></span>
                                    <ul className="submenu">
                                        <li><Link href="/terms" className={`sub-menu-item ${activePage === 'terms' ? 'active' : ''}`}>Terms of Services</Link></li>
                                        <li><Link href="/privacy" className={`sub-menu-item ${activePage === 'privacy' ? 'active' : ''}`}>Privacy Policy</Link></li>
                                    </ul>  
                                </li>
                        
                                <li><Link href="/error" className={`sub-menu-item ${activePage === 'error' ? 'active' : ''}`}> 404!</Link></li>
                            </ul>
                        </li>
                        <li className={`has-submenu parent-parent-menu-item ${activePage === 'pages' ? 'active' : ''}`}>
                            <Link href="#">Developers</Link><span className="menu-arrow"></span>
                            <ul className="submenu">
                                <li><Link href="/services" className={`sub-menu-item ${activePage === 'services' ? 'active' : ''}`}>Get Started</Link></li>
                        
                             
                        
                                <li><Link href="/helpcenter" className={`sub-menu-item ${activePage === 'helpcenter' ? 'active' : ''}`}>Documentation</Link></li>

                        
                                <li><Link href="/error" className={`sub-menu-item ${activePage === 'error' ? 'active' : ''}`}>Blog</Link></li>
                            </ul>
                        </li>
                
                    </ul>
                </div>
            </div>
        </nav>
        </>
    )
}