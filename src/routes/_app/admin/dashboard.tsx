import Dashboard from '@/components/admin/Dashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/admin/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Dashboard/>
}
