import { Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Globe className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-slate-900">Travelex</span>
            </div>
            <p className="text-slate-500 leading-relaxed">
              Making travel simple, accessible and unforgettable for everyone, everywhere.
            </p>
            <div className="flex gap-4">
              {/* Social placeholders */}
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white transition-all cursor-pointer flex items-center justify-center text-slate-400"
                >
                  <Globe className="w-5 h-5" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Destinations</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-500 hover:text-blue-600 transition-colors">Europe</a></li>
              <li><a href="#" className="text-slate-500 hover:text-blue-600 transition-colors">Asia</a></li>
              <li><a href="#" className="text-slate-500 hover:text-blue-600 transition-colors">North America</a></li>
              <li><a href="#" className="text-slate-500 hover:text-blue-600 transition-colors">South America</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-500 hover:text-blue-600 transition-colors">About Us</a></li>
              <li><a href="#" className="text-slate-500 hover:text-blue-600 transition-colors">Contact</a></li>
              <li><a href="#" className="text-slate-500 hover:text-blue-600 transition-colors">Careers</a></li>
              <li><a href="#" className="text-slate-500 hover:text-blue-600 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Support</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-500 hover:text-blue-600 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-slate-500 hover:text-blue-600 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-slate-500 hover:text-blue-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-slate-500 hover:text-blue-600 transition-colors">Community</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 text-center">
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} Travelex Inc. All rights reserved. Designed for explorers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
