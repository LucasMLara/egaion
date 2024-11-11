import AccreditationForm from "./SelectAreaForm";
import { accreditationData } from "@/mocks";
import AreaCard from "./AreaCard";
import { useEditalStore } from "@/store/EditalRegister";
import { useEffect } from "react";

export default function InsertQualificacaoTecnicaDocs() {
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
      <AccreditationForm data={accreditationData} />
      {Qualificacao.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {Qualificacao.map((area) => (
            <AreaCard key={area.areaId} area={area.name} areaId={area.areaId}  />
          ))}
        </div>
      )}
    </div>
  );
}
