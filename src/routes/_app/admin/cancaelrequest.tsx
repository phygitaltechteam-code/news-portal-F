import CancelRequest from '@/components/admin/CancelRequist'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/admin/cancaelrequest')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CancelRequest />
}
