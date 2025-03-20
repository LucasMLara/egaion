"use client";
import { useEffect, useState } from "react";
import EditalCard from "@/components/layout/EditalCard";
import { useAvailableEditals } from "@/store/useAvailableEditals";
import { formatDate } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";

export default function Editais() {
  const { availableEditals, setListEditals } = useAvailableEditals();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEditais() {
      try {
        const response = await fetch("/api/editais");
        const { editais } = await response.json();
        setListEditals(editais);
        setLoading(false);
      } catch (error) {
        console.error("Erro", error);
      }
    }
    fetchEditais();
  }, [setListEditals]);

  if (loading) {
    return (
      <div className="h-full flex justify-center items-center">
        <LoaderIcon className="animate-spin size-8" />
      </div>
    );
  }
  return (
    <section className="flex flex-wrap gap-6 py-10 items-center justify-center flex-col">
      <h1 className="text-2xl font-bold text-neutral-700 text-center m-9">
        Editais disponíveis
      </h1>
      <div className="flex flex-wrap gap-6 py-10 place-content-center">
        {availableEditals
          .map((card) => (
            <EditalCard
              status={null}
              key={card.idSCEdital}
              editalCardContent={card.ResumoEdital}
              editalCardTitle={card.NomeEdital}
              editalCardDate={formatDate(card.InicioEdital)}
              editalDialogTitle={card.NomeEdital}
              editalDialogDescription={card.Objetivos}
              editalDialogContent={card.Objetivos}
              editalId={card.idSCEdital}
              editalType={card.TipodeCredenciamento}
            />
          ))
          .reverse()}
      </div>
    </section>
  );
}
