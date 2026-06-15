import {Link, useLocation} from '@tanstack/react-router';
import DropdownUser from './DropdownUser';
// import LogoIcon from '../../assets/images/logo/logo-icon.svg';
import DarkModeSwitcher from './DarkModeSwitcher';

import {FiMenu, FiX} from 'react-icons/fi';
import {useAuthContext} from '@/context/AuthContext';

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const {user} = useAuthContext();
  const location = useLocation();

  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;

    if (path === '/admin/dashboard') return 'Dashboard';
    if (path === '/admin/news/allnews') return 'News Management';
    if (path === '/admin/category/create') return 'Category Management';
    if (path === '/admin/magazine') return 'Magazine Management';
    if (path === '/admin/users') return 'Users Management';
    if (path === '/admin/settings') return 'Settings';

    return '';
  };

  return (
    <header className="sticky top-0 z-999 flex w-full border-b border-stroke bg-white drop-shadow-1 dark:border-strokedark dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex w-full flex-grow items-center justify-between px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 2xl:px-11">
        {/* Left Section - Hamburger + Page Title */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          {/* Hamburger Menu Button - Visible on mobile/tablet */}
          <button
            onClick={() => props.setSidebarOpen(!props.sidebarOpen)}
            className="rounded-lg p-1.5 text-black transition-colors hover:bg-primary/10 dark:text-white lg:hidden"
          >
            <FiMenu className="h-5 w-5" />
          </button>

          {/* Page Title - Visible from sm up */}
          <h1 className="text-sm font-semibold text-black dark:text-white sm:text-base md:text-lg lg:text-xl">
            {getPageTitle()}
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          {/* User Dropdown */}
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
