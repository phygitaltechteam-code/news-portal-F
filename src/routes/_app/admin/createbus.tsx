import { CreateBus } from '@/components/admin/CreateBus'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/admin/createbus')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateBus />
}
