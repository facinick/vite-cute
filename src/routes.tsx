import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AppDashboard } from '@/components/app-dashboard';

// Lazy load pages for better performance
const Home = lazy(() => import('@/pages/home'));
const GameOfLife = lazy(() => import('@/pages/game-of-life'));
const Animations = lazy(() => import('@/pages/animations'));
const BuildingYourApplication = lazy(() => import('@/pages/building-your-application'));
const DataFetching = lazy(() => import('@/pages/data-fetching'));
const Components = lazy(() => import('@/pages/components'));
const ApiReference = lazy(() => import('@/pages/api-reference'));
const Architecture = lazy(() => import('@/pages/architecture'));
const Community = lazy(() => import('@/pages/community'));
const ContributionGuide = lazy(() => import('@/pages/contribution-guide'));
const CodeOfConduct = lazy(() => import('@/pages/code-of-conduct'));

// Loading component for Suspense fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Create a wrapper component that renders the lazy component with Suspense
const createLazyElement = (LazyComponent: React.ComponentType) => (
  <Suspense fallback={<LoadingFallback />}>
    <LazyComponent />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppDashboard />,
    children: [
      {
        index: true,
        element: createLazyElement(Home),
      },
      {
        path: "animations",
        element: createLazyElement(Animations),
      },
      {
        path: "game-of-life",
        element: createLazyElement(GameOfLife),
      },
      {
        path: "building-your-application",
        element: createLazyElement(BuildingYourApplication),
        children: [
          {
            index: true,
            element: <div className="p-6">Building Your Application</div>,
          },
          {
            path: "data-fetching",
            element: createLazyElement(DataFetching),
          },
          {
            path: "components",
            element: createLazyElement(Components),
          },
        ],
      },
      {
        path: "api-reference",
        element: createLazyElement(ApiReference),
      },
      {
        path: "architecture",
        element: createLazyElement(Architecture),
      },
      {
        path: "community",
        element: createLazyElement(Community),
        children: [
          {
            index: true,
            element: <div className="p-6">Community Content</div>,
          },
          {
            path: "contribution-guide",
            element: createLazyElement(ContributionGuide),
          },
          {
            path: "code-of-conduct",
            element: createLazyElement(CodeOfConduct),
          },
        ],
      },
    ],
  },
]);
