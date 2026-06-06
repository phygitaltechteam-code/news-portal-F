import NewsCategory from '@/components/category/NewsCategory';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/admin/category/create')({
  component: RouteComponent,
});

function RouteComponent() {
  return <NewsCategory />;
}
