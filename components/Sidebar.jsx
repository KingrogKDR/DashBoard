import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "../components/ui/sidebar";

const items = [
  {
    title: "Dashboard",
    url: "/",
  },
  {
    title: "Settings",
    url: "/settings",
  },
  {
    title: "Profile",
    url: "#",
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="py-10 px-5">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <span className="text-xs md:text-sm">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
