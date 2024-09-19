import AccreditationForm from "./AccreditationForm";
import { accreditationData } from "@/mocks";
import AreaCard from "./AreaCard";
import { useEditalStore } from "@/store/EditalRegister";

export default function InsertQualificacaoTecnicaDocs() {
  const {
    editalData: {
      Qualificacao: { areas },
    },
  } = useEditalStore();

  return (
    <div>
      <AccreditationForm data={accreditationData} />
      {areas.length > 0 && (
        <div className="flex flex-wrap gap-3 place-content-center">
          {areas.map((area) => (
            <AreaCard key={area} area={area} />
          ))}
        </div>
      )}
    </div>
  );
}
