"use client";

import { useEffect, useState } from "react";
import { ModeToggle } from "./DarkModeToggle";
import Image from "next/image";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

export default function Navbar() {
  const [username, setUsername] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setUsername(process.env.NEXT_PUBLIC_ADMIN_USERNAME);
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <nav className="p-4 border-b-2">
        <ModeToggle />
        <div>username </div>
      </nav>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    redirect("/login");
  };

  return (
    <nav className="p-4 border-b-2 flex justify-end items-center gap-4 text-xs md:text-sm">
      <ModeToggle />
      {username}
      <Image
        src={`https://avatar.iran.liara.run/username?username=` + username}
        alt="username"
        width={44}
        height={44}
      />
      <Button className="text-xs md:text-sm" onClick={handleLogout}>
        Logout
      </Button>
    </nav>
  );
}
