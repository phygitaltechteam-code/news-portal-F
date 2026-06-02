import SearchBusList from '@/components/customer/SearchBusList';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/searchbuslist')({
  validateSearch: (search: Record<string, any>) => ({
    from: search.from ?? '',
    to: search.to ?? '',
    gender: search.gender ?? '',
    date: search.date ?? '',
  }),
  component: SearchBusList,
});
