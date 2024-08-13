import React from "react";
import DocCard from "@/components/layout/DocCard";
import { generateDocCardData } from "@/lib/utils";
import { IDocCard } from "@/types/types";

function getData(): IDocCard[] {
  return generateDocCardData();
}

export default function Documentacao() {
  const docCardData = getData();

  return (
    <section className="flex flex-wrap flex-col gap-6 justify-center place-content-center">
      <h1 className="text-2xl font-bold text-neutral-700 text-center m-9">
        Documentação da Empresa Credenciada
      </h1>
      <div className="flex flex-wrap gap-6 py-10 place-content-center">
        {docCardData.map((card) => (
          <DocCard
            key={card.docId}
            docStatus={null}
            docTitle={card.docTitle}
            docDate={card.docDate}
            docContent={card.docContent}
            docDialogContent={card.docDialogContent}
            docDialogDescription={card.docDialogDescription}
            docDialogTitle={card.docDialogTitle}
            docId={card.docId}
          />
        ))}
      </div>
    </section>
  );
}
