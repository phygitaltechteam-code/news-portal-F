import { createFileRoute } from '@tanstack/react-router';
import WebsiteLayout from '@/layouts/WebsiteLayout';

export const Route = createFileRoute('/_website')({
    component: WebsiteLayout,
});
