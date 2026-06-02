import {zodResolver} from '@hookform/resolvers/zod';
import React from 'react';
import {Form, FormProvider, useFieldArray, useForm} from 'react-hook-form';
import z from 'zod';
import GenericInputField from '../Forms/Input/GenericInputField';
import GenericDropdown from '../Forms/DropDown/GenericDropDown';
import GenericButton from '../Forms/Buttons/GenericButton';

const routeSchema = z.object({
  bus: z.string().min(1, 'Select bus'),

  stops: z
    .array(
      z.object({
        place: z.string().min(1, 'Place is required'),
        time: z.string().min(1, 'Time is required'),
      }),
    )
    .min(1),
});

type FormValues = z.infer<typeof routeSchema>;

export const BusRoute = () => {
  const [showInput, setShowInput] = React.useState(false);

  const methods = useForm<FormValues>({
    resolver: zodResolver(routeSchema),

    defaultValues: {
      bus: '',
      stops: [
        {
          place: '',
          time: '',
        },
      ],
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
  } = methods;

  const {fields, append, remove} = useFieldArray({
    control,
    name: 'stops',
  });

  const onSubmit = (data: FormValues) => {
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
              Create Bus Route
            </h1>

            {/* Bus Dropdown */}
            <div className="mb-6">
              <GenericDropdown
                name="bus"
                label="Select Bus"
                control={control}
                options={[
                  {value: 'Bus 101', label: 'Bus 101'},
                  {value: 'Bus 202', label: 'Bus 202'},
                  {value: 'Bus 303', label: 'Bus 303'},
                ]}
                required={true}
              />
            </div>

            {/* Dynamic Stops */}
            {/* Dynamic Stops */}
            <div className="space-y-3">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="border-gray-200 rounded-xl border p-3"
                >
                  <div className="flex items-end gap-2">
                    {/* Place */}
                    <div className="flex-1">
                      <GenericInputField
                        name={`stops.${index}.place`}
                        label="Place"
                        placeholder="Enter place"
                        required={true}
                        validation={{required: 'Place is required'}}
                      />
                    </div>

                    {/* Time */}
                    <div className="flex-1">
                      <GenericInputField
                        name={`stops.${index}.time`}
                        label="Time"
                        type="time"
                        required={true}
                        validation={{required: 'Time is required'}}
                      />
                    </div>

                    {/* Add Button */}
                    {index === fields.length - 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          append({
                            place: '',
                            time: '',
                          })
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500 text-xl font-bold text-white hover:bg-red-600"
                      >
                        +
                      </button>
                    )}

                    {/* Remove Button */}
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500 text-xl font-bold text-white hover:bg-red-600"
                      >
                        -
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Add Button */}
            {/* <GenericButton
              type="button"
              onClick={() =>
                append({
                  place: '',
                  time: '',
                })
              }
              className="mt-6 w-full hover:bg-red-600"
            >
              + Add Stop
            </GenericButton> */}

            {/* Submit */}
            <GenericButton
              type="submit"
              className="mt-6 w-full bg-red-500 py-3 text-lg font-semibold hover:bg-red-600"
            >
              Create Route
            </GenericButton>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
