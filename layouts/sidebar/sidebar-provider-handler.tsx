import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

export default async function SidebarProviderHandler({ children }: { children: ReactNode }) {
  const cookiesStore = await cookies();
  const state = cookiesStore.get("sidebar_state")?.value;

  return (
    <SidebarProvider open={state ? state === "true" : true}>
      {children}
    </SidebarProvider>
  )
}