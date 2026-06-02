import CustomerHistory from '@/components/admin/CustomerHistory'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/admin/customerhistory')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CustomerHistory />
}
