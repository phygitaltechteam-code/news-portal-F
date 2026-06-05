import {zodResolver} from '@hookform/resolvers/zod';
import React from 'react';
import {FormProvider, useFieldArray, useForm} from 'react-hook-form';
import z from 'zod';
import GenericInputField from '../Forms/Input/GenericInputField';
import GenericButton from '../Forms/Buttons/GenericButton';

const pickupPointSchema = z.object({
  city: z.string().min(1, 'City is required'),
  pickupPoints: z
    .array(
      z.object({
        pointName: z.string().min(1, 'Pickup point required'),
      }),
    )
    .min(1),
});

type FormValues = z.infer<typeof pickupPointSchema>;

export const PickupPointMaster = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(pickupPointSchema),
    defaultValues: {
      city: '',
      pickupPoints: [
        {
          pointName: '',
        },
      ],
    },
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = methods;

  const {fields, append, remove} = useFieldArray({
    control,
    name: 'pickupPoints',
  });

  const onSubmit = (data: FormValues) => {
    // call api to save route
    // navigate({to:'admin/$routeId/citypickuppoint'
    //   params: {
    //     routeId:'123'
    //   }

    // })
    console.log(data);
  };
  return (
    <div className="mt-20 min-h-screen bg-white px-2 py-10">
      <div className="mx-auto max-w-3xl">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-3xl bg-white p-2 shadow-xl"
          >
            <h1 className="mb-6 text-center text-3xl font-bold">
                City Pick-Up Points
            </h1>

            <div className="mb-6">
              <GenericInputField
                name="city"
                label="City Name"
                placeholder="Enter city name"
                required={true}
              />
            </div>

            <div className="space-y-3">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="border-gray-200 rounded-xl border p-3"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                    <div className="flex-1">
                      <GenericInputField
                        name={`pickupPoints.${index}.pointName`}
                        label="Pickup Point"
                        placeholder="Enter pickup point"
                        required={true}
                        validation={{required: 'Pickup point is required'}}
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500 text-xl font-bold text-white hover:bg-red-600"
                        >
                          -
                        </button>
                      )}
                      {index === fields.length - 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            append({
                              pointName: '',
                            })
                          }
                          className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500 text-xl font-bold text-white hover:bg-red-600"
                        >
                          +
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <GenericButton
              type="submit"
              className="mt-6 w-full bg-red-500 py-3 text-lg font-semibold hover:bg-red-600"
            >
              Save Pickup Points
            </GenericButton>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
