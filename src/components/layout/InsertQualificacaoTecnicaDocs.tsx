import AccreditationForm from "./SelectAreaForm";
import AreaCard from "./AreaCard";
import { useEditalStore } from "@/store/EditalRegister";
import { useEffect } from "react";
import { OutputItem } from "@/lib/utils";

export default function InsertQualificacaoTecnicaDocs({
  areas,
}: {
  areas: OutputItem[];
}) {
  const {
    Qualificacao,
    alterarPermissaoEdital,
    Documentos,
    Consultores,
    RequiredDocumentsQty,
  } = useEditalStore();

  useEffect(() => {
    Qualificacao.map(({ naturezaPrestacao, AreaDocuments }) => {
      if (
        naturezaPrestacao.length === 0 ||
        AreaDocuments.length === 0 ||
        Consultores.length === 0 ||
        Documentos.length !== RequiredDocumentsQty
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
  ]);

  return (
    <div className="max-h-screen overflow-auto">
      <AccreditationForm data={areas} />
      {Qualificacao.length > 0 && (
        <div className="flex flex-wrap gap-3">
          <h1 className="text-2xl font-bold  bg-auxiliary-warning-400 p-5 rounded-lg text-center w-full">
            Clique nas linhas abaixo para preencher os demais dados e subir a documentação técnica de cada área
          </h1>
          {Qualificacao.map((area) => (
            <AreaCard key={area.areaId} area={area.name} areaId={area.areaId} />
          ))}
        </div>
      )}
    </div>
  );
}
