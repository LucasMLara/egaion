import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ConsultantRowDisplay } from "@/types/types";
import { useEditalStore } from "@/store/EditalRegister";

export function getData(memberId?: string): ConsultantRowDisplay[] {
  const { Consultores } = useEditalStore.getState();

  if (memberId) {
    const member = Consultores.find((member) => member.id === memberId);
    return member ? [{ ...member, email: member.email.email }] : [];
  }
  return Consultores.map((consultant) => ({
    ...consultant,
    email: consultant.email.email,
  }));
}

export default function ConsultantTable() {
  const data = getData();

  return (
    <section className="flex flex-wrap flex-col gap-6 justify-center place-content-center">
      <h1 className="text-2xl font-bold text-neutral-700 text-center m-9">
        Equipe Técnica{" "}
      </h1>
      <div className="m-auto">
        <h1 className="text-xl font-bold">Para alterar:</h1>
        <ol>
          {/* <li>
            no team/id. colocar os documentos COMUNS inseridos junto com os
            dados cadastrados.
          </li> */}
          <li>
            Alterar Consultores para que fiquem numa tabela separada , vinculada
            a cada area
          </li>
          <li>
            preciso mexer no editalstorage na tipagem de qualificacao para
            remover os consultores de la e por em relaçao ao ID da area da
            qualificacao
          </li>
        </ol>
      </div>
      <div className="flex w-flex-wrap gap-6 place-content-center w-full">
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  );
}
