"use client";
import React from "react";
import CreateConsultant from "@/components/layout/CreateConsultant";
export default function MemberRegister() {
  return (
    <section className="flex flex-wrap flex-col gap-6 justify-center place-content-center">
      <h1 className="text-2xl font-bold text-neutral-700 text-center m-9">
        Cadastrar Consultor(a)
      </h1>
      <CreateConsultant />
    </section>
  );
}
