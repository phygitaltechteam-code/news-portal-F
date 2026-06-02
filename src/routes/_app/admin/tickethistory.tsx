import TicketHistory from '@/components/admin/TicketHistory'
import { createFileRoute } from '@tanstack/react-router'
import { Ticket } from 'lucide-react'

export const Route = createFileRoute('/_app/admin/tickethistory')({
  component: RouteComponent,
})

function RouteComponent() {
  return <TicketHistory />
}
