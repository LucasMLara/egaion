"use client";
import React, { useCallback, useEffect, useState } from "react";
import MyEditalCard from "@/components/layout/MyEditalCard";
import { useMyEditals } from "@/store/useMyEditals";
import { LoaderIcon } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function Home() {
  const { myEditals, setListMyEditals } = useMyEditals();
    const [loading, setLoading] = useState(true);
  

const fetchMyEditals = useCallback(async () => {
  try{
    const response = await fetch('api/myEditals');
    const { meusEditais } = await response.json();
    setListMyEditals(meusEditais)
    setLoading(false)
  }catch(e) {
    console.log('Erro desconhecido', e)
  }
} , [setListMyEditals ])

  useEffect(() => {
  fetchMyEditals()

}, [fetchMyEditals])

  useEffect(() => {
    setListMyEditals(myEditals);
  }, [setListMyEditals, myEditals]);
  if (loading) {
    return (
      <div className="h-full flex justify-center items-center">
        <LoaderIcon className="animate-spin size-8" />
      </div>
    );
  }
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
            status={card.Status}
                key={card.idSCCredenciadasEdital}
                editalCardContent={card.ResumoEdital}
                editalCardTitle={card.NomeEdital}
                editalCardDate={formatDate(card.InicioEdital)}
                editalDialogTitle={card.NomeEdital}
                editalDialogDescription={card.Objetivos}
                editalDialogContent={card.Objetivos}
                editalId={card.idSCEdital}
          />
        ))}
      </div>
    </section>
  );
}
