import {createFileRoute} from '@tanstack/react-router';
import NewsCategory from '@/components/category/NewsCategory';

export const Route = createFileRoute('/_app/admin/category/create')({
  component: RouteComponent,
});

function RouteComponent() {
  return <NewsCategory />;
}
