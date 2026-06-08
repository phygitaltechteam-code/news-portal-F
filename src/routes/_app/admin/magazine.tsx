import Magazine from '@/components/admin/Magazine'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/admin/magazine')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Magazine/>
}
