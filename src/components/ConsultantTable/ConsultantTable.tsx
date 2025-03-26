import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ConsultantRowDisplay } from "@/types/types";
import { useEditalStore } from "@/store/EditalRegister";
import { useState } from "react";
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

  const toggleArea = (areaId: string) => {
    setOpenAreas((prev) => ({ ...prev, [areaId]: !prev[areaId] }));
  };

  const getConsultores = (memberId?: string): ConsultantRowDisplay[] => {
    if (memberId) {
      const member = Consultores.find((member) => member.id === memberId);
      return member ? [{ ...member, email: member.email.email }] : [];
    }
    return Consultores.map((consultant) => ({
      ...consultant,
      email: consultant.email.email,
    }));
  };

  return (
    <section className="w-full">
      <h2 className="text-2xl font-bold text-center my-10">Consultores</h2>

      <Button
        className="block mx-auto my-5 p-2 text-center w-2/5"
        onClick={() => {
          console.log("Consultores", Consultores);
          console.log("Qualificacao", Qualificacao);
          setShowConsultores(!showConsultores);
        }}
      >
        {showConsultores ? "Áreas" : "Detalhes dos Consultores"}
      </Button>

      <div className="flex justify-center">
        {showConsultores ? (
          <DataTable columns={columns} data={getConsultores()} />
        ) : (
          <div className="w-full max-w-2xl">
            {Qualificacao.map((area) => (
              <Collapsible
                key={area.areaId}
                open={openAreas[area.areaId] || false}
                className="rounded-lg mb-3"
              >
                <CollapsibleTrigger
                  onClick={() => toggleArea(area.areaId)}
                  className="flex justify-between items-center w-full px-4 py-2 bg-neutral-400 rounded-lg"
                >
                  <span className="font-semibold">{area.name}</span>
                  <ChevronsUpDown className="size-5 hover:shadow-lg transition-all" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 py-2 bg-neutral-500 rounded-lg">
                  <ul className="list-disc list-inside">
                    {area.Consultores.map((consultor) => (
                      <li key={consultor.id} className="py-1">
                        {consultor.nome} - {consultor.email.email}
                      </li>
                    ))}
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
