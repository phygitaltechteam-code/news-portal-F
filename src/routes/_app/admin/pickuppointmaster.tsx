import { PickupPointMaster } from '@/components/admin/PickupPointMaster'
import { createFileRoute } from '@tanstack/react-router'
import { Pickaxe } from 'lucide-react'

export const Route = createFileRoute('/_app/admin/pickuppointmaster')({
  component: RouteComponent,
})

function RouteComponent() {
  return <PickupPointMaster />
}
