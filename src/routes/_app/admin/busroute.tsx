import { BusRoute } from '@/components/admin/BusRoute'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/admin/busroute')({
  component: RouteComponent,
})

function RouteComponent() {
  return <BusRoute />
}
