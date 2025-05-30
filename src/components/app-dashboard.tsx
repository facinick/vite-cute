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
import { useStore } from '../hooks/use-store';
import { Button } from "./ui/button";

export default function AppDashboard() {
  const bears = useStore((state) => state.bears);
  const addBear = useStore((state) => state.addBear);

  const fishes = useStore((state) => state.fishes);
  const addFish = useStore((state) => state.addFish);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>

        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        {/* Bear count and button */}
        <div>
          <h2>Number of bears: {bears}</h2>
          <Button onClick={addBear}>Add a bear</Button>
        </div>

        {/* Fish count and button */}
        <div>
          <h2>Number of fishes: {fishes}</h2>
          <Button onClick={addFish}>Add a fish</Button>
        </div>

      </SidebarInset>
    </SidebarProvider>
  )
}
