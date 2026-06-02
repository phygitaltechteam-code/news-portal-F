import {motion} from 'framer-motion';
import {createFileRoute, Link} from '@tanstack/react-router';
import {useForm, FormProvider, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';

import {
  Search,
  MapPin,
  Calendar,
  Users,
  Star,
  ChevronRight,
  Globe,
  ShieldCheck,
  HeadphonesIcon,
  ArrowRight,
} from 'lucide-react';
import Newsletter from '@/components/sections/Newsletter';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import BusSearch from '@/components/customer/BusSearch';

function LandingPage() {
  const destinations = [
    {
      id: 1,
      name: 'Bali, Indonesia',
      price: '$850',
      rating: 4.9,
      category: 'Tropical',
    },
    {
      id: 2,
      name: 'Santorini, Greece',
      price: '$1,200',
      rating: 4.8,
      category: 'Coastal',
    },
    {
      id: 3,
      name: 'Swiss Alps, Switzerland',
      price: '$1,500',
      rating: 5.0,
      category: 'Mountain',
    },
    {
      id: 4,
      name: 'Kyoto, Japan',
      price: '$950',
      rating: 4.7,
      category: 'Cultural',
    },
  ];

  const features = [
    {
      icon: <Globe className="h-6 w-6 text-orange-500" />,
      title: 'Global Reach',
      description: 'Explore over 500+ destinations across the globe with ease.',
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-orange-500" />,
      title: 'Secure Booking',
      description:
        'Your safety and security are our top priorities with encrypted payments.',
    },
    {
      icon: <HeadphonesIcon className="h-6 w-6 text-orange-500" />,
      title: '24/7 Support',
      description:
        'Our travel experts are always available to help you on your journey.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-20 font-sans text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-20 pt-32 lg:pb-32 lg:pt-48">
        {/* Background Accents */}
        <div className="absolute right-0 top-0 -z-10 h-[600px] w-[600px] -translate-y-1/4 translate-x-1/4 rounded-full bg-orange-100 opacity-50 blur-3xl" />
        <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] -translate-x-1/4 translate-y-1/4 rounded-full bg-red-100 opacity-50 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6}}
          >
            <span className="mb-6 inline-block rounded-full bg-orange-50 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-orange-600">
              Discover the World
            </span>
            <h1 className="mb-8 text-5xl font-extrabold leading-[1.1] text-slate-900 lg:text-7xl">
              Explore the World, One <br />
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Adventure
              </span>{' '}
              at a Time
            </h1>
            <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-slate-600 lg:text-xl">
              Discover hidden gems, luxury stays, and unforgettable experiences
              curated just for you. Your next journey starts here.
            </p>
          </motion.div>
        </div>
      </section>
      {/* <div  className="w-500 h-20 bg-white flex mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 rounded-3xl border border-slate-100 shadow-sm"> */}
      {/* Search bus */}

      <BusSearch />
      {/* </div> */}
      {/* Popular Destinations */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
            <div>
              <h2 className="mb-4 text-3xl font-bold text-slate-900 lg:text-4xl">
                Popular Destinations
              </h2>
              <p className="max-w-xl text-slate-500">
                From tropical paradises to mountain escapes, find the perfect
                spot for your next holiday.
              </p>
            </div>
            <button className="group flex items-center gap-2 font-bold text-orange-600">
              View All Destinations
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((dest, i) => (
              <motion.div
                key={dest.id}
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{delay: i * 0.1}}
                className="group cursor-pointer"
              >
                <Link
                  to="/package/$id"
                  params={{id: dest.id.toString()}}
                  className="block"
                >
                  <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-3xl bg-slate-200 shadow-md transition-all group-hover:shadow-xl">
                    {/* Image Placeholder */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent" />
                    <img
                      src={`https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop&sig=${dest.id}`}
                      alt={dest.name}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    <div className="absolute right-4 top-4 z-20 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 shadow-sm backdrop-blur-sm">
                      <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                      <span className="text-xs font-bold text-slate-900">
                        {dest.rating}
                      </span>
                    </div>

                    <div className="absolute bottom-6 left-6 z-20 text-white">
                      <span className="text-xs font-semibold uppercase tracking-wider opacity-80">
                        {dest.category}
                      </span>
                      <h3 className="mt-1 text-xl font-bold transition-transform group-hover:translate-x-1">
                        {dest.name}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-1">
                    <div>
                      <p className="text-sm font-medium text-slate-400">
                        Starting from
                      </p>
                      <p className="text-lg font-bold text-slate-900">
                        {dest.price}
                        <span className="text-sm font-normal text-slate-400">
                          /person
                        </span>
                      </p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 transition-all group-hover:border-orange-600 group-hover:bg-orange-600">
                      <ArrowRight className="h-5 w-5 text-slate-400 transition-colors group-hover:text-white" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative overflow-hidden bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 lg:text-4xl">
              Why Choose Travelex?
            </h2>
            <p className="mx-auto max-w-2xl text-slate-500">
              We provide the best travel experiences with premium services and
              dedicated support.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{delay: i * 0.2}}
                className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-slate-500">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}

export default LandingPage;
