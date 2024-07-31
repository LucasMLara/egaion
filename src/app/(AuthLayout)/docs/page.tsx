import React from "react";
import DocCard from "@/components/layout/DocCard";

export default function Documentacao() {
  const editaisCount = Math.round(Math.random() * 20);

  const DocCards = Array.from({ length: editaisCount }, (_, index) => (
    <DocCard key={index} />
  ));
  return (
    <section className="flex flex-wrap flex-col gap-6 justify-center place-content-center">
      <h1 className="text-2xl font-bold text-neutral-700 text-center m-9">
        Documentação da Empresa Credenciada
      </h1>
      <div className="flex flex-wrap gap-6 py-10 place-content-center">
        <DocCard status="ok" />
        <DocCard status="error" />
        <DocCard status="pending" />
        {DocCards}
      </div>
    </section>
  );
}
