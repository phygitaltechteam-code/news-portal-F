import { Outlet } from '@tanstack/react-router';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const AppLayout = () => {
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark min-h-screen font-sans">
      <Navbar />
      <div className="flex flex-col min-h-screen">
        {/* Main content */}
        <div className="relative flex flex-1 flex-col">
          <main>
            <div className="mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
