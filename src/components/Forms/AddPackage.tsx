import React, { useState } from 'react';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Calendar, 
  MapPin, 
  Camera, 
  Star, 
  Utensils, 
  CheckCircle2, 
  XCircle, 
  Compass, 
  BedDouble, 
  Navigation, 
  FileText,
  Check
} from 'lucide-react';
import GenericInputField from './Input/GenericInputField';
import GenericTextArea from './TextArea/GenericTextArea';
import GenericButton from './Buttons/GenericButton';

type FormValues = {
  packageName: string;
  rating: string;
  reviews: string;
  price: string;
  nights: string;
  days: string;
  locations: { value: string }[];
  photos: { value: string }[];
  itinerary: { day: string; title: string; description: string }[];
  highlights: { value: string }[];
  transfers: { value: string }[];
  sightseeing: { value: string }[];
  hotels: { name: string; location: string; nights: string }[];
  meals: { value: string }[];
  inclusions: { value: string }[];
  exclusions: { value: string }[];
};

export default function AddPackage() {
  const [submittedData, setSubmittedData] = useState<any>(null);

  const methods = useForm<FormValues>({
    defaultValues: {
      packageName: '',
      rating: '',
      reviews: '',
      price: '',
      nights: '',
      days: '',
      locations: [{ value: '' }],
      photos: [{ value: '' }],
      itinerary: [{ day: '', title: '', description: '' }],
      highlights: [{ value: '' }],
      transfers: [{ value: '' }],
      sightseeing: [{ value: '' }],
      hotels: [{ name: '', location: '', nights: '' }],
      meals: [{ value: '' }],
      inclusions: [{ value: '' }],
      exclusions: [{ value: '' }],
    },
  });

  const { control, handleSubmit, reset } = methods;

  // Field Arrays
  const { fields: locationFields, append: appendLocation, remove: removeLocation } = useFieldArray({
    control,
    name: 'locations',
  });
  const { fields: photoFields, append: appendPhoto, remove: removePhoto } = useFieldArray({
    control,
    name: 'photos',
  });
  const { fields: itineraryFields, append: appendItinerary, remove: removeItinerary } = useFieldArray({
    control,
    name: 'itinerary',
  });
  const { fields: highlightFields, append: appendHighlight, remove: removeHighlight } = useFieldArray({
    control,
    name: 'highlights',
  });
  const { fields: transferFields, append: appendTransfer, remove: removeTransfer } = useFieldArray({
    control,
    name: 'transfers',
  });
  const { fields: sightseeingFields, append: appendSightseeing, remove: removeSightseeing } = useFieldArray({
    control,
    name: 'sightseeing',
  });
  const { fields: hotelFields, append: appendHotel, remove: removeHotel } = useFieldArray({
    control,
    name: 'hotels',
  });
  const { fields: mealFields, append: appendMeal, remove: removeMeal } = useFieldArray({
    control,
    name: 'meals',
  });
  const { fields: inclusionFields, append: appendInclusion, remove: removeInclusion } = useFieldArray({
    control,
    name: 'inclusions',
  });
  const { fields: exclusionFields, append: appendExclusion, remove: removeExclusion } = useFieldArray({
    control,
    name: 'exclusions',
  });

  const onSubmit = (data: FormValues) => {
    const formattedData = {
      ...data,
      locations: data.locations.map((item) => item.value).filter(Boolean),
      photos: data.photos.map((item) => item.value).filter(Boolean),
      highlights: data.highlights.map((item) => item.value).filter(Boolean),
      transfers: data.transfers.map((item) => item.value).filter(Boolean),
      sightseeing: data.sightseeing.map((item) => item.value).filter(Boolean),
      meals: data.meals.map((item) => item.value).filter(Boolean),
      inclusions: data.inclusions.map((item) => item.value).filter(Boolean),
      exclusions: data.exclusions.map((item) => item.value).filter(Boolean),
    };
    setSubmittedData(formattedData);
    alert('Package added successfully');
    console.log('Submitted Package Data:', formattedData);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-boxdark rounded-[30px] p-8 lg:p-12 shadow-2xl border border-slate-100 dark:border-strokedark"
      >
        {/* Header */}
        <div className="border-b border-slate-200 dark:border-strokedark pb-8 mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-blue-600 font-bold text-sm uppercase tracking-wider bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
              Administration
            </span>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
              Add Travel Package
            </h1>
            <p className="text-slate-500 dark:text-bodydark mt-1">
              Create a comprehensive premium travel package using dynamic form fields.
            </p>
          </div>
          {submittedData && (
            <button
              onClick={() => setSubmittedData(null)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-meta-4 dark:text-white px-5 py-2.5 rounded-xl font-semibold transition-all text-sm flex items-center gap-2"
            >
              Create New Package
            </button>
          )}
        </div>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">

              {/* 1. Basic Info */}
              <div className="bg-slate-50 dark:bg-boxdark-2 p-6 lg:p-8 rounded-2xl border border-slate-200 dark:border-strokedark space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-200 dark:border-strokedark pb-4">
                  <FileText className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Package Basic Info</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-3">
                    <GenericInputField
                      name="packageName"
                      label="Package Name"
                      placeholder="e.g. Exotic Bali Discovery & Beach Resort"
                      required
                    />
                  </div>
                  <GenericInputField
                    name="nights"
                    label="Nights"
                    placeholder="e.g. 5 Nights"
                    required
                  />
                  <GenericInputField
                    name="days"
                    label="Days"
                    placeholder="e.g. 6 Days"
                    required
                  />
                  <GenericInputField
                    name="price"
                    label="Price"
                    placeholder="e.g. $1,250"
                    required
                  />
                  <GenericInputField
                    name="rating"
                    label="Rating"
                    placeholder="e.g. 4.9"
                  />
                  <GenericInputField
                    name="reviews"
                    label="Reviews Count"
                    placeholder="e.g. 128 reviews"
                  />
                </div>
              </div>

              {/* 2. Locations */}
              <div className="bg-slate-50 dark:bg-boxdark-2 p-6 lg:p-8 rounded-2xl border border-slate-200 dark:border-strokedark space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-strokedark pb-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Locations Covered</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => appendLocation({ value: '' })}
                    className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 bg-blue-100 dark:bg-blue-900/40 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                  >
                    <Plus className="w-4 h-4" /> Add Location
                  </button>
                </div>

                <div className="space-y-4">
                  {locationFields.map((field, index) => (
                    <div key={field.id} className="flex items-end gap-4">
                      <div className="flex-1">
                        <GenericInputField
                          name={`locations.${index}.value`}
                          label={`Location #${index + 1}`}
                          placeholder="e.g. Ubud, Bali"
                        />
                      </div>
                      {locationFields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeLocation(index)}
                          className="bg-red-100 text-red-600 p-3 rounded-lg hover:bg-red-200 transition-colors h-[46px]"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Photos */}
              <div className="bg-slate-50 dark:bg-boxdark-2 p-6 lg:p-8 rounded-2xl border border-slate-200 dark:border-strokedark space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-strokedark pb-4">
                  <div className="flex items-center gap-3">
                    <Camera className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Photos (Image URLs)</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => appendPhoto({ value: '' })}
                    className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 bg-blue-100 dark:bg-blue-900/40 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                  >
                    <Plus className="w-4 h-4" /> Add Photo URL
                  </button>
                </div>

                <div className="space-y-4">
                  {photoFields.map((field, index) => (
                    <div key={field.id} className="flex items-end gap-4">
                      <div className="flex-1">
                        <GenericInputField
                          name={`photos.${index}.value`}
                          label={`Image URL #${index + 1}`}
                          placeholder="https://images.unsplash.com/..."
                        />
                      </div>
                      {photoFields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="bg-red-100 text-red-600 p-3 rounded-lg hover:bg-red-200 transition-colors h-[46px]"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Itinerary */}
              <div className="bg-slate-50 dark:bg-boxdark-2 p-6 lg:p-8 rounded-2xl border border-slate-200 dark:border-strokedark space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-strokedark pb-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Itinerary</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => appendItinerary({ day: '', title: '', description: '' })}
                    className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md shadow-emerald-200"
                  >
                    <Plus className="w-4 h-4" /> Add Day
                  </button>
                </div>

                <div className="space-y-6">
                  {itineraryFields.map((item, index) => (
                    <div key={item.id} className="bg-white dark:bg-boxdark p-6 rounded-xl border border-slate-200 dark:border-strokedark shadow-sm space-y-4 relative">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-slate-800 dark:text-white bg-slate-100 dark:bg-meta-4 px-4 py-1.5 rounded-lg text-sm">
                          Day Plan #{index + 1}
                        </span>
                        {itineraryFields.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeItinerary(index)}
                            className="text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 p-2 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-1">
                          <GenericInputField
                            name={`itinerary.${index}.day`}
                            label="Day Identifier"
                            placeholder="e.g. Day 1"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <GenericInputField
                            name={`itinerary.${index}.title`}
                            label="Day Title"
                            placeholder="e.g. Arrival in Bali & Welcome Dinner"
                          />
                        </div>
                      </div>

                      <GenericTextArea
                        name={`itinerary.${index}.description`}
                        label="Day Description"
                        placeholder="Provide details about activities, sightseeing, and scheduling for this day..."
                        rows={3}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. Highlights */}
              <div className="bg-slate-50 dark:bg-boxdark-2 p-6 lg:p-8 rounded-2xl border border-slate-200 dark:border-strokedark space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-strokedark pb-4">
                  <div className="flex items-center gap-3">
                    <Star className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Key Highlights</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => appendHighlight({ value: '' })}
                    className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 bg-blue-100 dark:bg-blue-900/40 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                  >
                    <Plus className="w-4 h-4" /> Add Highlight
                  </button>
                </div>

                <div className="space-y-4">
                  {highlightFields.map((field, index) => (
                    <div key={field.id} className="flex items-end gap-4">
                      <div className="flex-1">
                        <GenericInputField
                          name={`highlights.${index}.value`}
                          label={`Highlight #${index + 1}`}
                          placeholder="e.g. Sunrise view from Mount Batur"
                        />
                      </div>
                      {highlightFields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeHighlight(index)}
                          className="bg-red-100 text-red-600 p-3 rounded-lg hover:bg-red-200 transition-colors h-[46px]"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 6. Hotels */}
              <div className="bg-slate-50 dark:bg-boxdark-2 p-6 lg:p-8 rounded-2xl border border-slate-200 dark:border-strokedark space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-strokedark pb-4">
                  <div className="flex items-center gap-3">
                    <BedDouble className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Hotels & Accommodation</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => appendHotel({ name: '', location: '', nights: '' })}
                    className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md shadow-emerald-200"
                  >
                    <Plus className="w-4 h-4" /> Add Hotel
                  </button>
                </div>

                <div className="space-y-6">
                  {hotelFields.map((hotel, index) => (
                    <div key={hotel.id} className="bg-white dark:bg-boxdark p-6 rounded-xl border border-slate-200 dark:border-strokedark shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4 relative">
                      <div className="md:col-span-3 flex justify-between items-center mb-1">
                        <span className="font-bold text-slate-800 dark:text-white bg-slate-100 dark:bg-meta-4 px-4 py-1 rounded-lg text-sm">
                          Hotel #{index + 1}
                        </span>
                        {hotelFields.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeHotel(index)}
                            className="text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 p-2 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>

                      <GenericInputField
                        name={`hotels.${index}.name`}
                        label="Hotel Name"
                        placeholder="e.g. Grand Hyatt Bali"
                      />
                      <GenericInputField
                        name={`hotels.${index}.location`}
                        label="Location"
                        placeholder="e.g. Nusa Dua"
                      />
                      <GenericInputField
                        name={`hotels.${index}.nights`}
                        label="Nights Stay"
                        placeholder="e.g. 3 Nights"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* 7. Additional Info Grid (Transfers, Sightseeing, Meals) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Transfers */}
                <div className="bg-slate-50 dark:bg-boxdark-2 p-6 rounded-2xl border border-slate-200 dark:border-strokedark space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-strokedark pb-3">
                    <div className="flex items-center gap-2">
                      <Navigation className="w-5 h-5 text-blue-600" />
                      <h3 className="font-bold text-slate-900 dark:text-white">Transfers</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => appendTransfer({ value: '' })}
                      className="text-blue-600 hover:text-blue-700 bg-blue-100 dark:bg-blue-900/40 p-1.5 rounded-lg text-sm"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  {transferFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                      <div className="flex-1">
                        <GenericInputField
                          name={`transfers.${index}.value`}
                          placeholder="e.g. Private AC Cab"
                        />
                      </div>
                      {transferFields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTransfer(index)}
                          className="text-red-600 p-1.5"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Sightseeing */}
                <div className="bg-slate-50 dark:bg-boxdark-2 p-6 rounded-2xl border border-slate-200 dark:border-strokedark space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-strokedark pb-3">
                    <div className="flex items-center gap-2">
                      <Compass className="w-5 h-5 text-blue-600" />
                      <h3 className="font-bold text-slate-900 dark:text-white">Sightseeing</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => appendSightseeing({ value: '' })}
                      className="text-blue-600 hover:text-blue-700 bg-blue-100 dark:bg-blue-900/40 p-1.5 rounded-lg text-sm"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  {sightseeingFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                      <div className="flex-1">
                        <GenericInputField
                          name={`sightseeing.${index}.value`}
                          placeholder="e.g. Tanah Lot Temple"
                        />
                      </div>
                      {sightseeingFields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSightseeing(index)}
                          className="text-red-600 p-1.5"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Meals */}
                <div className="bg-slate-50 dark:bg-boxdark-2 p-6 rounded-2xl border border-slate-200 dark:border-strokedark space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-strokedark pb-3">
                    <div className="flex items-center gap-2">
                      <Utensils className="w-5 h-5 text-blue-600" />
                      <h3 className="font-bold text-slate-900 dark:text-white">Meals</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => appendMeal({ value: '' })}
                      className="text-blue-600 hover:text-blue-700 bg-blue-100 dark:bg-blue-900/40 p-1.5 rounded-lg text-sm"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  {mealFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                      <div className="flex-1">
                        <GenericInputField
                          name={`meals.${index}.value`}
                          placeholder="e.g. Daily Breakfast & Dinner"
                        />
                      </div>
                      {mealFields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeMeal(index)}
                          className="text-red-600 p-1.5"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

              </div>

              {/* 8. Inclusions & Exclusions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Inclusions */}
                <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-900/40 space-y-4">
                  <div className="flex items-center justify-between border-b border-emerald-200 dark:border-emerald-900/40 pb-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <h3 className="font-bold text-emerald-900 dark:text-emerald-400">Inclusions</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => appendInclusion({ value: '' })}
                      className="text-emerald-600 hover:text-emerald-700 bg-emerald-100 dark:bg-emerald-900/40 p-1.5 rounded-lg text-sm"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  {inclusionFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                      <div className="flex-1">
                        <GenericInputField
                          name={`inclusions.${index}.value`}
                          placeholder="e.g. Airport Meet & Greet"
                        />
                      </div>
                      {inclusionFields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeInclusion(index)}
                          className="text-red-600 p-1.5"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Exclusions */}
                <div className="bg-red-50/50 dark:bg-red-950/20 p-6 rounded-2xl border border-red-200 dark:border-red-900/40 space-y-4">
                  <div className="flex items-center justify-between border-b border-red-200 dark:border-red-900/40 pb-3">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-red-600" />
                      <h3 className="font-bold text-red-900 dark:text-red-400">Exclusions</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => appendExclusion({ value: '' })}
                      className="text-red-600 hover:text-red-700 bg-red-100 dark:bg-red-900/40 p-1.5 rounded-lg text-sm"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  {exclusionFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                      <div className="flex-1">
                        <GenericInputField
                          name={`exclusions.${index}.value`}
                          placeholder="e.g. Flight tickets & Visa fees"
                        />
                      </div>
                      {exclusionFields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeExclusion(index)}
                          className="text-red-600 p-1.5"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-slate-200 dark:border-strokedark">
                <GenericButton
                  type="submit"
                  className="w-full !bg-blue-600 hover:!bg-blue-700 text-white font-bold py-4 rounded-2xl text-lg shadow-xl shadow-blue-200 dark:shadow-none transition-all active:scale-[0.99]"
                >
                  Save Package
                </GenericButton>
              </div>

            </form>
          </FormProvider>
     
      </motion.div>
    </div>
  );
}
