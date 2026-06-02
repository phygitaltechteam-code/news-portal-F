import React from 'react';
import GenericTable from '../Forms/Table/GenericTable';
import {Column} from '../Forms/Table/GenericExpandTable';

type CustomerHistoryProps = {
  sr?: number;
  customerName: string;
  phoneNumber: string;
  gender: string;
  totalTravels: number;
  totalBusinessAmount: number;
  walletBalance: number;
  totalReferrals: number;
  status: string;
};

const sampleData: CustomerHistoryProps[] = [
  {
    customerName: 'John Doe',
    phoneNumber: '9876543210',
    gender: 'Male',
    totalTravels: 15,
    totalBusinessAmount: 45000,
    walletBalance: 5000,
    totalReferrals: 3,
    status: 'Active',
  },
  {
    customerName: 'Jane Smith',
    phoneNumber: '9876543211',
    gender: 'Female',
    totalTravels: 22,
    totalBusinessAmount: 67500,
    walletBalance: 8500,
    totalReferrals: 5,
    status: 'Active',
  },
  {
    customerName: 'Robert Johnson',
    phoneNumber: '9876543212',
    gender: 'Male',
    totalTravels: 8,
    totalBusinessAmount: 24000,
    walletBalance: 2000,
    totalReferrals: 1,
    status: 'Inactive',
  },
  {
    customerName: 'Emma Wilson',
    phoneNumber: '9876543213',
    gender: 'Female',
    totalTravels: 30,
    totalBusinessAmount: 90000,
    walletBalance: 12000,
    totalReferrals: 8,
    status: 'Active',
  },
  {
    customerName: 'Michael Brown',
    phoneNumber: '9876543214',
    gender: 'Male',
    totalTravels: 12,
    totalBusinessAmount: 36000,
    walletBalance: 4500,
    totalReferrals: 2,
    status: 'Active',
  },
  {
    customerName: 'Sarah Davis',
    phoneNumber: '9876543215',
    gender: 'Female',
    totalTravels: 18,
    totalBusinessAmount: 54000,
    walletBalance: 6500,
    totalReferrals: 4,
    status: 'Active',
  },
];

const columns: Column<CustomerHistoryProps>[] = [
  {
    header: 'Sr',
    accessor: 'sr',
    render: (row: CustomerHistoryProps, index?: number) => (
      <span>{index !== undefined ? index + 1 : '-'}</span>
    ),
  },
  {
    header: 'Customer Name',
    accessor: 'customerName',
  },
  {
    header: 'Phone Number',
    accessor: 'phoneNumber',
  },
  {
    header: 'Gender',
    accessor: 'gender',
  },
  {
    header: 'Total Travels',
    accessor: 'totalTravels',
  },
  {
    header: 'Total Business Amount',
    accessor: 'totalBusinessAmount',
  },
  {
    header: 'Wallet Balance',
    accessor: 'walletBalance',
  },
  {
    header: 'Total Referrals',
    accessor: 'totalReferrals',
  },
  {
    header: 'Status',
    accessor: 'status',
    render: (row: CustomerHistoryProps) => (
      <span
        className={`rounded px-3 py-1 text-sm font-medium ${
          row.status === 'Active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {row.status}
      </span>
    ),
  },
];

const CustomerHistory = () => {
  return (
    <div className="mt-20">
      <div className="p-5">
        <GenericTable
          title="Customer List"
          columns={columns}
          data={sampleData}
          itemsPerPage={15}
          searchAble
        />
      </div>
    </div>
  );
};

export default CustomerHistory;
