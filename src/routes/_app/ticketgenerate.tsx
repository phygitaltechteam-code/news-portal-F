import TicketGeneratePage from '@/pages/ticket-generate'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/ticketgenerate')({
  component: TicketGeneratePage,
});


