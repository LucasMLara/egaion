import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ConsultantRowDisplay } from "@/types/types";
import { useEditalStore } from "@/store/EditalRegister";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function ConsultantTable() {
  const { Consultores, Qualificacao } = useEditalStore();
  const [showConsultores, setShowConsultores] = useState(true);
  const [openAreas, setOpenAreas] = useState<Record<string, boolean>>({});
  const [consultores, setConsultores] = useState(Consultores);
  const [qualificacao, setQualificacao] = useState(Qualificacao);

  useEffect(() => {
    setConsultores(Consultores);
    setQualificacao(Qualificacao);
  }, [Consultores, Qualificacao]);

  const toggleArea = (areaId: string) => {
    setOpenAreas((prev) => ({ ...prev, [areaId]: !prev[areaId] }));
  };

  const getConsultores = (memberId?: string): ConsultantRowDisplay[] => {
    if (memberId) {
      const member = consultores.find((member) => member.id === memberId);
      return member ? [{ ...member, email: member.email.email }] : [];
    }
    return consultores.map((consultant) => ({
      ...consultant,
      email: consultant.email.email,
    }));
  };

  return (
    <section className="w-full">
      <h2 className="text-2xl font-bold text-center my-10">Consultores</h2>

      <Button
        className="block mx-auto my-5 p-2 text-center w-2/5"
        onClick={() => setShowConsultores(!showConsultores)}
      >
        {showConsultores ? "Áreas" : "Detalhes dos Consultores"}
      </Button>

      <div className="flex justify-center">
        {showConsultores ? (
          <DataTable columns={columns} data={getConsultores()} />
        ) : (
          <div className="w-full max-w-2xl">
            {qualificacao.map((area) => (
              <Collapsible
                key={area.areaId}
                open={openAreas[area.areaId] || false}
                className="border border-gray-200 rounded-lg mb-3 overflow-hidden transition-all duration-500 ease-in-out"
              >
                <CollapsibleTrigger
                  onClick={() => toggleArea(area.areaId)}
                  className="flex justify-between items-center w-full px-4 py-2 bg-gray-100 rounded-lg"
                >
                  <span className="font-semibold">{area.name}</span>
                  <ChevronsUpDown className="w-5 h-5" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 py-2 transition-opacity duration-500 ease-in-out">
                  <ul className="list-disc list-inside">
                    {area.Consultores.length > 0 ? (
                      area.Consultores.filter((c) =>
                        consultores.some((consultor) => consultor.id === c.id)
                      ).map((consultor) => (
                        <li key={consultor.id} className="py-1">
                          {consultor.nome} - {consultor.email.email}
                        </li>
                      ))
                    ) : (
                      <h3 className="font-lg text-center">
                        Nenhum Consultor ainda foi inserido nessa área. Favor
                        Cadastrar!
                      </h3>
                    )}
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
