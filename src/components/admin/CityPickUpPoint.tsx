import React from 'react';

import {PickupPoint, RouteCity, RouteFormData} from '@/types/admin';
import z from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {FormProvider} from 'react-hook-form';
import CityPickupCard from './PickupCard';
import GenericButton from '../Forms/Buttons/GenericButton';
import {useParams} from '@tanstack/react-router';

const routeData = {
  cities: [
    {
      cityId: 1,
      cityName: 'Nagpur',
    },
    {
      cityId: 2,
      cityName: 'Wardha',
    },
    {
      cityId: 3,
      cityName: 'Amravati',
    },
  ],
};

const CityPickUpPoint = () => {
  // const { routeId } = useParams();
  // fetch city(route) data using id

  const pickupPointSchema = z.object({
    pickupPoints: z.array(
      z.object({
        cityId: z.number(),
        cityName: z.string(),

        points: z.array(
          z.object({
            pointName: z.string().min(1, 'Pickup point required'),
            time: z.string().min(1, 'Time required'),
          }),
        ),
      }),
    ),
  });

  const methods = useForm<PickupPointFormValues>({
    resolver: zodResolver(pickupPointSchema),

    defaultValues: {
      pickupPoints: routeData.cities.map((city) => ({
        cityId: city.cityId,
        cityName: city.cityName,

        points: [
          {
            pointName: '',
            time: '',
          },
        ],
      })),
    },
  });
  const {handleSubmit} = methods;
  type PickupPointFormValues = z.infer<typeof pickupPointSchema>;

  const onSubmit = (data: PickupPointFormValues) => {
    console.log(data);
  };
  // Parent Component
  return (
    <div className="mt-20 min-h-screen bg-white px-2 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl bg-white p-4 shadow-xl sm:p-6">
          <h1 className="mb-6 text-center text-3xl font-bold">
                Create Bus Route - City Pick-Up Points 
          </h1>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {routeData.cities.map((city, index) => (
                <CityPickupCard
                  key={city.cityId}
                  cityIndex={index}
                  cityName={city.cityName}
                />
              ))}

              <GenericButton
                type="submit"
                className="mt-6 w-full bg-red-500 py-3 text-lg font-semibold hover:bg-red-600"
              >
                Save All Pickup Points
              </GenericButton>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default CityPickUpPoint;
