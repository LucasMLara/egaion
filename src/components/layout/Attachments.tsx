import React from "react";
import DocCard from "@/components/layout/DocCard";
import { AttachmentItem } from "@/types/types";





export default function Documentacao( { anexos }: {anexos: AttachmentItem[] }) {
  if (anexos.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Não há anexos cadastrados neste edital.
        </h1>
      </div>
    );

  return (
    <section className="flex flex-wrap flex-col gap-6 justify-center place-content-center">
      <div className="flex flex-wrap gap-6 py-10 place-content-center">
        {anexos.map((card) => (
          <DocCard
            docFile={card.Arquivo}
            key={card.idAnexo}
            docStatus={null}
            docTitle={card.Descricao}
            docDate={card.DataCriacao}
            docContent={card.Descricao}
            docDialogContent={`${card.Arquivo}`}
            docDialogDescription={card.Descricao}
            docDialogTitle={card.Responsavel}
            docId={card.idAnexo}
          />
        ))}
      </div>
    </section>
  );
}
