"use client";

import "./globals.css";
import { ThemeProvider } from "./providers";
import Navbar from "../components/Navbar";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebar } from "../components/Sidebar";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`antialiased`}>
        {pathname !== "/login" ? (
          <>
            <ThemeProvider>
              <Navbar />
              <SidebarProvider>
                <AppSidebar />
                <main className="h-screen px-8 py-10">
                  <SidebarTrigger className="absolute top-5 ml-3" />
                  {children}
                </main>
              </SidebarProvider>
            </ThemeProvider>
          </>
        ) : (
          <main className="h-screen flex items-center justify-center">
            {children}
          </main>
        )}
      </body>
    </html>
  );
}
