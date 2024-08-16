import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
// import SebraeLogo from "@/assets/Sebrae.svg";

export default async function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session) {
    redirect("/home");
  }

  return (
    <div className="h-screen grid  bg-primary-200">
      {/* <SebraeLogo className="h-full w-full object-fill dark:brightness-[0.2] dark:grayscale block md:hidden" /> */}
      {children}
      {/* <SebraeLogo className="h-full xl:w-full object-fill dark:brightness-[0.2] dark:grayscale w-2/3 hidden md:flex" /> */}
    </div>
  );
}
