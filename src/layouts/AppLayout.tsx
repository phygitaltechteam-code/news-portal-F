import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

import {useAuthContext} from '@/context/AuthContext';
import {Outlet, useNavigate} from '@tanstack/react-router';
import React, {useEffect, useState} from 'react';

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const {isAuthenticated} = useAuthContext();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const navigate = useNavigate();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      
      // Close sidebar automatically when resizing to desktop
      if (!mobile) {
        setSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // if (!isAuthenticated) {
    //   navigate({ to: '/landing' });
    //   return;
    // }

    // if (customer?.role === 'ADMIN') {
    //   navigate({ to: '/dashboard' });
    //   return;
    // }

    // if (customer?.role === 'CUSTOMER') {
    //   navigate({ to: '/customer/dashboard' });
    //   return;
    // }
  }, [isAuthenticated, navigate]);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        {/* Main Content Area */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* Header - Pass sidebar state */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          
          {/* Main Content */}
          <main>
            <div className={`mx-auto transition-all duration-300 p-2 md:p-6 2xl:p-10 ${
              !isMobile && sidebarOpen ? 'lg:ml-0' : ''
            }`}>
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;