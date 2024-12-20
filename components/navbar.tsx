import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CiLink } from "react-icons/ci";
import { FiDownload } from "react-icons/fi";

export default function Navbar({ activePage }: { activePage: string }) {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, [])

  return (
    <>
      <nav id="topnav" className={`${scroll ? "nav-sticky" : ""} defaultscroll is-sticky`}>
        <div className="container">
          <Link className="logo" href="/" passHref>
            <Image src="/images/image.png" width={110} height={300} className="h-6 inline-block dark:hidden" alt="" />
            <Image src="/images/logo-light.png" width={110} height={300} className="h-6 hidden dark:inline-block " alt="" />
          </Link>

          <div className="menu-extras">
            <div className="menu-item">
              <Link href="#" className={`${toggleMenu ? 'open' : ''} navbar-toggle`} onClick={() => setToggleMenu(!toggleMenu)} passHref>
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
              {/* <Link href="https://portal.codebolt.ai/" passHref>
                <span className="py-[6px] px-4 md:inline hidden items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400/5 hover:bg-amber-400 border border-amber-400/10 hover:border-amber-400 text-amber-400 hover:text-white font-semibold">Login</span>
                <span className="py-[6px] px-4 inline md:hidden items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400 hover:bg-amber-500 border border-amber-400 hover:border-amber-500 text-white font-semibold">Login</span>
              </Link> */}

                <Link
                  href="https://portal.codebolt.ai/"
                  className="py-1 px-4 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded-md"
                >
                  Login
                </Link>
            </li>

            {/* <li className="md:inline hidden ps-1 mb-0 ">
              <Link href="/request" className="py-[6px] px-4 inline-block items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400 hover:bg-amber-500 border border-amber-400 hover:border-amber-500 text-white font-semibold"><span className="inline-flex items-center">
                Download
              </span></Link>
            </li> */}
          </ul>
          <div id="navigation" className={`${toggleMenu ? 'block' : ''}`}>
            <ul className="navigation-menu">

            <li className={activePage === 'home' ? 'active' : ''}>
              <Link href="/" className={`w sub-menu-item ${activePage === 'home' ? 'active' : ''}`}>
                Code Editor
              </Link>
            </li>

              <li  className={activePage === 'features' ? 'active' : ''}><Link  href="/features" className={`w sub-menu-item ${activePage === 'features' ? 'active' : ''}`}>Features</Link></li>

              <li  className={activePage === 'blogs' ? 'active' : ''}><Link  href="/blogs" className={`w sub-menu-item ${activePage === 'blogs' ? 'active' : ''}`}>Blogs</Link></li>

              <li className={`has-submenu parent-parent-menu-item ${activePage === 'agentai' ? 'active' : ''}`}>
                <Link   href="#" className={`${activePage === 'agentai' ? 'active' : ''}`} >AI Agents</Link>
                <span className="menu-arrow"></span>
                <ul className="submenu">
                  <li>
                    <Link  href="/agentsOverview" className=" w sub-menu-item">
                      Agents Overview
                    </Link>
                  </li>

                  <li>
                    <Link   href="/agentframework" className="sub-menu-item">
                      Codebolt AI Agent Framework
                    </Link>
                  </li>
                  <li>
                    <Link   href="/logicloom" className="sub-menu-item">
                      Codebolt Focused LLM
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/agents"
                      className="sub-menu-item"
                      style={{ display: "flex", alignItems: "center", gap: "10px" }}
                      passHref>
                      <span> Agents MarketPlace </span>

                      {/* <span className="badge rounded-full  bg-gray-20 text-white ">
                        <CiLink className="h-4 w-4" />
                      </span> */}
                    </Link>
                  </li>
                </ul>
              </li>
              <li className={`has-submenu parent-parent-menu-item ${activePage === 'gettingStarted' ? 'active' : ''}`}>
                <Link href="#">Developers</Link><span className="menu-arrow"></span>
                <ul className="submenu">
                  <li><Link href="/gettingStarted" className={`sub-menu-item ${activePage === 'services' ? 'active' : ''}`}>Get Started</Link></li>

                  <li><Link href="https://docs.codebolt.ai/?docusaurus-theme=dark" target="_blank" className={`sub-menu-item ${activePage === 'helpcenter' ? 'active' : ''}`}>Documentation</Link></li>


                  <li><Link href="/comparison" className={`sub-menu-item ${activePage === 'comparison' ? 'active' : ''}`}>Comparison</Link></li>
                </ul>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}