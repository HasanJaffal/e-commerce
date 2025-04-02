import Layout from './app/Layout';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
    return (
        <Layout>
            <RouterProvider router={router} />
        </Layout>
    );
}

export default App;
