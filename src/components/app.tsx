import { ThemeProvider } from "@/components/theme-provider";
import { router } from "@/routes";
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Progress } from "./ui/progress";

// Loading component for Suspense fallback
const LoadingFallback = () => (
  <Progress />
);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Suspense fallback={<LoadingFallback />}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  )
}

export default App
