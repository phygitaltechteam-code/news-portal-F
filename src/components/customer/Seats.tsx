import { PackageCheck } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { FaBus } from 'react-icons/fa';
import { PickupPoints } from './PickupPoints';

type Seat = {
  id: number;
  number: string;
  status: 'available' | 'booked';
  gender?: 'male' | 'female';
};


type Props = {
  selectedSeats: number[];
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

const seats: Seat[] = Array.from({ length: 36 }, (_, index) => {
  const bookedSeats = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];

  return {
    id: index + 1,
    number: `${Math.floor(index / 4) + 1}${String.fromCharCode(65 + (index % 4))}`,
    status: bookedSeats.includes(index + 1) ? 'booked' : 'available',
    gender: bookedSeats.includes(index + 1)
      ? index % 2 === 0
        ? 'male'
        : 'female'
      : undefined,
  };
});

const Seats = ({ bus }: Props) => {
  const [showSeats, setShowSeats] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [showPickupPoints, setShowPickupPoints] = useState(false);

  useEffect(()=>{
    console.log('Selected Seats in Seats Component:', {bus});
  },[bus])

  

  const toggleSeat = (seatId: number, status: string) => {
    if (status === 'available') {
      setSelectedSeats((prev) =>
        prev.includes(seatId)
          ? prev.filter((id) => id !== seatId)
          : [...prev, seatId],
      );
    }
  };

  return (
    
    <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-xl">
      {/* Bus Info */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between sm:gap-6">
        {/* Left */}
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-red-50">
            <FaBus className="text-2xl sm:text-3xl text-red-500" />
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800">{bus.name}</h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">{bus.type}</p>
          </div>
        </div>

        {/* Timing */}
        <div className="flex items-center justify-between gap-4 sm:justify-center sm:gap-8">
          <div className="text-center">
            <p className="text-xs sm:text-sm text-slate-400">Departure</p>
            <h3 className="text-lg sm:text-2xl font-bold text-slate-800">
              {bus.departure}
            </h3>
          </div>

          <div className="h-[2px] w-12 sm:w-24 bg-gradient-to-r from-red-400 to-orange-400"></div>

          <div className="text-center">
            <p className="text-xs sm:text-sm text-slate-400">Arrival</p>
            <h3 className="text-lg sm:text-2xl font-bold text-slate-800">{bus.arrival}</h3>
          </div>
        </div>

        {/* Price & Action */}
        <div className="mt-2 text-center lg:mt-0">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-red-500">{bus.price}</h2>
          <button
            onClick={() => {
              setShowSeats(!showSeats);
              setShowPickupPoints(!showSeats ? false : showPickupPoints);
            }}
            className="mt-3 sm:mt-4 w-full lg:w-auto rounded-xl sm:rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105"
          >
            {showSeats ? 'Hide Seats' : 'View Seats'}
          </button>
        </div>
      </div>

      {/* Seat Layout */}
      {showSeats &&   (
        <div className="mt-6 sm:mt-8 border-t border-slate-200 pt-6 sm:pt-8">
          {/* Legend */}
          <div className="mb-6 sm:mb-8 flex flex-wrap justify-center gap-3 sm:gap-6">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="h-5 w-5 sm:h-8 sm:w-8 rounded border-2 border-slate-300 bg-white"></div>
              <span className="text-[10px] sm:text-xs text-slate-600">Available</span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="h-5 w-5 sm:h-8 sm:w-8 rounded bg-slate-300"></div>
              <span className="text-[10px] sm:text-xs text-slate-600">Booked</span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="h-5 w-5 sm:h-8 sm:w-8 rounded bg-blue-500"></div>
              <span className="text-[10px] sm:text-xs text-slate-600">Male</span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="h-5 w-5 sm:h-8 sm:w-8 rounded bg-pink-500"></div>
              <span className="text-[10px] sm:text-xs text-slate-600">Female</span>
            </div>
          </div>

          {/* Bus Layout */}
          <div className="flex flex-col items-center gap-4 sm:gap-8 w-full">
            
            {/* Steering Wheel - Aligned to max-width boundary */}
            <div className="w-full max-w-[320px] sm:max-w-[400px] flex justify-end mb-2 px-2 sm:px-0">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border-4 border-slate-400 bg-slate-100">
                <div className="h-4 w-4 sm:h-6 sm:w-6 rounded-full border-2 border-slate-400"></div>
              </div>
            </div>

            {/* Grid Seats Layout - Expands nicely to fill width */}
            <div className="w-full max-w-[320px] sm:max-w-[400px] space-y-3 sm:space-y-4 px-2 sm:px-0">
              {Array.from({ length: 9 }).map((_, rowIndex) => {
                const rowSeats = seats.slice(rowIndex * 4, rowIndex * 4 + 4);

                return (
                  <div key={rowIndex} className="grid grid-cols-[1fr_1fr_0.6fr_1fr_1fr] gap-2 sm:gap-3 place-items-center w-full">
                    {[0, 1, 'aisle', 2, 3].map((item, idx) => {
                      if (item === 'aisle') return <div key={`aisle-${rowIndex}`} className="w-full" />;
                      
                      const seat = rowSeats[item as number];
                      if (!seat) return null;

                      const isSelected = selectedSeats.includes(seat.id);
                      const isBooked = seat.status === 'booked';

                      // Switched fixed h/w for w-full and aspect-square so it grows with the screen
                      let seatClass =
                        'w-full max-w-[3.5rem] aspect-square rounded-lg font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center cursor-pointer ';

                      if (isBooked) {
                        seatClass += seat.gender === 'male' ? 'bg-blue-500 text-white' : 'bg-pink-500 text-white';
                      } else if (isSelected) {
                        seatClass += 'border-2 border-red-500 bg-red-100 text-slate-800 shadow-md';
                      } else {
                        seatClass += 'border-2 border-slate-300 bg-white hover:border-red-400 hover:bg-red-50';
                      }

                      return (
                        <div key={seat.id} className="flex flex-col items-center justify-center w-full">
                          <button
                            onClick={() => toggleSeat(seat.id, seat.status)}
                            disabled={isBooked}
                            className={seatClass}
                            title={`Seat ${seat.number}`}
                          >
                            {seat.number}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* Selected Seats Info */}
            {selectedSeats.length > 0 && (
              <div className="mt-4 sm:mt-6 w-full max-w-[320px] sm:max-w-[400px] rounded-lg bg-blue-50 p-3 sm:p-4 text-center">
                <p className="text-xs sm:text-sm font-semibold text-slate-700">
                  Selected Seats:{' '}
                  <span className="text-blue-600">
                    {selectedSeats
                      .map((id) => seats.find((s) => s.id === id)?.number)
                      .join(', ')}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Checkout / Total Price */}
          <div className="mt-6 sm:mt-8 border-t border-slate-200 pt-4 text-center">
            <button
            onClick={() => {
              if (selectedSeats.length > 0) {
                setShowPickupPoints(!showPickupPoints);
                setShowSeats(!showSeats);
              }
            }}
            
            className="w-full sm:w-auto rounded-xl sm:rounded-lg bg-gradient-to-r from-red-500 to-orange-500 px-4 sm:px-6 py-3 sm:py-2 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105">
              {selectedSeats.length > 0 ? (
                <span className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-5 text-base sm:text-xl font-bold">
                  <span>{selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''}</span>
                  <span className="hidden sm:inline">|</span>
                  <span>
                    Total: ₹
                    {parseInt(bus.price.replace(/[^0-9]/g, '')) * selectedSeats.length}
                  </span>
                </span>
              ) : (
                <span className="text-sm sm:text-base">Click on available seats to select them</span>
              )}
            </button>
          </div>
        </div>
      )}

      {/* pickup points */}


      {
        showPickupPoints && (
         <PickupPoints
            value = {selectedSeats}
            bus = {bus}
         />
        )
      }
    </div>
  );
};

export default Seats;