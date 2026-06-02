import {useState} from 'react';
import {Controller, FormProvider, useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigate} from '@tanstack/react-router';
import GenericInputField from '../Forms/Input/GenericInputField';
import GenericButton from '../Forms/Buttons/GenericButton';
import GenericDropdown from '../Forms/DropDown/GenericDropDown';

const busCreate = z.object({
  name: z.string().min(1, 'bus name is required'),
  number: z.string().min(1, 'Bus number is required'),
  type: z.string().min(1, 'Bus type is required'),
  capacity: z.string().min(1, 'Bus capacity is required'),
});

type FormValues = z.infer<typeof busCreate>;

export const CreateBus = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(busCreate),

    defaultValues: {
      name: '',
      number: '',
      type: '',
      capacity: '',
    },
  });

  const {
    handleSubmit,
    watch,
    setValue,
    formState: {errors},
  } = methods;

  const onSubmit = (data: FormValues) => {
    console.log(data);
  }

 return (
  <div className="flex min-h-screen justify-center items-center bg-white mt-20 px-4 ">
    <div className="mx-auto w-full max-w-2xl">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-3xl bg-white p-6 shadow-6 sm:p-8 md:p-10"
        >
          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800">
              Create Bus
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Add new bus details to the system
            </p>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <GenericInputField
              name="name"
              label="Bus Name"
              placeholder="Enter bus name"
            />

            <GenericInputField
              name="number"
              label="Bus Number"
              placeholder="Enter bus number"
            />

            <GenericDropdown
                name="type"
                label="Bus Type"
                options={[
                  { label: 'Traveller', value: 'traveller' },
                  { label: 'Tampo', value: 'tampo' },
                ]}
                control={methods.control as any}
            
            />
            <GenericInputField
              name="capacity"
              label="Bus Capacity"
              placeholder="Enter bus capacity"
            />
          </div>

          {/* Button */}
          <div className="mt-8">
            <GenericButton
              type="submit"
              className="w-full rounded-xl bg-red-500 px-5 py-3 text-lg font-semibold text-white transition-all duration-300 hover:bg-red-600 hover:shadow-lg"
            >
              Create Bus
            </GenericButton>
          </div>
        </form>
      </FormProvider>
    </div>
  </div>
);
};
