import { RouterProvider } from 'react-router-dom';
import { router } from './config';

export function AppRouterProvider() {
  return <RouterProvider router={router} />;
}
