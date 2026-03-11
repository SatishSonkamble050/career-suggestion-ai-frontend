'use client';

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { FileX } from "lucide-react";

interface NoDataProps {
  title?: string;
  description?: string;
  buttonText?: string;
  redirectUrl?: string;
}

export default function NoData({
  title = "No Data Found",
  description = "You don't have any reports yet.",
  buttonText = "Start Assessment",
  redirectUrl = "/assessment/start",
}: NoDataProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
      <div className="bg-muted p-4 rounded-full">
        <FileX className="w-8 h-8 text-muted-foreground" />
      </div>

      <h2 className="text-xl font-semibold">{title}</h2>

      <p className="text-muted-foreground max-w-md">
        {description}
      </p>

      <Button
        variant="gradient"
        onClick={() => router.push(redirectUrl)}
      >
        {buttonText}
      </Button>
    </div>
  );
}