import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useStore } from '@/hooks/use-store';
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

// Helper function to convert path to breadcrumb name
const pathToName = (path: string) => {
  return path
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export function AppDashboard() {
  const location = useLocation();
  const { bears, addBear, fishes, addFish } = useStore();

  // Generate breadcrumbs from the current route
  const breadcrumbs = React.useMemo(() => {
    const paths = location.pathname.split('/').filter(Boolean);
    
    return paths.map((path, _index) => {
      const to = `/${paths.slice(0, _index + 1).join('/')}`;
      const name = pathToName(path);
      const isLast = _index === paths.length - 1;
      
      return {
        name,
        to,
        isLast,
      };
    });
  }, [location.pathname]);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden">
        <AppSidebar />
        <div className="flex-1 flex flex-col overflow-hidden w-full">
          <header className="sticky top-0 z-10 h-16 border-b bg-background w-full">
            <div className="flex h-full items-center px-6 w-full gap-4">
              <SidebarTrigger className="md:hidden" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/" className="text-sm font-medium">
                        Home
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {breadcrumbs.map((breadcrumb, _index) => (
                    <React.Fragment key={breadcrumb.to}>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        {breadcrumb.isLast ? (
                          <BreadcrumbPage className="text-sm">
                            {breadcrumb.name}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link to={breadcrumb.to} className="text-sm hover:underline">
                              {breadcrumb.name}
                            </Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
              <div className="ml-auto">
                <ModeToggle />
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6 w-full">
            <div className="w-full max-w-full">
              <Outlet context={{ bears, addBear, fishes, addFish }} />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default AppDashboard;
