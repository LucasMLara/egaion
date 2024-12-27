"use client";
import { useEffect} from "react";
import EditalCard from "@/components/layout/EditalCard";
import { useAvailableEditals } from "@/store/useAvailableEditals";
import  Dayjs from "dayjs"

export default function Editais() {
  const { availableEditals, setListEditals } = useAvailableEditals();

  useEffect(() => {
    async function fetchEditais() {
      try {
        const response = await fetch("/api/editais");
        const { editais } = await response.json();
        setListEditals(editais);
        
      } catch (error) {
        console.log('Erro', error);
        
      }
    }
    fetchEditais();
  }, [setListEditals]);


  


  return (
    <section className="flex flex-wrap gap-6 py-10 items-center justify-center flex-col">
      <h1 className="text-2xl font-bold text-neutral-700 text-center m-9">
        Editais disponíveis
      </h1>
      <div className="flex flex-wrap gap-6 py-10 place-content-center">
        {availableEditals.map((card) => (
          <EditalCard
            status={null}
            key={card.idSCEdital}
            editalCardContent={card.ResumoEdital}
            editalCardTitle={card.NomeEdital}
            editalCardDate={Dayjs(card.InicioEdital).format("DD/MM/YYYY")}
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
