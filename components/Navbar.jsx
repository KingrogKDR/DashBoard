"use client";

import { ModeToggle } from "./DarkModeToggle";

export default function Navbar() {
  const username = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
  console.log(username);
  return (
    <nav className="p-4 border-b-2">
      <ModeToggle />
      <div>
        {username}
      </div>
    </nav>
  );
}
