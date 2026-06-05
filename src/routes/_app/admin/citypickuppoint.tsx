import CityPickUpPoint from '@/components/admin/CityPickUpPoint'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/admin/citypickuppoint')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CityPickUpPoint />
}
