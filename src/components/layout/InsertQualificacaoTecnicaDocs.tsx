import AccreditationForm from "./SelectAreaForm";
import AreaCard from "./AreaCard";
import { useEditalStore } from "@/store/EditalRegister";
import { useEffect } from "react";
import { OutputItem, Limites } from "@/lib/utils";
import { Button } from "../ui/button";

export default function InsertQualificacaoTecnicaDocs({
  areas,
  limites,
}: {
  areas: OutputItem[];
  limites: Limites;
}) {
  const {
    Qualificacao,
    alterarPermissaoEdital,
    Documentos,
    Consultores,
    RequiredDocumentsQty,
    checkQualificacaoConsultants,
  } = useEditalStore();

  useEffect(() => {
    Qualificacao.map(({ AreaDocuments }) => {
      if (
        AreaDocuments.length === 0 ||
        Consultores.length === 0 ||
        Documentos.length !== RequiredDocumentsQty ||
        !checkQualificacaoConsultants()
      ) {
        alterarPermissaoEdital(false);
      } else {
        alterarPermissaoEdital(true);
      }
    });
  }, [
    Qualificacao,
    alterarPermissaoEdital,
    Documentos,
    Consultores,
    RequiredDocumentsQty,
    checkQualificacaoConsultants,
  ]);

  return (
    <div className="max-h-screen overflow-auto">
      <AccreditationForm data={areas} limites={limites} />
      {Qualificacao.length > 0 && (
        <div className="flex flex-wrap gap-3">
          <h1 className="text-2xl font-bold  bg-auxiliary-warning-400 p-5 rounded-lg text-center w-full">
            Clique nas linhas abaixo para preencher os demais dados e subir a
            documentação técnica de cada área
          </h1>
          {Qualificacao.map((area) => (
            <AreaCard key={area.areaId} area={area.name} areaId={area.areaId} />
          ))}
        </div>
      )}
    </div>
  );
}
