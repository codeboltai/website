import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoDark from "../assets/images/logo-dark.png";
import logoLight from "../assets/images/logo-light.png";
import { FiDownload } from "react-icons/fi";
import { CiLink  } from "../assets/icons/vander";

export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [scroll, setScroll] = useState(false);



  /*********************/
  /*    Menu Active    */
  /*********************/
  function getClosest(elem, selector) {
    // Element.matches() polyfill
    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function (s) {
          var matches = (this.document || this.ownerDocument).querySelectorAll(
              s
            ),
            i = matches.length;
          while (--i >= 0 && matches.item(i) !== this) {}
          return i > -1;
        };
    }

    // Get the closest matching element
    for (; elem && elem !== document; elem = elem.parentNode) {
      if (elem.matches(selector)) return elem;
    }
    return null;
  }

  const activateMenu = useCallback(() => {
    const menuItems = document.getElementsByClassName("sub-menu-item");
    if (menuItems.length > 0) {
        let matchingMenuItem = null;
        for (let idx = 0; idx < menuItems.length; idx++) {
            if (menuItems[idx].href === window.location.href) {
                matchingMenuItem = menuItems[idx];
                break;  // Break as soon as a match is found
            }
        }

        if (matchingMenuItem) {
            matchingMenuItem.classList.add("active");

            const immediateParent = getClosest(matchingMenuItem, "li");
            if (immediateParent) {
                immediateParent.classList.add("active");
            }

            let parent = getClosest(immediateParent, ".child-menu-item");
            if (parent) {
                parent.classList.add("active");
            }

            // Reuse 'parent' for a new assignment
            parent = getClosest(parent || immediateParent, ".parent-menu-item");
            if (parent) {
                parent.classList.add("active");

                const parentMenuitem = parent.querySelector(".menu-item");
                if (parentMenuitem) {
                    parentMenuitem.classList.add("active");
                }

                const parentOfParent = getClosest(parent, ".parent-parent-menu-item");
                if (parentOfParent) {
                    parentOfParent.classList.add("active");
                }
            } else {
                const parentOfParent = getClosest(matchingMenuItem, ".parent-parent-menu-item");
                if (parentOfParent) {
                    parentOfParent.classList.add("active");
                }
            }
        }
    }
}, []);
  /*********************/
  /*  Clickable manu   */
  /*********************/
  if (document.getElementById("navigation")) {
    var elements = document
      .getElementById("navigation")
      .getElementsByTagName("a");
    for (var i = 0, len = elements.length; i < len; i++) {
      elements[i].onclick = function (elem) {
        if (elem.target.getAttribute("href") === "#") {
          var submenu = elem.target.nextElementSibling.nextElementSibling;
          submenu.classList.toggle("open");
        }
      };
    }
  }
  useEffect(() => {
    activateMenu();
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, [activateMenu]);
  return (
    <>
      <nav
        id="topnav"
        className={`${scroll ? "nav-sticky" : ""} defaultscroll is-sticky`}
      >
        <div className="container">
          <Link className="logo" to="/">
            <img
              src={logoDark}
              className="h-6 inline-block dark:hidden"
              alt=""
            />
            <img
              src={logoLight}
              className="h-6 hidden dark:inline-block"
              alt=""
            />
          </Link>

          <div className="menu-extras">
            <div className="menu-item">
              <Link
                className={`${toggleMenu ? "open" : ""} navbar-toggle`}
                onClick={() => setToggleMenu(!toggleMenu)}
              >
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
              <Link to="/login">
                <span className="py-[6px] px-4 md:inline hidden items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400/5 hover:bg-amber-400 border border-amber-400/10 hover:border-amber-400 text-amber-400 hover:text-white font-semibold">
                  Login
                </span>
                <span className="py-[6px] px-4 inline md:hidden items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400 hover:bg-amber-500 border border-amber-400 hover:border-amber-500 text-white font-semibold">
                  Login
                </span>
              </Link>
            </li>

            <li className="md:inline hidden ps-1 mb-0 ">
              <Link
                to="/signup"
                target="_blank"
                className="py-[6px] px-4 inline-block items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400 hover:bg-amber-500 border border-amber-400 hover:border-amber-500 text-white font-semibold"
              >
                <span className="inline-flex items-center">
                  Download <FiDownload className="ml-2" />
                </span>
              </Link>
            </li>
          </ul>
          <div id="navigation" className={`${toggleMenu ? "block" : ""}`}>
            <ul className="navigation-menu">
              {/* <li className="has-submenu parent-menu-item">
                            <Link to="#">Home</Link><span className="menu-arrow"></span>
                            <ul className="submenu">
                                <li><Link to="/" className="sub-menu-item">Hero One</Link></li>
                                <li><Link to="/index-two" className="sub-menu-item">Hero Two</Link></li>
                                <li><Link to="/index-three" className="sub-menu-item">Hero Three</Link></li>
                                <li><Link to="/index-light" className="sub-menu-item">Hero Light <span className="bg-gray-50 dark:bg-slate-800 text-[10px] shadow shadow-gray-300 dark:shadow-gray-700 font-bold px-2.5 py-0.5 rounded h-5 ms-1">Light</span></Link></li>
                            </ul>
                        </li> */}

              <li>
                <Link to="/" className="sub-menu-item">
                  Code Editor
                </Link>
              </li>
              <li>
                <Link to="/features" className="sub-menu-item">
                  Features
                </Link>
              </li>

              <li className="has-submenu parent-parent-menu-item">
                <Link to="#">AI Agents</Link>
                <span className="menu-arrow"></span>
                <ul className="submenu">
                  <li>
                    <Link to="/agentsOverview" className="sub-menu-item">
                      Agents Overview
                    </Link>
                  </li>

                  <li>
                    <Link to="/agentframework" className="sub-menu-item">
                      CodeSquad - AI Agent Framework
                    </Link>
                  </li>
                  <li>
                    <Link to="/logicloom" className="sub-menu-item">
                      LogicLoom - Code Focused LLMs
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://codeboltai.web.app/registry"
                      target="_blank"
                      className="sub-menu-item"
                      style={{ display: "flex", items: "center",gap:"10px" }}
                    >
                      <span> Agents MarketPlace </span>

                      <span className="badge rounded-full  bg-gray-20 text-white ">
                        <CiLink className="h-4 w-4" />
                      </span>
                    </Link>
                  </li>
                </ul>
              </li>
              {/* <li><Link to="/pricing" className="sub-menu-item">Pricing </Link></li> */}

              <li className="has-submenu parent-parent-menu-item">
                <Link to="#">Developers</Link>
                <span className="menu-arrow"></span>
                <ul className="submenu">
                  <li>
                    <Link to="/services" className="sub-menu-item">
                      Getting Started
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://docs.codebolt.ai/?docusaurus-theme=dark"
                      target="_blank"
                      className="sub-menu-item"
                    >
                      Documentation
                    </Link>
                  </li>

                  {/* <li className="has-submenu parent-menu-item"><Link to="#"> Blog </Link><span className="submenu-arrow"></span>
                                    <ul className="submenu">
                                        <li><Link to="/blog" className="sub-menu-item"> Blogs</Link></li>
                                        <li><Link to="/blog-detail" className="sub-menu-item"> Blog Detail</Link></li>
                                    </ul> 
                                </li> */}

                  <li>
                    <Link to="/helpcenter" className="sub-menu-item">
                      Blogs
                    </Link>
                  </li>

                  {/* <li className="has-submenu parent-menu-item"><Link to="#"> Auth Pages </Link><span className="submenu-arrow"></span>
                                    <ul className="submenu">
                                        <li><Link to="/login" className="sub-menu-item"> Login</Link></li>
                                        <li><Link to="/signup" className="sub-menu-item"> Signup</Link></li>
                                        <li><Link to="/reset-password" className="sub-menu-item"> Forgot Password</Link></li>
                                    </ul> 
                                </li> */}
                  {/* <li className="has-submenu parent-menu-item"><Link to="#"> Utility </Link><span className="submenu-arrow"></span>
                                    <ul className="submenu">
                                        <li><Link to="/terms" className="sub-menu-item">Terms of Services</Link></li>
                                        <li><Link to="/privacy" className="sub-menu-item">Privacy Policy</Link></li>
                                    </ul>  
                                </li> */}

                  {/* <li><Link to="/error" className="sub-menu-item"> 404!</Link></li> */}
                </ul>
              </li>

              {/* <li><Link to="/contact" className="sub-menu-item">Contact</Link></li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
