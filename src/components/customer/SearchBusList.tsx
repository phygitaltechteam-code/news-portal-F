import React, {useState} from 'react';
import {FaBus} from 'react-icons/fa';
import {useSearch , useNavigate} from '@tanstack/react-router';
import Seats from './Seats';

const busData = [
  {
    id: 1,
    name: 'VRL Travels',
    type: 'AC Sleeper',
    from: 'Pune',
    to: 'Mumbai',
    departure: '10:00 PM',
    arrival: '06:00 AM',
    price: '₹1200',
  },
  {
    id: 2,
    name: 'Orange Travels',
    type: 'Semi Sleeper',
    from: 'Pune',
    to: 'Mumbai',
    departure: '11:30 PM',
    arrival: '07:00 AM',
    price: '₹950',
  },
  {
    id: 3,
    name: 'SRS Travels',
    type: 'Volvo AC',
    from: 'Nagpur',
    to: 'Pune',
    departure: '08:00 PM',
    arrival: '07:00 AM',
    price: '₹1500',
  },
];

const SearchBusList = () => {
  const [selectedBusId, setSelectedBusId] = useState<number | null>(null);
  const search = useSearch({
    from: '/_app/searchbuslist',
  });

  const navigation = useNavigate();

  const from = (search as any)?.from ?? '';
  const to = (search as any)?.to ?? '';

  const filteredBuses = busData.filter(
    (bus) => bus.from === from && bus.to === to,
  );

  const selectedBus = filteredBuses.find((bus) => bus.id === selectedBusId);

  // If a bus is selected, show seats component
  if (selectedBus) {
    return (
      <div className="min-h-screen bg-slate-100 p-2 pt-30">
        <div className="mx-auto max-w-6xl">
          <button
            onClick={() => setSelectedBusId(null)}
            className="mb-6 rounded-xl bg-slate-700 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            ← Back to Buses
          </button>
          <Seats bus={selectedBus} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-2 pt-30">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
         <div className="mx-auto max-w-6xl">
          <button
            onClick={() => navigation({to: '/'})}
            className="mb-6 rounded-xl bg-slate-700 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            ← Back 
          </button>
          
        </div>
        <div className="mb-6 rounded-2xl bg-white p-5 shadow">
          <h1 className="text-2xl font-bold text-slate-800">Available Buses</h1>

          <p className="mt-2 text-slate-500">
            {from} → {to}
          </p>
        </div>

        {/* Bus Cards */}
        <div className="space-y-5">
          {filteredBuses.length > 0 ? (
            filteredBuses.map((bus) => (
              <div
                key={bus.id}
                className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-xl"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  {/* Left */}
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-red-100 p-4">
                      <FaBus className="text-2xl text-red-500" />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-slate-800">
                        {bus.name}
                      </h2>

                      <p className="text-slate-500">{bus.type}</p>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex items-center gap-10">
                    <div>
                      <p className="text-sm text-slate-500">Departure</p>

                      <h3 className="text-lg font-bold">{bus.departure}</h3>
                    </div>

                    <div className="h-[2px] w-20 bg-slate-300"></div>

                    <div>
                      <p className="text-sm text-slate-500">Arrival</p>

                      <h3 className="text-lg font-bold">{bus.arrival}</h3>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-500">
                      {bus.price}
                    </h2>

                    <button
                      onClick={() => setSelectedBusId(bus.id)}
                      className="mt-3 rounded-xl bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-600"
                    >
                      View Seats
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl bg-white p-10 text-center shadow">
              <h2 className="text-2xl font-bold text-slate-700">
                No buses available
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBusList;
