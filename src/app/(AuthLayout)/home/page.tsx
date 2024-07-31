import React from "react";
import EditalCard from "@/components/layout/EditalCard";

export default async function Home() {
  const editaisCount = Math.round(Math.random() * 20);

  const editalCards = Array.from({ length: editaisCount }, (_, index) => (
    <EditalCard key={index} />
  ));

  return (
    <section className="flex flex-wrap gap-6 py-10 items-center justify-center flex-col">
      <h1 className="text-2xl font-bold text-neutral-700 text-center m-9">
        Meus Editais
      </h1>
      <div className="flex flex-wrap gap-6 py-10 place-content-center">
        <EditalCard status="ok" />
        <EditalCard status="error" />
        <EditalCard status="pending" />
        {editalCards}
      </div>
    </section>
  );
}
