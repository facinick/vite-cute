import { appSettings } from "@/app-settings"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from "@/components/ui/sidebar"
import { GalleryVerticalEnd, Gamepad2 } from "lucide-react"
import * as React from "react"
import { Link } from "react-router-dom"

type NavItem = {
  title: string
  path: string
  icon?: React.ReactNode
  items?: NavItem[]
}

const navItems: NavItem[] = [
  {
    title: "Game of Life",
    path: "/game-of-life",
    icon: <Gamepad2 className="h-4 w-4" />
  },
  {
    title: "Animations",
    path: "/animations",
  },
  {
    title: "Building Your Application",
    path: "/building-your-application",
    items: [
      {
        title: "Data Fetching",
        path: "/building-your-application/data-fetching",
      },
      {
        title: "Components",
        path: "/building-your-application/components",
      },
    ],
  },
  {
    title: "API Reference",
    path: "/api-reference",
  },
  {
    title: "Architecture",
    path: "/architecture",
  },
  {
    title: "Community",
    path: "/community",
    items: [
      {
        title: "Contribution Guide",
        path: "/community/contribution-guide",
      },
      {
        title: "Code of Conduct",
        path: "/community/code-of-conduct",
      },
    ],
  },
]

const NavItem = ({
  item,
  level = 0,
}: {
  item: NavItem
  level?: number
}) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link 
          to={item.path}
          className="font-medium block w-full text-left flex items-center gap-2"
        >
          {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
      {item.items?.length ? (
        <SidebarMenuSub>
          {item.items.map((subItem) => (
            <NavItem 
              key={subItem.path} 
              item={subItem} 
              level={level + 1} 
            />
          ))}
        </SidebarMenuSub>
      ) : null}
    </SidebarMenuItem>
  )
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/" className="block">
                <div className="flex items-center gap-2">
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <GalleryVerticalEnd className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-medium">{appSettings.APP_NAME}</span>
                    <span className="text-xs opacity-70">{appSettings.APP_VERSION}</span>
                  </div>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item) => (
              <NavItem 
                key={item.path}
                item={item} 
              />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}