import AccreditationForm from "./SelectAreaForm";
import { accreditationData } from "@/mocks";
import AreaCard from "./AreaCard";
import { useEditalStore } from "@/store/EditalRegister";
import { useEffect } from "react";
import { OutputItem } from "@/lib/utils";

export default function InsertQualificacaoTecnicaDocs({
  areas,
}: {
  areas: OutputItem[];
}) {
  const { Qualificacao, alterarPermissaoEdital, Documentos, Consultores } =
    useEditalStore();

  useEffect(() => {
    Qualificacao.map(({ naturezaPrestacao, AreaDocuments }) => {
      if (
        naturezaPrestacao.length === 0 ||
        AreaDocuments.length === 0 ||
        Consultores.length === 0 ||
        Documentos.length === 0
      ) {
        alterarPermissaoEdital(false);
      } else {
        alterarPermissaoEdital(true);
      }
    });
  }, [Qualificacao, alterarPermissaoEdital, Documentos, Consultores]);

  return (
    <div className="max-h-screen overflow-auto">
      <AccreditationForm data={areas} />
      {Qualificacao.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {Qualificacao.map((area) => (
            <AreaCard key={area.areaId} area={area.name} areaId={area.areaId} />
          ))}
        </div>
      )}
    </div>
  );
}
