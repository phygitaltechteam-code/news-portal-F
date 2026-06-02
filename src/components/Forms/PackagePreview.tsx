import React, { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Clock,
  MapPin,
  Hotel,
  Utensils,
  Camera,
  Bus,
  Zap,
  Heart,
  Share2,
  Download,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  ImageOff,
  Plus,
  Minus,
} from 'lucide-react';

export default function PackagePreview() {
  const { control } = useFormContext();
  const [activeTab, setActiveTab] = useState('ITINERARY');
  const [expandedDay, setExpandedDay] = useState<number | null>(0);

  // Watch all fields live
  const packageName = useWatch({ control, name: 'packageName' });
  const rating = useWatch({ control, name: 'rating' });
  const reviews = useWatch({ control, name: 'reviews' });
  const price = useWatch({ control, name: 'price' });
  const nights = useWatch({ control, name: 'nights' });
  const days = useWatch({ control, name: 'days' });
  const locations = useWatch({ control, name: 'locations' }) ?? [];
  const photos = useWatch({ control, name: 'photos' }) ?? [];
  const itinerary = useWatch({ control, name: 'itinerary' }) ?? [];
  const highlights = useWatch({ control, name: 'highlights' }) ?? [];
  const transfers = useWatch({ control, name: 'transfers' }) ?? [];
  const sightseeing = useWatch({ control, name: 'sightseeing' }) ?? [];
  const hotels = useWatch({ control, name: 'hotels' }) ?? [];
  const meals = useWatch({ control, name: 'meals' }) ?? [];
  const inclusions = useWatch({ control, name: 'inclusions' }) ?? [];
  const exclusions = useWatch({ control, name: 'exclusions' }) ?? [];

  const validPhotos = photos.map((p: any) => p.value).filter(Boolean);
  const validLocations = locations.map((l: any) => l.value).filter(Boolean);
  const validHighlights = highlights.map((h: any) => h.value).filter(Boolean);
  const validTransfers = transfers.map((t: any) => t.value).filter(Boolean);
  const validSightseeing = sightseeing.map((s: any) => s.value).filter(Boolean);
  const validMeals = meals.map((m: any) => m.value).filter(Boolean);
  const validInclusions = inclusions.map((i: any) => i.value).filter(Boolean);
  const validExclusions = exclusions.map((e: any) => e.value).filter(Boolean);

  const durationStr = [nights && `${nights} Nights`, days && `${days} Days`].filter(Boolean).join(' ');
  const routeStr = validLocations.join(' → ');

  const hasNoData = !packageName && validPhotos.length === 0 && !price;

  const tabs = ['ITINERARY', 'PACKAGE DETAILS'];

  const amenities = [
    { icon: <Hotel className="h-5 w-5" />, label: 'Hotel', show: hotels.some((h: any) => h.name) },
    { icon: <Utensils className="h-5 w-5" />, label: 'Meals', show: validMeals.length > 0 },
    { icon: <Camera className="h-5 w-5" />, label: 'Sightseeing', show: validSightseeing.length > 0 },
    { icon: <Bus className="h-5 w-5" />, label: 'Transfer', show: validTransfers.length > 0 },
    { icon: <Zap className="h-5 w-5" />, label: 'Highlights', show: validHighlights.length > 0 },
  ].filter(a => a.show);

  if (hasNoData) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
          <ImageOff className="w-10 h-10 text-slate-300 dark:text-slate-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-400 dark:text-slate-500 mb-2">No Preview Yet</h3>
        <p className="text-slate-400 dark:text-slate-600 text-sm max-w-xs">
          Start filling in the form fields on the left to see a live preview of your package here.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-full"
    >
      {/* Preview Banner */}
      <div className="mb-6 px-4 py-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 rounded-2xl flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
        <p className="text-amber-700 dark:text-amber-400 text-xs font-semibold">
          Live Preview — This updates as you fill the form. It shows how the package will appear to customers.
        </p>
      </div>

      {/* Title & Rating */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
          {packageName || <span className="text-slate-300 dark:text-slate-600 italic">Package Name...</span>}
          {rating && (
            <span className="ml-3 inline-flex items-center rounded bg-yellow-100 dark:bg-yellow-900/40 px-2.5 py-1 text-sm font-bold text-yellow-800 dark:text-yellow-400">
              {rating} <Star className="ml-1 h-3 w-3 fill-yellow-800 dark:fill-yellow-400" />
            </span>
          )}
          {reviews && (
            <span className="ml-2 text-sm font-normal text-slate-400">({reviews})</span>
          )}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-slate-600 dark:text-slate-400">
          {durationStr && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-blue-600" />
              <span>{durationStr}</span>
            </div>
          )}
          {routeStr && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-blue-600" />
              <span>{routeStr}</span>
            </div>
          )}
        </div>
      </div>

      {/* Image Gallery */}
      {validPhotos.length > 0 && (
        <div className="mb-10 grid grid-cols-1 gap-3 lg:grid-cols-12 lg:h-[380px] rounded-3xl overflow-hidden">
          <div className="relative overflow-hidden lg:col-span-7 h-full rounded-3xl lg:rounded-none">
            <img
              src={validPhotos[0]}
              alt="Main"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800';
              }}
            />
            <div className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white uppercase">
              Group Tour
            </div>
          </div>
          {validPhotos.length > 1 && (
            <div className="grid grid-cols-2 grid-rows-2 gap-3 lg:col-span-5 h-full">
              {validPhotos.slice(1, 5).map((img: string, i: number) => (
                <div key={i} className="relative overflow-hidden rounded-2xl">
                  <img
                    src={img}
                    alt={`Sub ${i}`}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400';
                    }}
                  />
                  {i === 3 && validPhotos.length > 5 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white font-bold text-sm cursor-pointer backdrop-blur-sm">
                      +{validPhotos.length - 5} more
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Amenities */}
      {amenities.length > 0 && (
        <div className="mb-10 flex flex-wrap gap-6 border-b border-slate-200 dark:border-strokedark pb-8">
          {amenities.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2 min-w-[64px]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-boxdark shadow-sm border border-slate-100 dark:border-strokedark text-blue-600 transition-all hover:shadow-md hover:-translate-y-1">
                {item.icon}
              </div>
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{item.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Content - Tabs */}
        <div className="lg:col-span-2">
          <div className="mb-6 flex overflow-x-auto border-b border-slate-200 dark:border-strokedark no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-5 text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? 'border-b-4 border-orange-600 text-orange-600'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Itinerary Tab */}
          {activeTab === 'ITINERARY' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Itinerary</h3>
              {itinerary.filter((item: any) => item.title || item.description).length === 0 ? (
                <p className="text-slate-400 dark:text-slate-600 text-sm italic">No itinerary added yet.</p>
              ) : (
                itinerary
                  .filter((item: any) => item.title || item.description)
                  .map((item: any, index: number) => (
                    <div
                      key={index}
                      className="overflow-hidden rounded-2xl border border-slate-200 dark:border-strokedark bg-white dark:bg-boxdark shadow-sm"
                    >
                      <button
                        onClick={() => setExpandedDay(expandedDay === index ? null : index)}
                        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-slate-50 dark:hover:bg-meta-4"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-7 px-3 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 text-xs font-bold">
                            {item.day || `Day ${index + 1}`}
                          </span>
                          <span className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">
                            {item.title || 'Untitled Day'}
                          </span>
                        </div>
                        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-100 dark:border-strokedark shrink-0">
                          {expandedDay === index
                            ? <Minus className="h-3 w-3 text-slate-400" />
                            : <Plus className="h-3 w-3 text-slate-400" />
                          }
                        </div>
                      </button>
                      <AnimatePresence initial={false}>
                        {expandedDay === index && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-slate-100 dark:border-strokedark p-5">
                              <p className="text-slate-600 dark:text-bodydark text-sm leading-relaxed">
                                {item.description || <span className="italic text-slate-400">No description provided.</span>}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))
              )}
            </div>
          )}

          {/* Package Details Tab */}
          {activeTab === 'PACKAGE DETAILS' && (
            <div className="space-y-8">
              {/* Highlights */}
              {validHighlights.length > 0 && (
                <div className="bg-white dark:bg-boxdark p-6 rounded-2xl border border-slate-200 dark:border-strokedark shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✨ Highlights</h3>
                  <ul className="space-y-3">
                    {validHighlights.map((h: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-600 shrink-0" />
                        <span className="text-sm text-slate-600 dark:text-bodydark">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Hotels */}
              {hotels.filter((h: any) => h.name).length > 0 && (
                <div className="bg-white dark:bg-boxdark p-6 rounded-2xl border border-slate-200 dark:border-strokedark shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🏨 Accommodation</h3>
                  <div className="space-y-3">
                    {hotels.filter((h: any) => h.name).map((hotel: any, i: number) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-boxdark-2 rounded-xl">
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white text-sm">{hotel.name}</p>
                          {hotel.location && <p className="text-xs text-slate-500 dark:text-bodydark">{hotel.location}</p>}
                        </div>
                        {hotel.nights && (
                          <span className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                            {hotel.nights}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Transfers, Sightseeing, Meals */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {validTransfers.length > 0 && (
                  <div className="bg-white dark:bg-boxdark p-5 rounded-2xl border border-slate-200 dark:border-strokedark shadow-sm">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-3 flex items-center gap-2">
                      <Bus className="w-4 h-4 text-blue-600" /> Transfers
                    </h4>
                    <ul className="space-y-2">
                      {validTransfers.map((t: string, i: number) => (
                        <li key={i} className="text-xs text-slate-600 dark:text-bodydark flex items-start gap-2">
                          <div className="mt-1.5 h-1 w-1 rounded-full bg-blue-400 shrink-0" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {validSightseeing.length > 0 && (
                  <div className="bg-white dark:bg-boxdark p-5 rounded-2xl border border-slate-200 dark:border-strokedark shadow-sm">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-3 flex items-center gap-2">
                      <Camera className="w-4 h-4 text-blue-600" /> Sightseeing
                    </h4>
                    <ul className="space-y-2">
                      {validSightseeing.map((s: string, i: number) => (
                        <li key={i} className="text-xs text-slate-600 dark:text-bodydark flex items-start gap-2">
                          <div className="mt-1.5 h-1 w-1 rounded-full bg-blue-400 shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {validMeals.length > 0 && (
                  <div className="bg-white dark:bg-boxdark p-5 rounded-2xl border border-slate-200 dark:border-strokedark shadow-sm">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-3 flex items-center gap-2">
                      <Utensils className="w-4 h-4 text-blue-600" /> Meals
                    </h4>
                    <ul className="space-y-2">
                      {validMeals.map((m: string, i: number) => (
                        <li key={i} className="text-xs text-slate-600 dark:text-bodydark flex items-start gap-2">
                          <div className="mt-1.5 h-1 w-1 rounded-full bg-blue-400 shrink-0" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Inclusions & Exclusions */}
              {(validInclusions.length > 0 || validExclusions.length > 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {validInclusions.length > 0 && (
                    <div className="bg-emerald-50/60 dark:bg-emerald-950/20 p-5 rounded-2xl border border-emerald-200 dark:border-emerald-900/40">
                      <h4 className="font-bold text-emerald-800 dark:text-emerald-400 text-sm mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Inclusions
                      </h4>
                      <ul className="space-y-2">
                        {validInclusions.map((inc: string, i: number) => (
                          <li key={i} className="text-xs text-emerald-700 dark:text-emerald-300 flex items-start gap-2">
                            <div className="mt-1.5 h-1 w-1 rounded-full bg-emerald-500 shrink-0" />
                            {inc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {validExclusions.length > 0 && (
                    <div className="bg-red-50/60 dark:bg-red-950/20 p-5 rounded-2xl border border-red-200 dark:border-red-900/40">
                      <h4 className="font-bold text-red-800 dark:text-red-400 text-sm mb-3 flex items-center gap-2">
                        <XCircle className="w-4 h-4" /> Exclusions
                      </h4>
                      <ul className="space-y-2">
                        {validExclusions.map((exc: string, i: number) => (
                          <li key={i} className="text-xs text-red-700 dark:text-red-300 flex items-start gap-2">
                            <div className="mt-1.5 h-1 w-1 rounded-full bg-red-500 shrink-0" />
                            {exc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar - Pricing */}
        <div>
          <div className="sticky top-4 rounded-3xl border border-slate-200 dark:border-strokedark bg-white dark:bg-boxdark p-7 shadow-xl">
            {price ? (
              <>
                <div className="mb-6">
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Starting Price</span>
                  <div className="text-4xl font-extrabold text-slate-900 dark:text-white mt-1">{price}</div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Per adult</span>
                </div>
              </>
            ) : (
              <div className="mb-6">
                <span className="text-3xl font-extrabold text-slate-300 dark:text-slate-600 italic">Price TBD</span>
              </div>
            )}

            <button className="mb-4 w-full rounded-2xl bg-orange-600 py-3.5 text-base font-bold text-white shadow-lg shadow-orange-200 dark:shadow-none transition-all hover:bg-orange-700">
              Book Now
            </button>

            <div className="flex gap-3">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-strokedark py-2.5 text-xs font-bold text-slate-600 dark:text-slate-400 transition-all hover:bg-slate-50 dark:hover:bg-meta-4">
                <Heart className="h-4 w-4" /> Wishlist
              </button>
              <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-strokedark py-2.5 text-xs font-bold text-slate-600 dark:text-slate-400 transition-all hover:bg-slate-50 dark:hover:bg-meta-4">
                <Share2 className="h-4 w-4" /> Share
              </button>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-100 dark:border-strokedark pt-5">
              <button className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white">
                <Download className="h-4 w-4" /> Download PDF
              </button>
            </div>

            {/* Duration & Route quick info */}
            {(durationStr || routeStr) && (
              <div className="mt-5 border-t border-slate-100 dark:border-strokedark pt-5 space-y-3">
                {durationStr && (
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-bodydark">
                    <Clock className="h-4 w-4 text-blue-600" />
                    {durationStr}
                  </div>
                )}
                {routeStr && (
                  <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-bodydark">
                    <MapPin className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{routeStr}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
