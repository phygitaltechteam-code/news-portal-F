import {SidebarProps} from '@/types';
import {Link, useLocation} from '@tanstack/react-router';
import {useEffect, useRef, useState} from 'react';
import {FaArrowLeftLong} from 'react-icons/fa6';
import {IoIosArrowDown} from 'react-icons/io';
import {MdDashboard, MdNewspaper, MdMenuBook} from 'react-icons/md';
import SidebarLinkGroup from './SidebarLinkGroup';

// Temporary mock user for development
const mockUser = {role: 'ADMIN'};

const Sidebar = ({sidebarOpen, setSidebarOpen}: SidebarProps) => {
  const user = mockUser;
  const role = user?.role;

  const sidebarRoutes =
    role === 'ADMIN'
      ? [
          {
            label: 'Dashboard',
            path: '/admin/dashboard',
            icon: <MdDashboard size={20} />,
          },
          {
            label: 'News Management',
            icon: <MdNewspaper size={20} />,
            path: '/admin/news',
            subRoutes: [
              {label: 'All News', path: '/admin/news/allnews'},
              {label: 'Create Category', path: '/admin/category/create'},
            ],
          },
          {
            label: 'Magazine',
            path: '/admin/magazine',
            icon: <MdMenuBook size={20} />,
          },
        ]
      : [];

  const location = useLocation();
  const {pathname} = location;

  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLDivElement>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === 'true',
  );

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      
      if (!mobile) {
        setSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setSidebarOpen]);

  const handleLinkClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const toggleSidebarCollapse = () => {
    if (!isMobile) {
      setSidebarExpanded(!sidebarExpanded);
    }
  };

  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      if (
        !sidebar.current ||
        !trigger.current ||
        !sidebarOpen ||
        sidebar.current.contains(event.target as Node) ||
        trigger.current.contains(event.target as Node)
      )
        return;
      setSidebarOpen(false);
    };

    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [sidebarOpen]);

  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (!sidebarOpen || event.key !== 'Escape') return;
      setSidebarOpen(false);
    };

    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [sidebarOpen]);

  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem('sidebar-expanded', String(sidebarExpanded));
    }
  }, [sidebarExpanded, isMobile]);

  // Determine sidebar classes
  const getSidebarClasses = () => {
    const baseClasses = "fixed left-0 top-0 z-[9999] flex h-screen flex-col border-r border-stroke bg-white shadow-xl transition-all duration-300 dark:border-strokedark dark:bg-boxdark";
    
    if (isMobile) {
      return `${baseClasses} w-64 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`;
    } else {
      return `${baseClasses} ${sidebarExpanded ? 'w-64' : 'w-20'} translate-x-0`;
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-[9998] bg-black/50 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside ref={sidebar} className={getSidebarClasses()}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stroke bg-white px-4 py-4 dark:border-strokedark dark:bg-boxdark sm:px-5">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2 overflow-hidden"
            onClick={handleLinkClick}
          >
            {(!isMobile && sidebarExpanded) || isMobile ? (
              <span className="whitespace-nowrap text-lg font-bold text-primary sm:text-xl">
                NewsPortal
              </span>
            ) : (
              <span className="text-xl font-bold text-primary">NP</span>
            )}
          </Link>

          {/* Collapse/Close Button */}
          <button
            ref={!isMobile ? trigger : undefined}
            onClick={isMobile ? () => setSidebarOpen(false) : toggleSidebarCollapse}
            className="rounded-lg p-1.5 text-primary transition-colors hover:bg-primary/10"
            title={isMobile ? 'Close' : (sidebarExpanded ? 'Collapse' : 'Expand')}
          >
            <FaArrowLeftLong
              className={`h-4 w-4 transition-transform duration-300 ${
                !isMobile && !sidebarExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        {/* Menu */}
        <nav className="mt-5 max-h-[calc(100vh-80px)] overflow-y-auto px-3 py-4 lg:mt-6 lg:px-4">
          <div>
            {(!isMobile && sidebarExpanded) && (
              <h3 className="mb-4 ml-4 text-xs font-bold uppercase tracking-widest text-primary/60 dark:text-bodydark2">
                MENU
              </h3>
            )}
            <ul className="flex flex-col gap-1">
              {sidebarRoutes.map((route, index) =>
                route.subRoutes ? (
                  <SidebarLinkGroup
                    key={index}
                    activeCondition={
                      pathname === route.path || pathname.includes(route.path!)
                    }
                  >
                    {(handleClick, open) => (
                      <>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            if ((!isMobile && sidebarExpanded) || isMobile) {
                              handleClick();
                            }
                          }}
                          className={`group relative flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 font-medium duration-200 ease-in-out hover:bg-primary/10 hover:text-primary dark:text-bodydark dark:hover:bg-primary/20 dark:hover:text-white ${
                            pathname === route.path ||
                            pathname.includes(route.path!)
                              ? 'bg-primary/10 font-semibold text-primary dark:bg-primary/20 dark:text-white'
                              : 'text-graydark dark:text-bodydark'
                          } ${(!isMobile && !sidebarExpanded) ? 'justify-center' : ''}`}
                          title={(!isMobile && !sidebarExpanded) ? route.label : ''}
                        >
                          <span
                            className={`${
                              pathname === route.path ||
                              pathname.includes(route.path!)
                                ? 'text-primary'
                                : 'text-gray-400 group-hover:text-primary'
                            } transition-colors`}
                          >
                            {route.icon}
                          </span>
                          {((!isMobile && sidebarExpanded) || isMobile) && (
                            <span className="flex-1 text-left text-sm">
                              {route.label}
                            </span>
                          )}
                          {((!isMobile && sidebarExpanded) || isMobile) && (
                            <IoIosArrowDown
                              className={`fill-current transition-transform duration-200 ${
                                open ? 'rotate-180 text-primary' : 'text-gray-400'
                              }`}
                            />
                          )}
                        </button>

                        {/* Dropdown Menu */}
                        {((!isMobile && sidebarExpanded) || isMobile) && (
                          <div
                            className={`translate transform overflow-hidden transition-all duration-200 ${
                              !open && 'hidden'
                            }`}
                          >
                            <ul className="mb-3 ml-8 mt-2 flex flex-col gap-1 border-l-2 border-primary/20 pl-4">
                              {route.subRoutes.map((sub, i) => (
                                <li key={i}>
                                  <Link
                                    to={sub.path}
                                    onClick={handleLinkClick}
                                    className={`group relative flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium duration-200 ease-in-out hover:text-primary ${
                                      pathname === sub.path
                                        ? 'font-semibold text-primary'
                                        : 'text-graydark dark:text-bodydark'
                                    }`}
                                  >
                                    <span
                                      className={`h-1.5 w-1.5 rounded-full ${
                                        pathname === sub.path
                                          ? 'bg-primary'
                                          : 'bg-gray-300 group-hover:bg-primary'
                                      } transition-colors`}
                                    />
                                    {sub.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    )}
                  </SidebarLinkGroup>
                ) : (
                  <li key={index}>
                    <Link
                      to={route.path}
                      onClick={handleLinkClick}
                      className={`group relative flex items-center gap-2.5 rounded-lg px-3 py-2.5 font-medium duration-200 ease-in-out hover:bg-primary/10 hover:text-primary dark:text-bodydark dark:hover:bg-primary/20 dark:hover:text-white ${
                        pathname === route.path
                          ? 'bg-primary text-white shadow-md shadow-primary/30 dark:bg-primary dark:text-white'
                          : 'text-graydark dark:text-bodydark'
                      } ${(!isMobile && !sidebarExpanded) ? 'justify-center' : ''}`}
                      title={(!isMobile && !sidebarExpanded) ? route.label : ''}
                    >
                      <span
                        className={`${
                          pathname === route.path
                            ? 'text-white'
                            : 'text-gray-400 group-hover:text-primary'
                        } transition-colors`}
                      >
                        {route.icon}
                      </span>
                      {((!isMobile && sidebarExpanded) || isMobile) && (
                        <span className="text-sm">{route.label}</span>
                      )}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;