import AllNews from '@/components/admin/AllNews'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/admin/news/allnews')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AllNews/>
}
