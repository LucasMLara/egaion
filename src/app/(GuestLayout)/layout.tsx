import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session) {
    redirect("/home");
  }

  return children;
}
