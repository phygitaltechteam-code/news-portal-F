import React from 'react';
import GenericTable from '../Forms/Table/GenericTable';
import {Column} from '../Forms/Table/GenericExpandTable';
import GenericButton from '../Forms/Buttons/GenericButton';

type CancelRequestProps = {
    sr?: number;
  route?: number;
  vehicleName: string;
  noPlate: string;
  from: string;
  to: string;
  ticketNo: number;
  payment: number;
  status: string;
};

const sampleData: CancelRequestProps[] = [
  {
    route: 1,
    vehicleName: 'Bus A',
    noPlate: 'XYZ123',
    from: 'Delhi',
    to: 'Mumbai',
    ticketNo: 1001,
    payment: 2500,
    status: 'Pending',
  },
  {
    route: 2,
    vehicleName: 'Bus B',
    noPlate: 'ABC456',
    from: 'Mumbai',
    to: 'Bangalore',
    ticketNo: 1002,
    payment: 2800,
    status: 'Pending',
  },
  {
    route: 3,
    vehicleName: 'Bus C',
    noPlate: 'DEF789',
    from: 'Bangalore',
    to: 'Hyderabad',
    ticketNo: 1003,
    payment: 2200,
    status: 'Pending',
  },
  {
    route: 4,
    vehicleName: 'Bus D',
    noPlate: 'GHI012',
    from: 'Hyderabad',
    to: 'Chennai',
    ticketNo: 1004,
    payment: 2600,
    status: 'Pending',
  },
  {
    route: 5,
    vehicleName: 'Bus E',
    noPlate: 'JKL345',
    from: 'Chennai',
    to: 'Kolkata',
    ticketNo: 1005,
    payment: 3000,
    status: 'Pending',
  },
];



const CancelRequest = () => {
  const handleCancel = (ticketNo: number) => {
    console.log('Cancel request for ticket:', ticketNo);
    alert(`Cancel request approved for Ticket No: ${ticketNo}`);
    // Add your cancel logic here
  };

  const handleApprove = (ticketNo: number) => {
    console.log('Approve cancellation for ticket:', ticketNo);
    alert(`Cancellation approved for Ticket No: ${ticketNo}`);
    // Add your approve logic here
  };


  const columns: Column<CancelRequestProps>[] = [
  {
    header: 'Sr',
    accessor: 'sr',
    render: (row: CancelRequestProps, index?: number) => (
      <span>{index !== undefined ? index + 1 : '-'}</span>
    ),
  },
  {
    header: 'Route',
    accessor: 'route',
  },
  {
    header: 'Vehicle Name',
    accessor: 'vehicleName',
  },
  {
    header: 'No. of Plate',
    accessor: 'noPlate',
  },
  {
    header: 'From',
    accessor: 'from',
  },
  {
    header: 'To',
    accessor: 'to',
  },
  {
    header: 'Ticket No',
    accessor: 'ticketNo',
  },
  {
    header: 'Payment',
    accessor: 'payment',
  },

  {
    header: 'Status',
    accessor: 'status',
    render: (row: CancelRequestProps) => (
      <div className="flex gap-2">
        <button
          onClick={() => handleCancel(row.ticketNo)}
          className="rounded bg-red-500 px-3 py-1 text-sm font-medium text-white hover:bg-red-600"
        >
          Cancel
        </button>
        <button
          onClick={() => handleApprove(row.ticketNo)}
          className="rounded bg-green-500 px-3 py-1 text-sm font-medium text-white hover:bg-green-600"
        >
          Approve
        </button>
      </div>
    ),
  },
];


  return (
    <div className="mt-20">
      <div className="p-5">
        <GenericTable
          title="Cancel Request"
          columns={columns}
          data={sampleData}
          itemsPerPage={15}
          searchAble
        />
      </div>
    </div>
  );
};

export default CancelRequest;
