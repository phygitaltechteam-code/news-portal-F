import {useState} from 'react';
import {motion} from 'framer-motion';
import {Globe, Menu, X} from 'lucide-react';
import {useNavigate, Link} from '@tanstack/react-router';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    {name: 'Home', to: '/'},
    {name: 'About Us', to: '/destinations'},
    {name: 'Contact Us', to: '/tours'},
    {name: 'Magazine', to: '/about'},
  ];

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-2xl font-bold text-transparent">
              NewsPortal
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="font-medium text-slate-600 transition-colors hover:text-orange-600"
                activeProps={{className: 'text-orange-600 font-bold'}}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => navigate({to: '/signin'})}
              className="rounded-full bg-orange-600 px-6 py-2.5 font-semibold text-white shadow-lg shadow-orange-200 transition-all hover:bg-orange-700 active:scale-95"
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
          initial={{opacity: 0, y: -20}}
          animate={{opacity: 1, y: 0}}
          className="space-y-4 border-b border-slate-200 bg-white px-4 py-6 md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              className="block font-medium text-slate-600"
              activeProps={{className: 'text-orange-600 font-bold'}}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={() => navigate({to: '/signin'})}
            className="w-full rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white"
          >
            Sign In
          </button>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
