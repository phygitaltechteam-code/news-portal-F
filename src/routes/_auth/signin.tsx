import { createFileRoute } from '@tanstack/react-router';
import SignIn from '@/pages/Signin';

export const Route = createFileRoute('/_auth/signin')({
  component: SignIn,
});


