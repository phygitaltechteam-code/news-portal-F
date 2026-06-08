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
  const {user} = useAuthContext();

  const role = user?.role;
  const name = user?.fullname;
  const email = user?.email;

  const handleSignOut = async () => {
    if (localStorage.getItem(QUERY_KEYS.TOKEN)) {
      localStorage.removeItem(QUERY_KEYS.TOKEN);
      window.location.reload();
    }
  };

  const token = localStorage.getItem('token'); // or your key name
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
            {name}
          </span>
          <span className="text-gray-500 dark:text-gray-400 block text-xs capitalize">
            {role?.toLowerCase()}
          </span>
        </span>

        <span className="h-12 w-12 rounded-full">
          {/* <img
            src={UserOne}
            alt="User"
            className="h-full w-full rounded-full object-cover"
          /> */}
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
          <div className="flex">
            <button
              onClick={handleSignOut}
              className="hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-3 px-6 py-3 text-sm font-medium text-red-600 duration-300 ease-in-out hover:text-red-700 lg:text-base"
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
