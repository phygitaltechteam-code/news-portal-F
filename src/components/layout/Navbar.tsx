import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Menu, X } from 'lucide-react';
import { useNavigate, Link } from '@tanstack/react-router';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    {name:'Bus Tickets', to: '/bustickets'},
    { name: 'Destinations', to: '/destinations' },
    { name: 'Tours', to: '/tours' },
    { name: 'Add Package', to: '/add-package' },
    { name: 'About', to: '/about' },
    { name: 'Blog', to: '/blog' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center">
              <Globe className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Travelex
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="text-slate-600 hover:text-orange-600 font-medium transition-colors"
                activeProps={{ className: 'text-orange-600 font-bold' }}
              >
                {link.name}
              </Link>
            ))}
            <button 
              onClick={() => navigate({ to: '/signin' })}
              className="bg-orange-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-orange-700 transition-all shadow-lg shadow-orange-200 active:scale-95"
            >
              Sign In
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-slate-200 px-4 py-6 space-y-4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              className="block text-slate-600 font-medium"
              activeProps={{ className: 'text-orange-600 font-bold' }}
            >
              {link.name}
            </Link>
          ))}
          <button 
            onClick={() => navigate({ to: '/signin' })}
            className="w-full bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Sign In
          </button>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
