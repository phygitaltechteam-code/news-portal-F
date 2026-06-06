import {SidebarProps} from '@/types';
import {Link, useLocation} from '@tanstack/react-router';
import {useEffect, useRef, useState} from 'react';
import {FaArrowLeftLong} from 'react-icons/fa6';
import {IoIosArrowDown} from 'react-icons/io';
import {PiSquaresFourLight} from 'react-icons/pi';
import {MdCategory, MdNewspaper} from 'react-icons/md';
import SidebarLinkGroup from './SidebarLinkGroup';

// Temporary mock user for development
const mockUser = {role: 'ADMIN'};

const Sidebar = ({sidebarOpen, setSidebarOpen}: SidebarProps) => {
  // Use mock user temporarily
  const user = mockUser;
  const role = user?.role;

  // Admin routes for News Portal
  const sidebarRoutes =
    role === 'ADMIN'
      ? [
          {
            label: 'Dashboard',
            path: '/admin/dashboard',
            icon: <PiSquaresFourLight size={18} />,
          },
          {
            label: 'News Management',
            icon: <MdNewspaper size={18} />,
            path: '/admin/news',
            subRoutes: [
              {label: 'Create News', path: '/admin/news/create'},
              // {label: 'News List', path: '/admin/news/list'},
              // {label: 'Pending News', path: '/admin/news/pending'},
            ],
          },
          {
            label: 'Category Management',
            icon: <MdCategory size={18} />,
            path: '/admin/category',
            subRoutes: [
              {label: 'Create Category', path: '/admin/category/create'},
              {label: 'Category List', path: '/admin/category/list'},
            ],
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

  const handleLinkClick = () => setSidebarOpen(false);

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
    localStorage.setItem('sidebar-expanded', String(sidebarExpanded));
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-[9999] flex h-screen w-64 flex-col border-r border-stroke bg-white shadow-xl duration-300 dark:border-strokedark dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stroke bg-white px-4 py-4 dark:border-strokedark dark:bg-boxdark sm:px-6">
        <Link to="/admin/dashboard" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">NewsPortal</span>
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-lg text-primary lg:hidden"
        >
          <FaArrowLeftLong />
        </button>
      </div>

      {/* Menu */}
      <nav className="mt-5 max-h-[calc(100vh-80px)] overflow-y-auto px-4 py-4 lg:mt-9 lg:px-6">
        <div>
          <h3 className="mb-4 ml-4 text-xs font-bold uppercase tracking-widest text-primary/60 dark:text-bodydark2">
            MENU
          </h3>
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
                      <Link
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-lg px-4 py-2.5 font-medium duration-200 ease-in-out hover:bg-primary/10 hover:text-primary dark:text-bodydark dark:hover:bg-primary/20 dark:hover:text-white ${
                          pathname === route.path ||
                          pathname.includes(route.path!)
                            ? 'bg-primary/10 font-semibold text-primary dark:bg-primary/20 dark:text-white'
                            : 'text-graydark dark:text-bodydark'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                        }}
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
                        {route.label}
                        <IoIosArrowDown
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current transition-transform duration-200 ${
                            open ? 'rotate-180 text-primary' : 'text-gray-400'
                          }`}
                        />
                      </Link>

                      {/* Dropdown Menu */}
                      <div
                        className={`translate transform overflow-hidden transition-all duration-200 ${!open && 'hidden'}`}
                      >
                        <ul className="mb-3 ml-6 mt-2 flex flex-col gap-1 border-l-2 border-primary/20 pl-8">
                          {route.subRoutes.map((sub, i) => (
                            <li key={i}>
                              <Link
                                to={sub.path}
                                onClick={handleLinkClick}
                                className={`group relative flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium duration-200 ease-in-out hover:text-secondary ${
                                  pathname === sub.path
                                    ? 'font-semibold text-secondary'
                                    : 'text-graydark dark:text-bodydark'
                                }`}
                              >
                                <span
                                  className={`h-1 w-1 rounded-full ${
                                    pathname === sub.path
                                      ? 'bg-secondary'
                                      : 'bg-gray-300 group-hover:bg-secondary'
                                  } transition-colors`}
                                />
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </SidebarLinkGroup>
              ) : (
                <li key={index}>
                  <Link
                    to={route.path}
                    onClick={handleLinkClick}
                    className={`group relative flex items-center gap-2.5 rounded-lg px-4 py-2.5 font-medium duration-200 ease-in-out hover:bg-primary/10 hover:text-primary dark:text-bodydark dark:hover:bg-primary/20 dark:hover:text-white ${
                      pathname === route.path
                        ? 'bg-primary text-white shadow-md shadow-primary/30 dark:bg-primary dark:text-white'
                        : 'text-graydark dark:text-bodydark'
                    }`}
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
                    {route.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
