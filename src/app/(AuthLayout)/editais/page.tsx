import React from "react";
import EditalCard from "@/components/layout/EditalCard";
import { generateEditalCardData } from "@/lib/utils";

export default function Editais() {
  return (
    <section className="flex flex-wrap gap-6 py-10 items-center justify-center flex-col">
      <h1 className="text-2xl font-bold text-neutral-700 text-center m-9">
        Editais disponíveis
      </h1>
      <div className="flex flex-wrap gap-6 py-10 place-content-center">
        {generateEditalCardData().map((card) => (
          <EditalCard
            status={null}
            key={card.editalId}
            editalCardContent={card.editalCardContent}
            editalCardTitle={card.editalCardTitle}
            editalCardDate={card.editalCardDate}
            editalDialogTitle={card.editalDialogTitle}
            editalDialogDescription={card.editalDialogDescription}
            editalDialogContent={card.editalDialogContent}
            editalId={card.editalId}
          />
        ))}
      </div>
    </section>
  );
}
