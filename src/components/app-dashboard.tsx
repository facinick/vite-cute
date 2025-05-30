import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
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
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="md:hidden" />
            <Separator orientation="vertical" className="h-4 mx-2 hidden md:block" />
            <Breadcrumb className="flex-1">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/" className="text-sm hover:underline">
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
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <Outlet context={{ bears, addBear, fishes, addFish }} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default AppDashboard;
