import { Calendar, Home, Inbox, Search, Settings, Link } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";

export function AppSidebar() {
  return (
    <Sidebar className="bg-gradient-to-b from-[#0a0f1a] to-[#1a1f2e] text-white shadow-2xl">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-center px-4 py-6 text-xl text-white font-bold text-center tracking-wide bg-[#00050A]/60 backdrop-blur-md rounded-b-2xl shadow-md">
            🌐 Meus Links
          </SidebarGroupLabel>

          <SidebarGroupContent className="mt-6">
            <SidebarMenu>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center justify-between gap-2 px-3 py-2 w-full rounded-lg bg-white/10 hover:bg-white/20 transition-colors font-medium cursor-pointer">
                  <span className="flex items-center justify-center gap-6">
                    <span className="border-dashed border-2 border-white/10 p-2 rounded-full">
                      <Link className="w-5 h-5" />
                    </span>
                    Ver Links
                  </span>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="mt-2 w-full bg-[#0f1522] border border-white/10 shadow-xl p-2">
                  <DropdownMenuSeparator className="bg-white/10 my-1" />
                  
                  {/* <DropdownMenuItem className="px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer">
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer">
                    Team
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer">
                    Subscription
                  </DropdownMenuItem> */}
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
