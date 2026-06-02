import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';

import { FaBus, FaExchangeAlt } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';

import GenericDropdown from '../Forms/DropDown/GenericDropDown';
import GenericInputField from '../Forms/Input/GenericInputField';

const busSearchSchema = z.object({
  from: z.string().min(1, 'From city is required'),
  to: z.string().min(1, 'Destination city is required'),
  gender: z.string().min(1, 'Gender is required'),
  journeyDate: z.string().min(1, 'Journey date is required'),
 control: z.string().optional(),
});

type FormValues = z.infer<typeof busSearchSchema>;

const cityOptions = [
  { label: 'Pune', value: 'Pune' },
  { label: 'Mumbai', value: 'Mumbai' },
  { label: 'Nagpur', value: 'Nagpur' },
  { label: 'Sangli', value: 'Sangli' },
  { label: 'Kolhapur', value: 'Kolhapur' },
];

const genderOptions = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
];

const BusSearch = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(busSearchSchema),

    defaultValues: {
      from: '',
      to: '',
      gender: '',
      journeyDate: '',
    },
  });

  const navigate = useNavigate();

 const {
  handleSubmit,
  watch,
  setValue,
  formState: { errors },
} = methods;

const fromValue = watch('from');
const toValue = watch('to');

const handleSwap = () => {
  setValue('from', toValue);
  setValue('to', fromValue);
};
const onSubmit = (data: FormValues) => {
  navigate({
    to: '/searchbuslist',
    search: {
      from: data.from,
      to: data.to,
      gender: data.gender,
      date: data.journeyDate,
    },
  });
};

  return (
    <FormProvider {...methods}>
      <div className="bg-slate-50 py-10 px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto max-w-7xl rounded-3xl bg-white p-5 shadow-2xl"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

            {/* From */}
            <div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition-all duration-200 hover:border-red-400 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-100">
              <FaBus className="text-xl text-slate-500" />

              <div className="w-full">
                <GenericDropdown
                  control={methods.control as any}
                  name="from"
                  label="From"
                  options={cityOptions}
                />

                {errors.from && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.from.message}
                  </p>
                )}
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <button
              onClick={handleSwap}
                type="button"
                className="rounded-full border border-slate-200 bg-white p-4 shadow-md transition-all duration-200 hover:scale-105 hover:bg-red-50"
              >
                <FaExchangeAlt className="text-slate-600" />
              </button>
            </div>

            {/* To */}
            <div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition-all duration-200 hover:border-red-400 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-100">
              <FaBus className="text-xl text-slate-500" />

              <div className="w-full">
                <GenericDropdown
                  control={methods.control as any}
                  name="to"
                  label="To"
                  options={cityOptions}
                />

                {errors.to && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.to.message}
                  </p>
                )}
              </div>
            </div>

            {/* Journey Date */}
            <div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition-all duration-200 hover:border-red-400 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-100">
              <MdDateRange className="text-2xl text-slate-500" />

              <div className="w-full">
                <GenericInputField
                  name="journeyDate"
                  label="Journey Date"
                  type="date"
                />

                {errors.journeyDate && (
                  <p className="mt-1 text-sm text-red-500">
                  </p>
                )}
              </div>
            </div>

            {/* Gender */}
            <div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition-all duration-200 hover:border-red-400 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-100">
              <div className="w-full">
                <GenericDropdown
                  control={methods.control as any}
                  name="gender"
                  label="Gender"
                  options={genderOptions}
                />

                {errors.gender && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.gender.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="rounded-full bg-red-500 px-16 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-red-600"
            >
              Search Buses
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default BusSearch;