import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

// React Hello World
export const HelloWorldPage = lazy(() => import('src/pages/new-pages/hello-world'));
export const BasicInputPage = lazy(() => import('src/pages/new-pages/basic-input'));
export const BasicInputWithListPage = lazy(() => import('src/pages/new-pages/basic-input-with-list'));
export const ComponentInputPage = lazy(() => import('src/pages/new-pages/component-pages/component-input'));
export const ComponentOutputPage = lazy(() => import('src/pages/new-pages/component-pages/component-output'));
export const UnrelatedComponentsPage = lazy(() => import('src/pages/new-pages/component-pages/unrelated-components'));
export const SignInDemoPage = lazy(() => import('src/pages/new-pages/sign-in-demo-page'));

export const DashboardPage = lazy(() => import('src/pages/dashboard'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const UserDemoPage = lazy(() => import('src/pages/user-demo'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

const renderFallback = () => (
  <Box
    sx={{
      display: 'flex',
      flex: '1 1 auto',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export const routesSection: RouteObject[] = [
  {
    element: (
      <DashboardLayout>
        <Suspense fallback={renderFallback()}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'hello-world', element: <HelloWorldPage /> },
      { path: 'basic-input', element: <BasicInputPage /> },
      { path: 'basic-input-with-list', element: <BasicInputWithListPage /> },
      { path: 'component-input', element: <ComponentInputPage /> },
      { path: 'component-output', element: <ComponentOutputPage /> },
      { path: 'unrelated-components', element: <UnrelatedComponentsPage /> },
      { path: 'sign-in-page', element: <SignInDemoPage /> },


      { path: 'user', element: <UserPage /> },
      { path: 'user-demo', element: <UserDemoPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'blog', element: <BlogPage /> },
    ],
  },
  {
    path: 'sign-in',
    element: (
      <AuthLayout>
        <SignInPage />
      </AuthLayout>
    ),
  },
  {
    path: '404',
    element: <Page404 />,
  },
  { path: '*', element: <Page404 /> },
];
