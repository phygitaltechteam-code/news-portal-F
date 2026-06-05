import RouteFareForm from '@/components/admin/Routefaire'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/admin/routefaire')({
  component: RouteComponent,
})

function RouteComponent() {
  return RouteFareForm()
}
