"use client";

import Navbar from "../../components/Navbar"
import { ThemeProvider } from "../../components/theme-provider";

export default function RootGroupLayout({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Navbar />
      {children}
    </ThemeProvider>
  );
}
