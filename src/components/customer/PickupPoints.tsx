import React from 'react';
import {useForm} from 'react-hook-form';
import GenericDropdown from '../Forms/DropDown/GenericDropDown';

const pickupPointsData = [
  {id: 1, name: 'Pune Station', location: 'Pune'},
  {id: 2, name: 'Mumbai Airport', location: 'Mumbai'},
  {id: 3, name: 'Nagpur Bus Stand', location: 'Nagpur'},
  {id: 4, name: 'Sangli City Center', location: 'Sangli'},
  {id: 5, name: 'Kolhapur Main Square', location: 'Kolhapur'},
];
type props = {
  value: number[];
  bus: {
    id: number;
    name: string;
    type: string;
    from: string;
    to: string;
    departure: string;
    arrival: string;
    price: string;
  };
};

export const PickupPoints = ({value, bus}: props) => {
  console.log('Selected Seats in PickupPoints:', value);
  console.log('Bus Details in PickupPoints:', bus);

  const {control, handleSubmit, watch} = useForm({
    defaultValues: {
      pickupPoint: '',
      dropPoint: '',
    },
  });

  const pickupPointValue = watch('pickupPoint');
  const dropPointValue = watch('dropPoint');

  const getLocationName = (id: string) => {
    const location = pickupPointsData.find(
      (point) => point.id.toString() === id,
    );
    return location ? location.name : 'Not Selected';
  };

  const onSubmit = (data: any) => {
    const pickupName = getLocationName(pickupPointValue);
    const dropName = getLocationName(dropPointValue);
    const price = parseInt(bus.price.replace(/[^0-9]/g, '')) * value.length;
    const busName = bus.name;
    const busType = bus.type;
    const from = bus.from;
    const to = bus.to;
    const departure = bus.departure;
    const arrival = bus.arrival;

    
    console.log('Selected Values:', {
      pickupPoint: pickupName,
      dropPoint: dropName,
    });

    
    alert(`Pickup Point: ${pickupName}\nDrop Point: ${dropName}\nPrice: ${price}\nBus: ${busName} (${busType})\nRoute: ${from} → ${to}\nDeparture: ${departure}\nArrival: ${arrival} \nSeats Booked: ${value}`);
  };

  return (
    <div className="mt-6 border-t border-slate-200 pt-6 sm:mt-8 sm:pt-8">
      <h2 className="mb-4 text-xl font-bold text-slate-800">Pickup Points</h2>
      <h2 className="pb-2 text-title-md font-bold text-black">
        Seat No. : {value.join(', ')}
      </h2>
      <GenericDropdown
        name="pickupPoint"
        label="Select Pickup Point"
        control={control as any}
        options={pickupPointsData.map((point) => ({
          value: point.id.toString(),
          label: point.name,
        }))}
      />
      <GenericDropdown
        name="dropPoint"
        label="Select Drop Point"
        control={control as any}
        options={pickupPointsData.map((point) => ({
          value: point.id.toString(),
          label: point.name,
        }))}
      />
      <h2 className="pt-4 text-title-md font-bold text-red-500">
        Price : {parseInt(bus.price.replace(/[^0-9]/g, '')) * value.length}
      </h2>
      <button
        onClick={handleSubmit(onSubmit)}
        className="mt-6 rounded-md bg-red-600 px-6 py-2 font-semibold text-white transition hover:bg-red-700"
      >
        Book Now
      </button>
    </div>
  );
};
