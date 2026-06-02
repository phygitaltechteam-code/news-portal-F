import {createFileRoute} from '@tanstack/react-router';
import {useState} from 'react';
import {Download, Printer, Share2, CheckCircle} from 'lucide-react';

function TicketGeneratePage() {
  const [showDownload, setShowDownload] = useState(false);

  const ticketData = {
    ticketId: 'TKT-2026053001',
    bookingDate: '30 May 2026',
    busName: 'Shree Travels AC',
    busType: 'Sleeper',
    busNumber: 'MH-01-AB-1234',
    from: 'Pune',
    to: 'Mumbai',
    date: '02 June 2026',
    departure: '10:00 PM',
    arrival: '06:00 AM',
    seats: ['1A', '2B', '3A'],
    passengers: [
      {
        name: 'John Doe',
        age: 32,
        seatNumber: '1A',
        phone: '+91 9876543210',
      },
      {
        name: 'Jane Smith',
        age: 28,
        seatNumber: '2B',
        phone: '+91 9876543211',
      },
      {
        name: 'Mike Johnson',
        age: 45,
        seatNumber: '3A',
        phone: '+91 9876543212',
      },
    ],
    totalPrice: '₹2,850',
    paymentStatus: 'Paid',
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    setShowDownload(true);
    setTimeout(() => {
      alert('Ticket downloaded successfully!');
      setShowDownload(false);
    }, 1000);
  };

  const handleShare = () => {
    alert('Share option coming soon!');
  };

  return (
    <div className="pt-25 min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Success Banner */}
        {/* <div className="mb-8 rounded-2xl border border-green-200 bg-green-50 p-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <p className="font-semibold text-green-800">
                Payment Successful!
              </p>
              <p className="text-sm text-green-700">
                Your ticket has been generated. Check your email for details.
              </p>
            </div>
          </div>
        </div> */}

        {/* Ticket */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-500 to-orange-500 px-6 py-8 sm:px-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white">Bus Ticket</h1>
              <p className="text-red-100 mt-1">Booking ID: {ticketData.ticketId}</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {/* Route Info */}
            <div className="mb-8 rounded-xl bg-slate-50 p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase">
                    From
                  </p>
                  <p className="text-2xl font-bold text-slate-800 mt-2">
                    {ticketData.from}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p className="text-xs text-slate-600 mb-2">
                    {ticketData.date}
                  </p>
                  <div className="h-[2px] w-8 bg-gradient-to-r from-red-400 to-orange-400"></div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase">
                    To
                  </p>
                  <p className="text-2xl font-bold text-slate-800 mt-2">
                    {ticketData.to}
                  </p>
                </div>
              </div>
            </div>

            {/* Bus Details */}
            <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <p className="text-xs text-slate-600 font-semibold">Bus Name</p>
                <p className="text-sm font-semibold text-slate-800 mt-1">
                  {ticketData.busName}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-600 font-semibold">Bus Type</p>
                <p className="text-sm font-semibold text-slate-800 mt-1">
                  {ticketData.busType}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-600 font-semibold">
                  Bus Number
                </p>
                <p className="text-sm font-semibold text-slate-800 mt-1">
                  {ticketData.busNumber}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-600 font-semibold">
                  Seats Booked
                </p>
                <p className="text-sm font-semibold text-slate-800 mt-1">
                  {ticketData.seats.join(', ')}
                </p>
              </div>
            </div>

            {/* Timing */}
            <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-blue-50 p-4">
                <p className="text-xs text-blue-600 font-semibold">Departure</p>
                <p className="text-lg font-bold text-blue-800 mt-1">
                  {ticketData.departure}
                </p>
              </div>
              <div className="rounded-lg bg-purple-50 p-4">
                <p className="text-xs text-purple-600 font-semibold">Arrival</p>
                <p className="text-lg font-bold text-purple-800 mt-1">
                  {ticketData.arrival}
                </p>
              </div>
              <div className="rounded-lg bg-green-50 p-4">
                <p className="text-xs text-green-600 font-semibold">Payment</p>
                <p className="text-lg font-bold text-green-800 mt-1">
                  {ticketData.paymentStatus}
                </p>
              </div>
            </div>

            {/* Passengers */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-slate-800 mb-4">
                Passenger Details
              </h3>
              <div className="space-y-3">
                {ticketData.passengers.map((passenger, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-slate-200 p-4 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold text-slate-800">
                        {passenger.name}
                      </p>
                      <p className="text-sm text-slate-600">
                        Age: {passenger.age} | Seat: {passenger.seatNumber}
                      </p>
                    </div>
                    <p className="text-sm text-slate-600">{passenger.phone}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Price */}
            <div className="mb-8 rounded-lg border-2 border-red-500 bg-red-50 p-4">
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-slate-800">
                  Total Amount:
                </p>
                <p className="text-3xl font-bold text-red-500">
                  {ticketData.totalPrice}
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mb-8 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
              <p>
                <span className="font-semibold">Booking Date:</span>{' '}
                {ticketData.bookingDate}
              </p>
              <p className="mt-2">
                Please carry a valid ID and reach the bus stand 15 minutes
                before departure.
              </p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 sm:px-8 grid grid-cols-3 gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              <Printer className="h-4 w-4" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={handleDownload}
              disabled={showDownload}
              className="flex items-center justify-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-600 disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">
                {showDownload ? 'Downloading...' : 'Download'}
              </span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 rounded-lg bg-purple-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-600"
            >
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-block rounded-lg bg-gradient-to-r from-red-500 to-orange-500 px-8 py-3 font-semibold text-white transition hover:scale-105"
          >
            Book Another Ticket
          </a>
        </div>
      </div>
    </div>
  );
}

export default TicketGeneratePage;