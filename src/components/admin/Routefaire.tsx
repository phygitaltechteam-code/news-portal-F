import z from 'zod';

import React from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import GenericButton from '../Forms/Buttons/GenericButton';
import GenericInputField from '../Forms/Input/GenericInputField';

const routeCities = [
  {id: 1, name: 'Sangli'},
  {id: 2, name: 'Miraj'},
  {id: 3, name: 'Karad'},
  {id: 4, name: 'Satara'},
  {id: 5, name: 'Pune'},
];

const generateFarePairs = (cities: {id: number; name: string}[]) => {
  const pairs: Array<{
    fromCityId: number;
    fromCityName: string;
    toCityId: number;
    toCityName: string;
    price: number;
  }> = [];

  for (let i = 0; i < cities.length; i++) {
    for (let j = i + 1; j < cities.length; j++) {
      pairs.push({
        fromCityId: cities[i].id,
        fromCityName: cities[i].name,

        toCityId: cities[j].id,
        toCityName: cities[j].name,

        price: 0,
      });
    }
  }

  return pairs;
};

const fareSchema = z.object({
  fares: z.array(
    z.object({
      fromCityId: z.number(),
      fromCityName: z.string(),

      toCityId: z.number(),
      toCityName: z.string(),

      price: z.coerce.number().min(1, 'Price required'),
    }),
  ),
});

type FareFormValues = z.infer<typeof fareSchema>;

export default function RouteFareForm() {
  const methods = useForm<FareFormValues>({
    resolver: zodResolver(fareSchema),

    defaultValues: {
      fares: generateFarePairs(routeCities),
    },
  });

  const {handleSubmit, watch} = methods;

  const onSubmit = (data: FareFormValues) => {
    console.log(data);

    /*
      API Payload

      [
        {
          fromCityId:1,
          toCityId:2,
          price:50
        }
      ]
    */
  };

  return (
    <div className="mt-20 min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl shadow-slate-200/60"
          >
            <div className="px-6 py-5 text-center sm:px-10">
              <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                Route Fare 
              </h1>
            </div>

            <div className="space-y-6 p-2 shadow-3 sm:p-8">
              <div className="grid gap-4 rounded-[24px] border border-slate-200 bg-slate-50 p-5 sm:grid-cols-2 sm:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Total fare pairs
                  </p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {watch('fares').length}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {watch('fares').map((fare, index) => (
                  <div
                    key={`${fare.fromCityId}-${fare.toCityId}`}
                    className="overflow-hidden rounded-[24px] border border-slate-200 bg-white p-2 shadow-3 sm:p-5"
                  >
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-[1.2fr_1.2fr_1fr]">
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                          From
                        </p>
                        <p className="mt-2 text-base font-semibold text-slate-900">
                          {fare.fromCityName}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                          To
                        </p>
                        <p className="mt-2 text-base font-semibold text-slate-900">
                          {fare.toCityName}
                        </p>
                      </div>

                      <div className="col-span-2 rounded-2xl bg-slate-50 p-4 sm:col-span-1">
                        <GenericInputField
                          name={`fares.${index}.price`}
                          label="Fare Price"
                          placeholder="Enter fare"
                          type="number"
                          required={true}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <GenericButton
                type="submit"
                className="mt-4 w-full bg-gradient-to-r from-red-500 to-orange-500 py-3 text-lg font-semibold text-white shadow-lg shadow-red-200/50 hover:opacity-95"
              >
                Save Route Fares
              </GenericButton>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
