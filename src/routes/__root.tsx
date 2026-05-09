import * as React from 'react';
import {Outlet, createRootRoute} from '@tanstack/react-router';
import RootLayout from './../layouts/RootLayout';

export const Route = createRootRoute({
  component: RootLayout,
});
