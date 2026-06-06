import { createFileRoute } from '@tanstack/react-router'
import CreateNews from '@/components/admin/CreateNews'

export const Route = createFileRoute('/_app/admin/news/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateNews />
}
