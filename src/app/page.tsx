"use client";

import AppHeader from "./AppHeader/AppHeader";
import AppTable from "./AppTable/AppTable";
import { Card } from "@/components/ui/card";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme } = useTheme();
  const [isClient, setClient] = useState(false);
  const bgColor = theme === "dark" ? "bg-black" : "bg-gray-50";

  useEffect(() => {
    setClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className={`poppins p-5  ${bgColor} border w-full min-h-screen`}>
      <Card className="flex flex-col shadow-none p-2">
        <AppHeader />
        <AppTable />
      </Card>
    </div>
  );
}
