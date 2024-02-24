"use client";
import React, { Fragment } from "react";
import Navbar from "@/components/organisms/Navbar";

export default function QuizLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={"min-h-full"}>
      <div className="py-10">
        <Navbar />
        <main className={"pt-16"}>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
