import {createFileRoute, Link} from '@tanstack/react-router';
import {motion} from 'framer-motion';
import {
  Star,
  Clock,
  MapPin,
  Hotel,
  Utensils,
  Camera,
  Bus,
  User,
  Zap,
  Download,
  Share2,
  Heart,
  ChevronDown,
  Plus,
  Minus,
} from 'lucide-react';
import {useState} from 'react';

export const Route = createFileRoute('/_app/package/$id')({
  component: PackageDetailsPage,
});

function PackageDetailsPage() {
  const {id} = Route.useParams();
  const [activeTab, setActiveTab] = useState('ITINERARY');
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  const packageData = {
    title: 'Andaman - Buy 1 Get 1 Free',
    rating: 4.3,
    reviews: 953,
    duration: '5 Nights 6 Days',
    route: 'Port Blair (3N) → Havelock Island (2N)',
    price: 24495,
    originalPrice: 48990,
    images: [
      'https://images.unsplash.com/photo-1589197331516-4d839633bde1?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop',
    ],
    amenities: [
      {icon: <Hotel className="h-5 w-5" />, label: 'Hotel'},
      {icon: <Utensils className="h-5 w-5" />, label: 'Meals'},
      {icon: <Camera className="h-5 w-5" />, label: 'Sightseeing'},
      {icon: <Bus className="h-5 w-5" />, label: 'Transfer'},
      {icon: <User className="h-5 w-5" />, label: 'Tour Manager'},
      {icon: <Zap className="h-5 w-5" />, label: 'Highlights'},
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrive Port Blair – Cellular Jail – Light & Sound Show',
        description:
          'On arrival at Port Blair airport, our representative will receive and escorted to the hotel. After check-in at the hotel and little relax, visit the Cellular Jail (National Memorial). Light & Sound Show at Cellular Jail: At evening, we move for the Light and Sound Show at Cellular Jail where the saga of the freedom struggle brought alive.',
      },
      {
        day: 2,
        title: 'Port Blair – Ross Island – North Bay Island',
        description:
          'After breakfast, we proceed for a full day cruising towards Ross Island and North Bay Island (Coral Island). Ross Island, the erstwhile capital of Port Blair during the British regime. North Bay Island (Coral Island) offers exotic coral, colourful fishes and underwater marine life.',
      },
      {
        day: 3,
        title: 'Port Blair (Corbyns Cove Beach) To Havelock',
        description:
          'In the morning, proceed to Havelock Island by ferry. Havelock Island is famous for its pristine beaches and crystal clear waters.',
      },
      {
        day: 4,
        title: 'Havelock – Elephant Beach And Radhanagar Beach',
        description:
          'Visit Elephant Beach, famous for its coral reefs and water sports. Later, visit Radhanagar Beach, rated as one of the best beaches in Asia.',
      },
    ],
  };

  const tabs = ['ITINERARY', 'PACKAGE DETAILS', 'CALCULATE PRICE', 'TERMS & CONDITIONS'];

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-6 flex text-sm text-slate-500">
          <ol className="flex items-center space-x-2">
            <li><Link to="/">Home</Link></li>
            <li className="flex items-center space-x-2">
              <span>/</span>
              <span>India Tour Packages</span>
            </li>
            <li className="flex items-center space-x-2">
              <span>/</span>
              <span>Andaman And Nicobar Islands Tour Packages</span>
            </li>
            <li className="flex items-center space-x-2">
              <span>/</span>
              <span className="font-medium text-slate-900">{packageData.title}</span>
            </li>
          </ol>
        </nav>

        {/* Title and Rating */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 lg:text-4xl">
                {packageData.title} <span className="ml-2 inline-flex items-center rounded bg-yellow-100 px-2 py-0.5 text-sm font-medium text-yellow-800">
                  {packageData.rating} <Star className="ml-1 h-3 w-3 fill-yellow-800" />
                </span>
                <span className="ml-2 text-sm font-normal text-slate-500">({packageData.reviews})</span>
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-6 text-slate-600">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span>{packageData.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span>{packageData.route}</span>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
               <button className="flex items-center gap-2 font-bold text-orange-600 border-2 border-orange-600 rounded-full px-6 py-2 hover:bg-orange-600 hover:text-white transition-all">
                 <MapPin className="h-4 w-4" />
                 Plan My Tour
               </button>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-12 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:h-[500px]">
          <div className="relative overflow-hidden rounded-3xl lg:col-span-7 h-full">
            <img
              src={packageData.images[0]}
              alt="Main"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white uppercase">
              Group Tour
            </div>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 lg:col-span-5 h-full">
            {packageData.images.slice(1, 5).map((img, i) => (
              <div key={i} className="relative overflow-hidden rounded-2xl h-full">
                <img
                  src={img}
                  alt={`Sub ${i}`}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
                {i === 3 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white font-bold cursor-pointer backdrop-blur-sm">
                    See All Photos
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Amenities Icons */}
        <div className="mb-12 flex flex-wrap justify-center md:justify-start gap-8 border-b border-slate-200 pb-8">
          {packageData.amenities.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2 min-w-[80px]">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 text-blue-600 transition-all hover:shadow-md hover:-translate-y-1">
                {item.icon}
              </div>
              <span className="text-xs font-bold text-slate-600">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="mb-8 flex overflow-x-auto border-b border-slate-200 no-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-6 text-sm font-bold whitespace-nowrap transition-all ${
                    activeTab === tab
                      ? 'border-b-4 border-orange-600 text-orange-600'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content: Itinerary */}
            {activeTab === 'ITINERARY' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900">Itinerary</h3>
                <div className="space-y-4">
                  {packageData.itinerary.map((item) => (
                    <div
                      key={item.day}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
                    >
                      <button
                        onClick={() => setExpandedDay(expandedDay === item.day ? null : item.day)}
                        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-slate-50"
                      >
                        <div className="flex items-center gap-4">
                          <span className="flex h-8 px-4 items-center justify-center rounded-full bg-orange-100 text-orange-600 text-xs font-bold">
                            Day {item.day}
                          </span>
                          <span className="font-bold text-slate-900 line-clamp-1">{item.title}</span>
                        </div>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-100">
                          {expandedDay === item.day ? <Minus className="h-4 w-4 text-slate-400" /> : <Plus className="h-4 w-4 text-slate-400" />}
                        </div>
                      </button>
                      <motion.div
                        initial={false}
                        animate={{ height: expandedDay === item.day ? 'auto' : 0, opacity: expandedDay === item.day ? 1 : 0 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-slate-100 p-6">
                          <div className="flex flex-col gap-6 md:flex-row">
                            <div className="w-full md:w-1/3">
                              <img
                                src={packageData.images[item.day % 5]}
                                alt="Day image"
                                className="rounded-xl object-cover aspect-video shadow-sm"
                              />
                            </div>
                            <p className="flex-1 text-slate-600 leading-relaxed text-sm">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'PACKAGE DETAILS' && (
              <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm">
                <div className="mb-8 flex gap-4 overflow-x-auto no-scrollbar border-b border-slate-100 pb-4">
                   {['Highlights', 'Transfer', 'Sightseeing', 'Accommodation', 'Meals', 'Inclusion/Exclusions'].map(subTab => (
                     <button key={subTab} className={`text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap ${subTab === 'Sightseeing' ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                       {subTab}
                     </button>
                   ))}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-6">Highlights</h3>
                <ul className="space-y-4 text-slate-600">
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-600 shrink-0" />
                    <span className="text-sm">Stay in Standard 3* Hotels in Port Blair, Havelock</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-600 shrink-0" />
                    <span className="text-sm">Breakfast and Dinner as per itinerary</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-600 shrink-0" />
                    <span className="text-sm">One of Asia's Top Beaches - Radhanagar Beach</span>
                  </li>
                </ul>
                <button className="mt-8 text-orange-600 font-bold text-xs hover:underline">Read More</button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 line-through">₹{packageData.originalPrice.toLocaleString()}</span>
                  <div className="text-4xl font-extrabold text-slate-900">₹{packageData.price.toLocaleString()}</div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Starting price per adult</span>
                </div>
                <div className="flex flex-col items-end">
                   <div className="flex items-center gap-1 text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-lg border border-orange-100">
                     <Zap className="h-3 w-3" />
                     Earn +244
                   </div>
                   <span className="text-[9px] text-slate-400 mt-1 text-right">Holiday reward points on this booking</span>
                </div>
              </div>

              <button className="mb-4 w-full rounded-2xl bg-orange-600 py-4 text-lg font-bold text-white shadow-lg shadow-orange-200 transition-all hover:bg-orange-700 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98]">
                Book Now
              </button>

              <div className="flex gap-4">
                <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-xs font-bold text-slate-600 transition-all hover:bg-slate-50 hover:border-slate-300">
                  <Heart className="h-4 w-4" />
                  Add to Wishlist
                </button>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
                <button className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-slate-900">
                  <Download className="h-4 w-4" />
                  Download PDF
                </button>
                <button className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-slate-900">
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
               <div className="flex items-center justify-between mb-4">
                  <h4 className="flex items-center gap-2 font-bold text-slate-900">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                       <Plus className="h-3 w-3" />
                    </div>
                    Offers
                  </h4>
                  <span className="text-[10px] font-bold text-green-600 uppercase">Applicable after calculating price</span>
               </div>
               <div className="space-y-3">
                 <p className="text-[10px] text-slate-500 font-medium">Have a coupon code?</p>
                 <div className="flex gap-2">
                    <input type="text" placeholder="Enter code" className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    <button className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-400 hover:border-slate-400 hover:text-slate-600 transition-all">Apply</button>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Recommended Packages */}
        <section className="mt-24">
          <div className="flex items-center justify-between mb-10">
             <h2 className="text-3xl font-bold text-slate-900">Recommended Packages(3)</h2>
             <div className="h-1 flex-1 mx-8 bg-slate-100 rounded-full hidden md:block" />
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Andaman Fully Loaded With Neil Stay', sub: '3N Port Blair - 2N Havelock Island - 1N Neil', price: 118980, old: 129800 },
              { title: 'Honeymoon Special - Amazing Moment Andaman', sub: '3N Port Blair - 2N Havelock Island - 1N Neil', price: 123800, old: 137800 },
              { title: 'Honeymoon Special - Luxury Charming Moments Andaman', sub: '3N Port Blair - 2N Havelock Island - 1N Neil', price: 307880, old: 342270 },
            ].map((pkg, i) => (
              <div key={i} className="group relative overflow-hidden rounded-[32px] bg-slate-200 aspect-[3/4] shadow-lg">
                <img
                  src={`https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2071&auto=format&fit=crop&sig=${i + 10}`}
                  alt={pkg.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute top-6 right-6 flex gap-3">
                   <button className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/30 transition-all"><Heart className="h-4 w-4" /></button>
                   <button className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/30 transition-all"><Share2 className="h-4 w-4" /></button>
                </div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:translate-x-1 transition-transform">{pkg.title}</h3>
                  <p className="text-xs text-white/70 mb-6 font-medium">{pkg.sub}</p>
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-[10px] text-white/50 line-through block mb-1">Rs. {pkg.old.toLocaleString()}</span>
                      <span className="text-xl font-extrabold text-white">Rs. {pkg.price.toLocaleString()} <span className="text-[10px] font-normal opacity-80 uppercase tracking-tighter">Per Person</span></span>
                    </div>
                    <button className="rounded-xl bg-orange-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-orange-900/20 hover:bg-orange-700 transition-all active:scale-95">Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
