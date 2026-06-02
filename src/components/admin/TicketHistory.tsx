import React from 'react';
import {useNavigate} from '@tanstack/react-router';
import GenericTable from '../Forms/Table/GenericTable';
import {Column} from '../Forms/Table/GenericGroupingTable';

type TicketHistoryProps = {
  sr?: number;
  route: string;
  vahicalName: string;
  numberPlate: string;
  totalBookings: number;
  totalTicketPrice: number;
  cashAmount: number;
  onlineAmount: number;
  time: string;
};

const TicketHistory = () => {
  const navigate = useNavigate();

  const sampleData: TicketHistoryProps[] = [
    {
      route: 'Delhi - Mumbai',
      vahicalName: 'Bus A',
      numberPlate: 'XYZ123',
      totalBookings: 45,
      totalTicketPrice: 22500,
      cashAmount: 10000,
      onlineAmount: 12500,
      time: '10:00 AM',
    },
    {
      route: 'Mumbai - Bangalore',
      vahicalName: 'Bus B',
      numberPlate: 'ABC456',
      totalBookings: 50,
      totalTicketPrice: 25000,
      cashAmount: 12000,
      onlineAmount: 13000,
        time: '2:00 PM',
    },
  ];

  const handleRowClick = (row: TicketHistoryProps) => {
    // Navigate to ticket details page with route data

    console.log('Row clicked:', row);
    navigate({
      to: `/admin/routehistory/${row.numberPlate}/routehistory`,

      state: {
        vehicleDetails : {
          route: row.route,
          vahicalName: row.vahicalName,
          numberPlate: row.numberPlate,
          totalBookings: row.totalBookings,
          totalTicketPrice: row.totalTicketPrice,
          cashAmount: row.cashAmount,
          onlineAmount: row.onlineAmount,
            time: row.time,
          
        },
      },
    });
  };

  const columns: Column<TicketHistoryProps>[] = [
    {
      header: 'Sr',
      accessor: 'sr',
      render: (row: TicketHistoryProps) => {
        const index = sampleData.indexOf(row);
        return <span>{index !== -1 ? index + 1 : '-'}</span>;
      },
      onCellClick: handleRowClick,
    },
    {header: 'Route', accessor: 'route', onCellClick: handleRowClick},
    {
      header: 'Vahical Name',
      accessor: 'vahicalName',
      onCellClick: handleRowClick,
    },
    {
      header: 'Number Plate',
      accessor: 'numberPlate',
      onCellClick: handleRowClick,
    },
    {
      header: 'Total Bookings',
      accessor: 'totalBookings',
      onCellClick: handleRowClick,
    },
    {
      header: 'Total Ticket Price',
      accessor: 'totalTicketPrice',
      onCellClick: handleRowClick,
    },
    {
      header: 'Cash Amount',
      accessor: 'cashAmount',
      onCellClick: handleRowClick,
    },
    {
      header: 'Online Amount',
      accessor: 'onlineAmount',
      onCellClick: handleRowClick,
    },
  ];

  return (
    <div className="mt-20">
      <div className="p-5">
        <GenericTable
          title="Ticket History"
          data={sampleData}
          columns={columns}
          itemsPerPage={15}
          searchAble
        />
      </div>
    </div>
  );
};

export default TicketHistory;
