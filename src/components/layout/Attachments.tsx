import React from "react";
import DocCard from "@/components/layout/DocCard";
import { AttachmentItem } from "@/types/types";





export default function Documentacao( { anexos }: {anexos: AttachmentItem[] }) {

  return (
    <section className="flex flex-wrap flex-col gap-6 justify-center place-content-center">
      <div className="flex flex-wrap gap-6 py-10 place-content-center">
        {anexos.map((card) => (
          <DocCard
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
