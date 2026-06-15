import { createFileRoute } from '@tanstack/react-router'
import NewsById from '@/pages/NewsById'

export const Route = createFileRoute('/news/$id')({
  component: NewsById,
})

