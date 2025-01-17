"use client";
import React, { useEffect } from "react";
import MyEditalCard from "@/components/layout/MyEditalCard";
import { useMyEditals } from "@/store/useMyEditals";

export default function Home() {
  const { myEditals, setListMyEditals } = useMyEditals();

  useEffect(() => {
    setListMyEditals(myEditals);
  }, [setListMyEditals, myEditals]);

  // useEffect(() => {
  //   async function fetchEditais() {
  //     try {
  //       const response = await fetch("/api/myEditals");
  //       const { meusEditais } = await response.json();
  //       console.log(meusEditais);
  //     } catch (error) {
  //       console.log("Erro", error);
  //     }
  //   }
  //   fetchEditais();
  // }, []);

  return myEditals.length === 0 ? (
    <div className="flex flex-col h-full items-center justify-center">
      <div className="text-center flex w-5/6 md:w-3/4 flex-col rounded-md border-2 bg-neutral-500 justify-center items-center p-14">
        <h1 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Você não se cadastrou em nenhum edital
        </h1>
      </div>
    </div>
  ) : (
    <section className="flex flex-wrap gap-6 py-10 items-center justify-center flex-col">
      <h1 className="text-2xl font-bold text-neutral-700 text-center m-9">
        Meus Editais
      </h1>
      <div className="flex flex-wrap gap-6 py-10 place-content-center">
        {myEditals.map((card) => (
          <MyEditalCard
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
