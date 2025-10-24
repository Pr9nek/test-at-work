// import { createBrowserRouter } from 'react-router-dom';
import { createHashRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import EditUser from './pages/EditUser';
import { fetchJson, queryClient } from './utils/config';

export const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () => {
          const usersPromise = queryClient.ensureQueryData({
            queryKey: ['users'],
            queryFn: () => fetchJson('https://jsonplaceholder.typicode.com/users'),
            staleTime: 1000 * 60,
          });
          return { users: usersPromise };
        },
      },
      {
        path: '/users/:id',
        element: <EditUser />,
        loader: ({ params }) => {
          const id = params.id as string;
          const userPromise = queryClient.ensureQueryData({
            queryKey: ['user', id],
            queryFn: () => fetchJson(`https://jsonplaceholder.typicode.com/users/${id}`),
            staleTime: 1000 * 60,
          });
          return { user: userPromise };
        },
      },
    ],
  },
]);