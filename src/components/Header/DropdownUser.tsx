import {Link} from '@tanstack/react-router';
import ClickOutside from '../ClickOutside';
import {IoIosArrowDown} from 'react-icons/io';
import {QUERY_KEYS} from '@/lib/react-query/queryKeys';
import {useAuthContext} from '@/context/AuthContext';
import {FiEdit} from 'react-icons/fi';
import {jwtDecode} from 'jwt-decode';
import {useState} from 'react';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const {user, setIsAuthenticated, setUser, setToken} = useAuthContext();

  const role = user?.role;
  const name = user?.fullname;
  const email = user?.email;

  const handleSignOut = async () => {
    // Clear localStorage with correct keys
    if (localStorage.getItem(QUERY_KEYS.TOKEN)) {
      localStorage.removeItem(QUERY_KEYS.TOKEN);
    }
    
    // Also clear any other auth-related items
    localStorage.removeItem('token');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    
    // Clear sessionStorage if used
    sessionStorage.clear();
    
    // Reset auth context
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    
    // Redirect to login page
    window.location.href = '/';
  };

  const token = localStorage.getItem(QUERY_KEYS.TOKEN); // or your key name
  let decoded;
  if (token) {
    try {
      decoded = jwtDecode(token);
      console.log('Decoded Token:', decoded?.role);
    } catch (error) {
      console.error('Invalid token:', error);
    }
  } else {
    console.log('No token found');
  }

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {name || 'User'}
          </span>
          <span className="text-gray-500 dark:text-gray-400 block text-xs capitalize">
            {role?.toLowerCase() || 'Guest'}
          </span>
        </span>

        <span className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-primary font-semibold text-lg">
            {name?.charAt(0)?.toUpperCase() || 'U'}
          </span>
        </span>

        <IoIosArrowDown
          className={`hidden fill-current transition-transform duration-200 sm:block ${
            dropdownOpen ? 'rotate-180' : ''
          }`}
          width={24}
          height={16}
        />
      </Link>

      {/* Dropdown Start */}
      {dropdownOpen && (
        <div
          className={`absolute right-0 mt-4 flex w-64 flex-col rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark`}
        >
          {/* User Info Section */}
          <div className="border-b border-stroke px-6 py-4 dark:border-strokedark">
            <p className="text-sm font-medium text-black dark:text-white">
              {name || 'User Name'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {email || 'user@example.com'}
            </p>
            <p className="text-xs text-primary mt-1 capitalize">
              {role?.toLowerCase() || 'Role'}
            </p>
          </div>
          
          {/* Menu Items */}
          <div className="flex flex-col">
            <Link
              to="/profile"
              className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors duration-200"
              onClick={() => setDropdownOpen(false)}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              My Profile
            </Link>
            
            <Link
              to="/settings"
              className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors duration-200"
              onClick={() => setDropdownOpen(false)}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </Link>
          </div>
          
          {/* Sign Out Button */}
          <div className="border-t border-stroke dark:border-strokedark">
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 px-6 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      )}
      {/* Dropdown End */}
    </ClickOutside>
  );
};

export default DropdownUser;