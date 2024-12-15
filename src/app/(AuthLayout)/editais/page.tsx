"use client";
import React, { useEffect } from "react";
import EditalCard from "@/components/layout/EditalCard";
import { generateEditalCardData } from "@/lib/utils";
import { IAvailableEditals } from "@/store/useAvailableEditals/types";
import { useAvailableEditals } from "@/store/useAvailableEditals";

export default function Editais() {
  const { availableEditals, setListEditals } = useAvailableEditals();

  // useEffect(() => {
  //   async function fetchEditais() {
  //     try {
  //       const response = await fetch("/api/editais");
  //       const data = await response.json();
  //       console.log(data)
        
  //     } catch (error) {
  //       console.log('Erro', error);
        
  //     }
  //   }
  //   fetchEditais();
  // }, [setListEditals]);

  useEffect(() => {
    setListEditals(
      generateEditalCardData().map(
        (edital): IAvailableEditals => ({
          id: edital.editalId,
          date: new Date(edital.editalCardDate),
          title: edital.editalCardTitle,
          description: edital.editalCardContent,
        })
      )
    );
  }, []);
  return (
    <section className="flex flex-wrap gap-6 py-10 items-center justify-center flex-col">
      <h1 className="text-2xl font-bold text-neutral-700 text-center m-9">
        Editais disponíveis
      </h1>
      <div className="flex flex-wrap gap-6 py-10 place-content-center">
        {availableEditals.map((card) => (
          <EditalCard
            status={null}
            key={card.id}
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
