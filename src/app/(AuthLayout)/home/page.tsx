"use client";
import React, { useEffect } from "react";
import EditalCard from "@/components/layout/EditalCard";
import { generateEditalCardData } from "@/lib/utils";

import { useMyEditals } from "@/store/useMyEditals";
import { IMyEditals } from "@/store/useMyEditals/types";

export default function Home() {
  const { myEditals, setListMyEditals } = useMyEditals();

  useEffect(() => {
    setListMyEditals(
      generateEditalCardData().map(
        (edital): IMyEditals => ({
          id: edital.editalId,
          date: new Date(edital.editalCardDate),
          title: edital.editalCardTitle,
          description: edital.editalCardContent,
          status: edital.status,
        })
      )
    );
  }, []);

  return (
    <section className="flex flex-wrap gap-6 py-10 items-center justify-center flex-col">
      <h1 className="text-2xl font-bold text-neutral-700 text-center m-9">
        Meus Editais
      </h1>
      <div className="flex flex-wrap gap-6 py-10 place-content-center">
        {myEditals.map((card) => (
          <EditalCard
            key={card.id}
            status={card.status}
            editalCardContent={card.description}
            editalCardTitle={card.title}
            editalCardDate={card.date.toLocaleDateString("pt-BR")}
            editalDialogTitle={card.title}
            editalDialogDescription={card.description}
            editalDialogContent={card.description}
            editalId={card.id}
          />
        ))}
      </div>
    </section>
  );
}
