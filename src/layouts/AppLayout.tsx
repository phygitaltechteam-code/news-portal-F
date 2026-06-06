import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

import {useAuthContext} from '@/context/AuthContext';
import {Outlet, useNavigate} from '@tanstack/react-router';
import React, {useEffect, useState} from 'react';

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const {isAuthenticated} = useAuthContext();


  const navigate = useNavigate();

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
    <div className="dark:bg-boxdark-2 dark:text-bodydark ">
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="mx-auto  p-2 md:p-6 2xl:p-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
