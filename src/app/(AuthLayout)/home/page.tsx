import React from "react";
import EditalCard from "@/components/layout/EditalCard";
import { generateEditalCardData } from "@/lib/utils";
import { IEditalCard } from "@/types/types";

// const asyncEditalCardData = async () => {
//   return await new Promise((resolve) =>
//     setTimeout(() => {
//       resolve(generateEditalCardData());
//     }, 3000)
//   );
// };

async function getData(): Promise<IEditalCard[]> {
  return generateEditalCardData();
}

export default async function Home() {
  const editalCardData = await getData();

  return (
    <section className="flex flex-wrap gap-6 py-10 items-center justify-center flex-col">
      <h1 className="text-2xl font-bold text-neutral-700 text-center m-9">
        Meus Editais
      </h1>
      <div className="flex flex-wrap gap-6 py-10 place-content-center">
        {editalCardData.map((card) => (
          <EditalCard
            key={card.editalId}
            status={card.status}
            areas={card.areas}
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
