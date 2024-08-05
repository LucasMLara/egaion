import React from "react";
import DocCard from "@/components/layout/DocCard";
import { generateDocCardData } from "@/lib/utils";
import { IDocCard } from "@/types/types";

async function getData(): Promise<IDocCard[]> {
  return generateDocCardData();
}

export default async function Documentacao() {
  const docCardData = await getData();

  return (
    <section className="flex flex-wrap flex-col gap-6 justify-center place-content-center">
      <h1 className="text-2xl font-bold text-neutral-700 text-center m-9">
        Documentação da Empresa Credenciada
      </h1>
      <div className="flex flex-wrap gap-6 py-10 place-content-center">
        {docCardData.map((card) => (
          <DocCard
            key={card.docId}
            docStatus={card.docStatus}
            docTitle={card.docTitle}
            docDate={card.docDate}
            docAreas={card.docAreas}
            docContent={card.docContent}
            docDialogContent={card.docDialogContent}
            docDialogDescription={card.docDialogDescription}
            docDialogFooter={card.docDialogFooter}
            docDialogHeader={card.docDialogHeader}
            docDialogTitle={card.docDialogTitle}
            docId={card.docId}
          />
        ))}
      </div>
    </section>
  );
}
