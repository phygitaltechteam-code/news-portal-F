import RouteHistory from '@/components/admin/RouteHistory';
import { createFileRoute, useRouterState } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_app/admin/routehistory/$route/routehistory'
)({
  component: RouteComponent,
});

function RouteComponent() {
  // Route param
  const { route } = Route.useParams();

  // Router state
  const location = useRouterState({
    select: (state) => state.location,
  });

  const routerState = location.state as {
    vehicleName?: string;
    numberPlate?: string;
    time?: string;
    route?:string;

  };

  console.log("route state",routerState);

  return (
    <RouteHistory
     routerState={routerState}
    />
  );
}