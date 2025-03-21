"use client";

import React from "react";
import Image from "next/image";
import { User } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
} from "../components/ui/card";
import { Separator } from "../components/ui/separator";

export default function ProfileCard({ username }) {

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="flex flex-col items-center justify-center p-6 pb-0">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-primary mb-4">
          <Image
            src={`https://avatar.iran.liara.run/username?username=${username}`}
            alt={username}
            fill
            className="object-cover"
            priority
          />
        </div>
        <h2 className="text-2xl font-bold">{username}</h2>
      </CardHeader>

      <CardContent className="p-6">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center space-x-2">
            <User size={18} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Member since March 2025
            </span>
          </div>

          <Separator className="my-2" />
        </div>
      </CardContent>
    </Card>
  );
}
