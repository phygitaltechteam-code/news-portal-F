import PaymentPage from '@/pages/payment';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/payment')({
  component: PaymentPage,
});


