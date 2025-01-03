import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
// import Logo from '../../images/logo/logo.svg';
import Logo from "../../images/logo/logo_sadhannandadip.png";

import { ToastContainer } from "react-toastify";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <>
      <aside
        ref={sidebar}
        className={` absolute left-0 top-0  z-9995 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5 ">
          <NavLink to="/">
            <img src={Logo} alt="Logo" />
          </NavLink>

          <button
            ref={trigger}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
            {/* <!-- Menu Group --> */}
            <div>
              <h3 className="mb-4 ml-4 text-sm font-semibold text-black-900 dark:text-bodydark2">
                MENU
              </h3>

              <ul className="mb-6 flex flex-col gap-1.5">
                {/* <!-- Menu Item Dashboard --> */}

                {/* <!-- Menu Item Dashboard --> */}

                {/* <!-- Menu Item Calendar --> */}

                {/* <!-- Menu Item Calendar --> */}

                {/* <!-- Menu Item Profile --> */}

                {/* <!-- Menu Item Profile --> */}

                {/* <!-- Menu Item Forms --> */}
                {/* <!-- Menu Item Forms --> */}
                <li>
                  <NavLink
                    to="/"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-black dark:text-bodydark1 duration-300 ease-in-out hover:bg-slate-100 dark:hover:bg-meta-4 ${pathname.includes('tables') && 'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <span className="material-symbols-outlined">
                      home
                    </span>
                    Dashboard
                  </NavLink>
                </li>
                {/* <!-- Menu Item Tables --> */}

                {/* home content */}
                <li>
                  <NavLink
                    to="/home-content"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium  text-black dark:text-bodydark1 duration-300 ease-in-out hover:bg-slate-100 dark:hover:bg-meta-4 ${pathname.includes('tables') && 'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <span className="material-symbols-outlined">
                      inventory_2
                    </span>

                    Slider
                  </NavLink>
                </li>

                {/* text content */}
                {/* <li>
                  <NavLink
                    to="/home-content"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium  text-black dark:text-bodydark1 duration-300 ease-in-out hover:bg-slate-100 dark:hover:bg-meta-4 ${pathname.includes('tables') && 'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <span className="material-symbols-outlined">
                      inventory_2
                    </span>

                    Text Content
                  </NavLink>
                </li> */}

                {/* quote */}
                <li>
                  <NavLink
                    to="/quotes"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium   text-black dark:text-bodydark1 dark:text-bodydark1duration-300 ease-in-out hover:bg-slate-100 dark:hover:bg-meta-4 ${pathname.includes('tables') && 'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <span className="material-symbols-outlined">
                      format_quote
                    </span>
                    Quotes
                  </NavLink>
                </li>


                {/* ebooks */}
                <li>
                  <NavLink
                    to="/ebook"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium  text-black dark:text-bodydark1 duration-300 ease-in-out hover:bg-slate-100 dark:hover:bg-meta-4 ${pathname.includes('tables') && 'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <span className="material-symbols-outlined">
                      play_lesson
                    </span>
                    Ebooks
                  </NavLink>
                </li>



                <li>
                  <NavLink
                    to="/literature"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium  text-black dark:text-bodydark1 duration-300 ease-in-out hover:bg-slate-100 dark:hover:bg-meta-4 ${pathname.includes('tables') && 'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <span className="material-symbols-outlined">
                      draw
                    </span>
                    Literature
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/media"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium  text-black dark:text-bodydark1 duration-300 ease-in-out hover:bg-slate-100 dark:hover:bg-meta-4 ${pathname.includes('tables') && 'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <span className="material-symbols-outlined">
                      play_circle
                    </span>
                    Youtube Media
                  </NavLink>
                </li>



                {/* quote */}
                {/* <li>
                  <NavLink
                    to="/books"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium  text-black dark:text-bodydark1 duration-300 ease-in-out hover:bg-slate-100 dark:hover:bg-meta-4 ${pathname.includes('tables') && 'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <span className="material-symbols-outlined">
                      import_contacts
                    </span>
                    Books
                  </NavLink>
                </li> */}




                {/* Categories */}
                <li>
                  <NavLink
                    to="/category"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium  text-black dark:text-bodydark1 duration-300 ease-in-out hover:bg-slate-100 dark:hover:bg-meta-4 ${pathname.includes('tables') && 'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <span className="material-symbols-outlined">
                      category
                    </span>
                    Categories
                  </NavLink>
                </li>


                 {/*UnMap Categories */}
                 <li>
                  <NavLink
                    to="/unmap-category"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium  text-black dark:text-bodydark1 duration-300 ease-in-out hover:bg-slate-100 dark:hover:bg-meta-4 ${pathname.includes('tables') && 'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <span className="material-symbols-outlined">
                      category
                    </span>
                    Unmap Categories
                  </NavLink>
                </li>

                {/* sub-category */}


                {/* event link */}
                <li>
                  <NavLink
                    to="/events"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium  text-black dark:text-bodydark1 duration-300 ease-in-out hover:bg-slate-100 dark:hover:bg-meta-4 ${pathname.includes('tables') && 'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <span className="material-symbols-outlined">
                      event
                    </span>
                    Events
                  </NavLink>
                </li>
                {/* event ends */}


                {/* master image link */}
                <li>
                  <NavLink
                    to="/master-image"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium  text-black dark:text-bodydark1 duration-300 ease-in-out hover:bg-slate-100 dark:hover:bg-meta-4 ${pathname.includes('tables') && 'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <span className="material-symbols-outlined">
                      image
                    </span>
                    Category Images
                  </NavLink>
                </li>
                {/* master image ends */}

                {/* business-settings */}
                <li>
                  <NavLink
                    to="/business-settings"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium  text-black dark:text-bodydark1 duration-300 ease-in-out hover:bg-slate-100 dark:hover:bg-meta-4 ${pathname.includes('tables') && 'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <span className="material-symbols-outlined">
                      settings
                    </span>
                    Business Settings
                  </NavLink>
                </li>
                {/* business-settings ends */}



                {/* <!-- Menu Item Tables --> */}

                {/* <!-- Menu Item Settings --> */}

                {/* <!-- Menu Item Settings --> */}
              </ul>
            </div>

            {/* <!-- Others Group --> */}

          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
      <ToastContainer />
    </>
  );
};

export default Sidebar;
