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
  const [activeTab, setActiveTab] = useState('ITINERARY');
  const [selectedFacility, setSelectedFacility] = useState('');
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [activeSubTab, setActiveSubTab] = useState('');

  const facility = {
    hotel: [
      '03 night’s accommodation at Primera Seminyak/Swissbell Inn Seminyak or similar :',
      '       02 night’s accommodation at Champulang Ubud or similar',
    ],

    meal: 'Breakfast every day except on Day 1.',

    flight:
      ' Flight Optional Option to add flights availble in this package in further steps',

    sightseeng:
      'Full Day Kintamani Hot Spring Followed by Ubud Market On Pvt Basis. ',

    transfer: 'Airport / hotel / airport transfers on (PVT Basis).',
  };
  const packageData = {
    title: 'Andaman - Buy 1 Get 1 Free',
    rating: 4.3,
    reviews: 953,
    duration: '5 Nights 6 Days',
    route: 'Port Blair (3N) → Havelock Island (2N)',
    price: 24495,
    originalPrice: 48990,

    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop',
    ],

    amenities: [
      {
        icon: <Hotel className="h-5 w-5" />,
        label: 'Hotel',
        key: 'hotel',
      },
      {
        icon: <Utensils className="h-5 w-5" />,
        label: 'Meals',
        key: 'meal',
      },
      {
        icon: <Camera className="h-5 w-5" />,
        label: 'Sightseeing',
        key: 'sightseeng',
      },
      {
        icon: <Bus className="h-5 w-5" />,
        label: 'Transfer',
        key: 'transfer',
      },
    ], // ← comma missing here

    itinerary: [
      {
        day: 1,
        title: 'Arrive Port Blair – Cellular Jail – Light & Sound Show',
        image:
          'https://images.unsplash.com/photo-1589197331516-4d839633bde1?q=80&w=2070&auto=format&fit=crop',
        description: 'On arrival at Port Blair airport...',
      },
      {
        day: 2,
        title: 'Port Blair – Ross Island – North Bay Island',
        image:
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
        description: 'After breakfast...',
      },
    ],
  };

  const tabs = [
    'ITINERARY',
    'PACKAGE DETAILS',
    'CALCULATE PRICE',
    'TERMS & CONDITIONS',
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-12 pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-6 flex text-sm text-slate-500">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/">Home</Link>
            </li>
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
              <span className="font-medium text-slate-900">
                {packageData.title}
              </span>
            </li>
          </ol>
        </nav>

        {/* Title and Rating */}
        <div className="mb-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 lg:text-4xl">
                {packageData.title}{' '}
                <span className="ml-2 inline-flex items-center rounded bg-yellow-100 px-2 py-0.5 text-sm font-medium text-yellow-800">
                  {packageData.rating}{' '}
                  <Star className="ml-1 h-3 w-3 fill-yellow-800" />
                </span>
                <span className="ml-2 text-sm font-normal text-slate-500">
                  ({packageData.reviews})
                </span>
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
              <button className="flex items-center gap-2 rounded-full border-2 border-orange-600 px-6 py-2 font-bold text-orange-600 transition-all hover:bg-orange-600 hover:text-white">
                <MapPin className="h-4 w-4" />
                Plan My Tour
              </button>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-12 grid grid-cols-1 gap-4 lg:h-[500px] lg:grid-cols-12">
          <div className="relative h-full overflow-hidden rounded-3xl lg:col-span-7">
            <img
              src={packageData.images[0]}
              alt="Main"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase text-white">
              Group Tour
            </div>
          </div>
          <div className="grid h-full grid-cols-2 grid-rows-2 gap-4 lg:col-span-5">
            {packageData.images.slice(1, 5).map((img, i) => (
              <div
                key={i}
                className="relative h-full overflow-hidden rounded-2xl"
              >
                <img
                  src={img}
                  alt={`Sub ${i}`}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
                {i === 3 && (
                  <div className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 font-bold text-white backdrop-blur-sm">
                    See All Photos
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Amenities Icons */}
        <div className="mb-12 border-b border-slate-200 pb-8">
          <div className="flex flex-wrap justify-center gap-8 md:justify-start">
            {packageData.amenities.map((item, i) => (
              <button
                key={i}
                onClick={() => setSelectedFacility(item.key)}
                className="flex flex-col items-center gap-2"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-100 bg-white text-blue-600 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                  {item.icon}
                </div>

                <span className="text-xs font-bold text-slate-600">
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          {selectedFacility && (
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-lg font-bold capitalize">
                {selectedFacility}
              </h3>

              {selectedFacility === 'hotel' ? (
                <ul className="space-y-2">
                  {facility.hotel.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{facility[selectedFacility as keyof typeof facility]}</p>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="no-scrollbar mb-8 flex overflow-x-auto border-b border-slate-200">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap px-6 pb-4 text-sm font-bold transition-all ${
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
                        onClick={() =>
                          setExpandedDay(
                            expandedDay === item.day ? null : item.day,
                          )
                        }
                        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-slate-50"
                      >
                        <div className="flex items-center gap-4">
                          <span className="flex h-8 items-center justify-center rounded-full bg-orange-100 px-4 text-xs font-bold text-orange-600">
                            Day {item.day}
                          </span>
                          <span className="line-clamp-1 font-bold text-slate-900">
                            {item.title}
                          </span>
                        </div>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-100">
                          {expandedDay === item.day ? (
                            <Minus className="h-4 w-4 text-slate-400" />
                          ) : (
                            <Plus className="h-4 w-4 text-slate-400" />
                          )}
                        </div>
                      </button>
                      <motion.div
                        initial={false}
                        animate={{
                          height: expandedDay === item.day ? 'auto' : 0,
                          opacity: expandedDay === item.day ? 1 : 0,
                        }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-slate-100 p-6">
                          <div className="flex flex-col gap-6 md:flex-row">
                            <div className="w-full md:w-1/3">
                              <img
                                src={packageData.images[item.day % 5]}
                                alt="Day image"
                                className="aspect-video rounded-xl object-cover shadow-sm"
                              />
                            </div>
                            <p className="flex-1 text-sm leading-relaxed text-slate-600">
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
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="no-scrollbar mb-8 flex gap-4 overflow-x-auto border-b border-slate-100 pb-4">
                  {[
                    'Highlights',
                    'Transfer',
                    'Sightseeing',
                    'Accommodation',
                    'Meals',
                    'Inclusion/Exclusions',
                  ].map((subTab) => (
                    <button
                      key={subTab}
                      onClick={() => setActiveSubTab(subTab)}
                      className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold ${activeSubTab === subTab ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-600'}`}
                    >
                      {subTab}
                    </button>
                  ))}
                </div>

                {activeSubTab === 'Highlights' ? (
                  <div className="mb-6">
                    <h3 className="mb-4 text-xl font-bold text-slate-900">
                      Package Highlights
                    </h3>

                    <ul className="space-y-4 text-slate-600">
                      <li className="flex items-start gap-3">
                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-600" />
                        <span className="text-sm">
                          Stay in Standard 3* Hotels in Port Blair, Havelock
                        </span>
                      </li>

                      <li className="flex items-start gap-3">
                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-600" />
                        <span className="text-sm">
                          Breakfast and Dinner as per itinerary
                        </span>
                      </li>
                    </ul>
                  </div>
                ) : activeSubTab === 'Transfer' ? (
                  <div className="mb-6">
                    <h3 className="mb-4 text-xl font-bold text-slate-900">
                      Transfer
                    </h3>

                    <p className="text-slate-600">
                      Airport pickup and drop transfer included. Ferry and local
                      transport provided during sightseeing.
                    </p>
                  </div>
                ) : activeSubTab === 'Sightseeing' ? (
                  <div className="mb-6">
                    <h3 className="mb-4 text-xl font-bold text-slate-900">
                      Sightseeing
                    </h3>

                    <ul className="space-y-4 text-slate-600">
                      <li className="flex items-start gap-3">
                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-600" />
                        <span className="text-sm">
                          Cellular Jail Light & Sound Show
                        </span>
                      </li>

                      <li className="flex items-start gap-3">
                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-600" />
                        <span className="text-sm">
                          Ross Island and North Bay Island Tour
                        </span>
                      </li>

                      <li className="flex items-start gap-3">
                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-600" />
                        <span className="text-sm">
                          Elephant Beach and Radhanagar Beach Visit
                        </span>
                      </li>
                    </ul>
                  </div>
                ) : activeSubTab === 'Accommodation' ? (
                  <div className="mb-6">
                    <h3 className="mb-4 text-xl font-bold text-slate-900">
                      Accommodation
                    </h3>

                    <p className="text-slate-600">
                      Accommodation in premium hotels with daily housekeeping
                      and modern amenities included.
                    </p>
                  </div>
                ) : activeSubTab === 'Meals' ? (
                  <div className="mb-6">
                    <h3 className="mb-4 text-xl font-bold text-slate-900">
                      Meals
                    </h3>

                    <p className="text-slate-600">
                      Daily breakfast and dinner included as per the itinerary.
                    </p>
                  </div>
                ) : activeSubTab === 'Inclusion/Exclusions' ? (
                  <div className="mb-6">
                    <h3 className="mb-4 text-xl font-bold text-slate-900">
                      Inclusion / Exclusions
                    </h3>

                    <ul className="space-y-4 text-slate-600">
                      <li className="flex items-start gap-3">
                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                        <span className="text-sm">
                          Hotel accommodation included
                        </span>
                      </li>

                      <li className="flex items-start gap-3">
                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                        <span className="text-sm">
                          Airport transfers included
                        </span>
                      </li>

                      <li className="flex items-start gap-3">
                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
                        <span className="text-sm">
                          Flight tickets not included
                        </span>
                      </li>
                    </ul>
                  </div>
                ) : null}
                <h3 className="mb-6 text-xl font-bold text-slate-900"></h3>
                <ul className="space-y-4 text-slate-600">
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-600" />
                    <span className="text-sm">
                      Stay in Standard 3* Hotels in Port Blair, Havelock
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-600" />
                    <span className="text-sm">
                      Breakfast and Dinner as per itinerary
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-600" />
                    <span className="text-sm">
                      One of Asia's Top Beaches - Radhanagar Beach
                    </span>
                  </li>
                </ul>
                <button className="mt-8 text-xs font-bold text-orange-600 hover:underline">
                  Read More
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 line-through">
                    ₹{packageData.originalPrice.toLocaleString()}
                  </span>
                  <div className="text-4xl font-extrabold text-slate-900">
                    ₹{packageData.price.toLocaleString()}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Starting price per adult
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1 rounded-lg border border-orange-100 bg-orange-50 px-2 py-1 text-[10px] font-bold text-orange-600">
                    <Zap className="h-3 w-3" />
                    Earn +244
                  </div>
                  <span className="mt-1 text-right text-[9px] text-slate-400">
                    Holiday reward points on this booking
                  </span>
                </div>
              </div>

              <button className="mb-4 w-full rounded-2xl bg-orange-600 py-4 text-lg font-bold text-white shadow-lg shadow-orange-200 transition-all hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-xl active:scale-[0.98]">
                Book Now
              </button>

              <div className="flex gap-4">
                <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-xs font-bold text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50">
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
              <div className="mb-4 flex items-center justify-between">
                <h4 className="flex items-center gap-2 font-bold text-slate-900">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Plus className="h-3 w-3" />
                  </div>
                  Offers
                </h4>
                <span className="text-[10px] font-bold uppercase text-green-600">
                  Applicable after calculating price
                </span>
              </div>
              <div className="space-y-3">
                <p className="text-[10px] font-medium text-slate-500">
                  Have a coupon code?
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-400 transition-all hover:border-slate-400 hover:text-slate-600">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Packages */}
        <section className="mt-24">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-slate-900">
              Recommended Packages(3)
            </h2>
            <div className="mx-8 hidden h-1 flex-1 rounded-full bg-slate-100 md:block" />
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Andaman Fully Loaded With Neil Stay',
                sub: '3N Port Blair - 2N Havelock Island - 1N Neil',
                price: 118980,
                old: 129800,
              },
              {
                title: 'Honeymoon Special - Amazing Moment Andaman',
                sub: '3N Port Blair - 2N Havelock Island - 1N Neil',
                price: 123800,
                old: 137800,
              },
              {
                title: 'Honeymoon Special - Luxury Charming Moments Andaman',
                sub: '3N Port Blair - 2N Havelock Island - 1N Neil',
                price: 307880,
                old: 342270,
              },
            ].map((pkg, i) => (
              <div
                key={i}
                className="group relative aspect-[3/4] overflow-hidden rounded-[32px] bg-slate-200 shadow-lg"
              >
                <img
                  src={`https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2071&auto=format&fit=crop&sig=${i + 10}`}
                  alt={pkg.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute right-6 top-6 flex gap-3">
                  <button className="rounded-full border border-white/20 bg-white/10 p-3 text-white backdrop-blur-md transition-all hover:bg-white/30">
                    <Heart className="h-4 w-4" />
                  </button>
                  <button className="rounded-full border border-white/20 bg-white/10 p-3 text-white backdrop-blur-md transition-all hover:bg-white/30">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-8">
                  <h3 className="mb-2 text-xl font-bold leading-tight text-white transition-transform group-hover:translate-x-1">
                    {pkg.title}
                  </h3>
                  <p className="mb-6 text-xs font-medium text-white/70">
                    {pkg.sub}
                  </p>
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="mb-1 block text-[10px] text-white/50 line-through">
                        Rs. {pkg.old.toLocaleString()}
                      </span>
                      <span className="text-xl font-extrabold text-white">
                        Rs. {pkg.price.toLocaleString()}{' '}
                        <span className="text-[10px] font-normal uppercase tracking-tighter opacity-80">
                          Per Person
                        </span>
                      </span>
                    </div>
                    <button className="rounded-xl bg-orange-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-orange-900/20 transition-all hover:bg-orange-700 active:scale-95">
                      Book Now
                    </button>
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
