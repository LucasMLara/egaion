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
    <section className="w-full">
      <h2 className="text-2xl font-bold text-center my-10">Consultores</h2>
      <div className=" flex justify-center">
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  );
}
