import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Outlet } from '@tanstack/react-router';

const WebsiteLayout = () => {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default WebsiteLayout;
