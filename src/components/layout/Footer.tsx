import { Newspaper, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-red-600 rounded flex items-center justify-center">
                <Newspaper className="text-white w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-black">NewsPortal</span>
            </div>
            <p className="text-gray-500 text-sm">
              Your trusted source for breaking news and stories from around the world.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-black mb-3 text-sm uppercase tracking-wide">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-500 text-sm hover:text-red-600 transition-colors">Technology</a></li>
              <li><a href="#" className="text-gray-500 text-sm hover:text-red-600 transition-colors">Business</a></li>
              <li><a href="#" className="text-gray-500 text-sm hover:text-red-600 transition-colors">Sports</a></li>
              <li><a href="#" className="text-gray-500 text-sm hover:text-red-600 transition-colors">Entertainment</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-black mb-3 text-sm uppercase tracking-wide">Company</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-500 text-sm hover:text-red-600 transition-colors">Home</a></li>
              <li><a href="/destinations" className="text-gray-500 text-sm hover:text-red-600 transition-colors">About Us</a></li>
              <li><a href="/tours" className="text-gray-500 text-sm hover:text-red-600 transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-500 text-sm hover:text-red-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-500 text-sm hover:text-red-600 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold text-black mb-3 text-sm uppercase tracking-wide">Follow Us</h4>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-600 transition-colors flex items-center justify-center text-gray-600 hover:text-white">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-600 transition-colors flex items-center justify-center text-gray-600 hover:text-white">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-600 transition-colors flex items-center justify-center text-gray-600 hover:text-white">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-600 transition-colors flex items-center justify-center text-gray-600 hover:text-white">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-400 text-xs">
            &copy; {new Date().getFullYear()} NewsPortal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;