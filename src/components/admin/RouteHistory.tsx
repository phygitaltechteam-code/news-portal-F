import React from 'react';
import GenericTable from '../Forms/Table/GenericTable';
import {Column} from '../Forms/Table/GenericGroupingTable';
import {useNavigate} from '@tanstack/react-router';

type BookingProps = {
  sr?: number;
  seatNo: string;
  bookingName: string;
  mobileNumber: string;
  gender: string;
  paymentMode: string;
  bookingDateTime: string;
  status: string;
 
  
};

interface RouteHistoryProps {
  route: string;
  time: string;
  busName: string;
  busNumber: string;
  bookings: BookingProps[];
 
}

const RouteHistory: React.FC<RouteHistoryProps> = (props) => {
    const {
    route,
    vahicalName,
    numberPlate,
    time,
    totalBookings,
    totalTicketPrice,
    cashAmount,
    onlineAmount
} = props.routerState.vehicleDetails || {};

  const navigate = useNavigate();

  const handleRowClick = (row: BookingProps) => {
    console.log('Booking details:', row);

    // Add navigation or modal logic here if needed
  };

  const columns: Column<BookingProps>[] = [
    {
      header: 'Sr',
      accessor: 'sr',
      render: (row: BookingProps, index?: number) => (
        <span>{index !== undefined ? index + 1 : '-'}</span>
      ),
      onCellClick: handleRowClick,
    },
    {
      header: 'Seat No',
      accessor: 'seatNo',
      onCellClick: handleRowClick,
    },
    {
      header: 'Booking Name',
      accessor: 'bookingName',
      onCellClick: handleRowClick,
    },
    {
      header: 'Mobile Number',
      accessor: 'mobileNumber',
      onCellClick: handleRowClick,
    },
    {
      header: 'Gender',
      accessor: 'gender',
      onCellClick: handleRowClick,
    },
    {
      header: 'Payment Mode',
      accessor: 'paymentMode',
      onCellClick: handleRowClick,
    },
    {
      header: 'Booking Date & Time',
      accessor: 'bookingDateTime',
      onCellClick: handleRowClick,
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row: BookingProps) => (
        <span
          className={`rounded px-3 py-1 text-sm font-medium ${
            row.status === 'Confirmed'
              ? 'bg-green-100 text-green-800'
              : row.status === 'Pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
          }`}
        >
          {row.status}
        </span>
      ),
      onCellClick: handleRowClick,
    },
  ];

  const sampleBookings: BookingProps[] = [
    {
      seatNo: 'A1',
      bookingName: 'John Doe',
      mobileNumber: '9876543210',
      gender: 'Male',
      paymentMode: 'Online',
      bookingDateTime: '2024-06-02 10:30 AM',
      status: 'Confirmed',
    },
    {
      seatNo: 'A2',
      bookingName: 'Jane Smith',
      mobileNumber: '9876543211',
      gender: 'Female',
      paymentMode: 'Cash',
      bookingDateTime: '2024-06-02 11:00 AM',
      status: 'Confirmed',
    },
    {
      seatNo: 'B1',
      bookingName: 'Robert Johnson',
      mobileNumber: '9876543212',
      gender: 'Male',
      paymentMode: 'Online',
      bookingDateTime: '2024-06-02 09:45 AM',
      status: 'Pending',
    },
    {
      seatNo: 'B2',
      bookingName: 'Emma Wilson',
      mobileNumber: '9876543213',
      gender: 'Female',
      paymentMode: 'Card',
      bookingDateTime: '2024-06-02 12:15 PM',
      status: 'Confirmed',
    },
    {
      seatNo: 'C1',
      bookingName: 'Michael Brown',
      mobileNumber: '9876543214',
      gender: 'Male',
      paymentMode: 'Online',
      bookingDateTime: '2024-06-02 01:30 PM',
      status: 'Cancelled',
    },
  ];

  return (
<div className="bg-gray-100  px-4 py-6 mt-20">
  <div className="mx-auto "> {/* Reduced from max-w-7xl to keep data visually connected */}
    
    {/* Back Button */}
    <button
      onClick={() => navigate({ to: '/admin/tickethistory' })}
      className="mb-4 flex items-center gap-2 text-red-500 underline hover:text-red-700 text-sm font-medium"
    >
      ← Back to Ticket History
    </button>

    <div className="rounded-2xl bg-white p-5 shadow-lg"> {/* Reduced padding and corner radius */}
      
      {/* Route and Time Section */}
      <div className="border-gray-200 border-b pb-4 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">
              Route
            </p>
            <h2 className="text-gray-900 mt-0.5 text-2xl font-bold">
              {route || 'N/A'}
            </h2>
          </div>
          <div className="sm:text-right">
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">
              Departure Time
            </p>
            <h2 className="mt-0.5 text-2xl font-bold text-blue-600">
              {time || 'N/A'}
            </h2>
          </div>
        </div>
      </div>

      {/* Bus Details Section */}
      <div className="bg-gray-50 rounded-xl p-4 mb-5">
        <div className="grid grid-cols-2 gap-4 max-w-xl"> {/* Tied these two fields tightly together */}
          <div>
            <label className="text-gray-500 block text-xs font-medium uppercase">
              Bus Name
            </label>
            <p className="text-gray-900 text-base font-semibold mt-0.5">
              {vahicalName || 'N/A'}
            </p>
          </div>
          <div>
            <label className="text-gray-500 block text-xs font-medium uppercase">
              Bus Number
            </label>
            <p className="text-gray-900 text-base font-semibold mt-0.5">
              {numberPlate || 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="mt-4">
        <GenericTable
          title="Passenger Bookings"
          data={props.bookings && props.bookings.length > 0 ? props.bookings : sampleBookings}
          columns={columns}
          itemsPerPage={15}
          searchAble
        />
      </div>

    </div>
  </div>
</div>
  );
};

export default RouteHistory;
