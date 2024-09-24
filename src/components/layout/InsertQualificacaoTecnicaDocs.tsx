import AccreditationForm from "./SelectAreaForm";
import { accreditationData } from "@/mocks";
import AreaCard from "./AreaCard";
import { useEditalStore } from "@/store/EditalRegister";

export default function InsertQualificacaoTecnicaDocs() {
  const { Qualificacao } = useEditalStore();

  return (
    <div>
      <AccreditationForm data={accreditationData} />
      {Qualificacao.length > 0 && (
        <div className="flex flex-wrap gap-3 place-content-center">
          {Qualificacao.map((area) => (
            <AreaCard key={area.areaId} area={area.name} areaId={area.areaId} />
          ))}
        </div>
      )}
    </div>
  );
}
