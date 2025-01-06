import React from "react";

import { HistoryItem } from "@/types/types";

export default function EditalHistory({
  historico,
}: {
  historico: HistoryItem[];
}) {
  if (historico.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Não há registros cadastrados neste edital.
        </h1>
      </div>
    );

  return (
    <>
      <h2 className="text-lg text-center font-bold mb-4">Histórico</h2>
      <div className="border-2 rounded-xl overflow-auto m-4 bg-neutral-300 text-neutral-600 h-full">
        <ul className="m-4">
          {historico.map((item) => (
            <li key={item.idHistorico} className="m-4">
              <h1 className="font-semibold"> {item.Responsavel}</h1>
              <span> {item.DataCriacao}</span>
              <h3 className="text-lg font-bold">{item.Descricao}</h3>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
