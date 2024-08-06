import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ITeamMember } from "@/types/types";

export async function getData(memberId?: string): Promise<ITeamMember[]> {
  const teamMember: ITeamMember[] = [
    {
      id: "728ed52f",
      contact: 1234567890,
      docNumber: "12345678901",
      status: "OK",
      email: "m@example.com",
    },
    {
      id: "a1b2c3d4",
      contact: 2345678901,
      docNumber: "23456789012",
      status: "OK",
      email: "john.doe@example.com",
    },
    {
      id: "e5f6g7h8",
      contact: 3456789012,
      docNumber: "34567890123",
      status: "Documento Reprovado",
      email: "jane.smith@example.com",
    },
    {
      id: "i9j0k1l2",
      contact: 4567890123,
      docNumber: "45678901234",
      status: "Documento Pendente",
      email: "peter.parker@example.com",
    },
    {
      id: "m3n4o5p6",
      contact: 5678901234,
      docNumber: "56789012345",
      status: "OK",
      email: "bruce.wayne@example.com",
    },
    {
      id: "q7r8s9t0",
      contact: 6789012345,
      docNumber: "67890123456",
      status: "Documento Pendente",
      email: "clark.kent@example.com",
    },
    {
      id: "u1v2w3x4",
      contact: 7890123456,
      docNumber: "78901234567",
      status: "Documento Reprovado",
      email: "diana.prince@example.com",
    },
    {
      id: "y5z6a7b8",
      contact: 8901234567,
      docNumber: "89012345678",
      status: "OK",
      email: "barry.allen@example.com",
    },
    {
      id: "c9d0e1f2",
      contact: 9012345678,
      docNumber: "90123456789",
      status: "Documento Pendente",
      email: "hal.jordan@example.com",
    },
    {
      id: "g3h4i5j6",
      contact: 1123456789,
      docNumber: "01234567890",
      status: "OK",
      email: "arthur.curry@example.com",
    },
    {
      id: "k7l8m9n0",
      contact: 2234567890,
      docNumber: "12345678901",
      status: "Documento Reprovado",
      email: "victor.stone@example.com",
    },
    {
      id: "o1p2q3r4",
      contact: 3345678901,
      docNumber: "23456789012",
      status: "Documento Pendente",
      email: "oliver.queen@example.com",
    },
    {
      id: "s5t6u7v8",
      contact: 4456789012,
      docNumber: "34567890123",
      status: "OK",
      email: "kara.danvers@example.com",
    },
    {
      id: "w9x0y1z2",
      contact: 5567890123,
      docNumber: "45678901234",
      status: "Documento Pendente",
      email: "lois.lane@example.com",
    },
    {
      id: "a3b4c5d6",
      contact: 6678901234,
      docNumber: "56789012345",
      status: "Documento Reprovado",
      email: "jimmy.olsen@example.com",
    },
    {
      id: "e7f8g9h0",
      contact: 7789012345,
      docNumber: "67890123456",
      status: "OK",
      email: "perry.white@example.com",
    },
    {
      id: "i1j2k3l4",
      contact: 8890123456,
      docNumber: "78901234567",
      status: "Documento Pendente",
      email: "lex.luthor@example.com",
    },
    {
      id: "m5n6o7p8",
      contact: 9901234567,
      docNumber: "89012345678",
      status: "OK",
      email: "selina.kyle@example.com",
    },
    {
      id: "q9r0s1t2",
      contact: 1012345678,
      docNumber: "90123456789",
      status: "Documento Pendente",
      email: "harley.quinn@example.com",
    },
    {
      id: "u3v4w5x6",
      contact: 1123456789,
      docNumber: "01234567890",
      status: "Documento Reprovado",
      email: "eddie.brock@example.com",
    },
    {
      id: "y7z8a9b0",
      contact: 1234567890,
      docNumber: "12345678901",
      status: "OK",
      email: "ben.parker@example.com",
    },
    {
      id: "c1d2e3f4",
      contact: 2345678901,
      docNumber: "23456789012",
      status: "Documento Pendente",
      email: "mary.jane@example.com",
    },
    {
      id: "g5h6i7j8",
      contact: 3456789012,
      docNumber: "34567890123",
      status: "Documento Reprovado",
      email: "may.parker@example.com",
    },
    {
      id: "k9l0m1n2",
      contact: 4567890123,
      docNumber: "45678901234",
      status: "OK",
      email: "felicia.hardy@example.com",
    },
    {
      id: "o3p4q5r6",
      contact: 5678901234,
      docNumber: "56789012345",
      status: "Documento Pendente",
      email: "norman.osborn@example.com",
    },
    {
      id: "s7t8u9v0",
      contact: 6789012345,
      docNumber: "67890123456",
      status: "Documento Reprovado",
      email: "gwen.stacy@example.com",
    },
    {
      id: "w1x2y3z4",
      contact: 7890123456,
      docNumber: "78901234567",
      status: "OK",
      email: "john.jameson@example.com",
    },
    {
      id: "a5b6c7d8",
      contact: 8901234567,
      docNumber: "89012345678",
      status: "Documento Pendente",
      email: "flash.thompson@example.com",
    },
    {
      id: "e9f0g1h2",
      contact: 9012345678,
      docNumber: "90123456789",
      status: "Documento Reprovado",
      email: "liz.allan@example.com",
    },
    {
      id: "i3j4k5l6",
      contact: 1123456789,
      docNumber: "01234567890",
      status: "OK",
      email: "betty.brant@example.com",
    },
    {
      id: "m7n8o9p0",
      contact: 2234567890,
      docNumber: "12345678901",
      status: "Documento Pendente",
      email: "ned.leeds@example.com",
    },
    {
      id: "q1r2s3t4",
      contact: 3345678901,
      docNumber: "23456789012",
      status: "Documento Reprovado",
      email: "debra.whitman@example.com",
    },
    {
      id: "u5v6w7x8",
      contact: 4456789012,
      docNumber: "34567890123",
      status: "OK",
      email: "glory.grant@example.com",
    },
    {
      id: "y9z0a1b2",
      contact: 5567890123,
      docNumber: "45678901234",
      status: "Documento Pendente",
      email: "jor-el@example.com",
    },
    {
      id: "c3d4e5f6",
      contact: 6678901234,
      docNumber: "56789012345",
      status: "Documento Reprovado",
      email: "lara.lor-van@example.com",
    },
    {
      id: "g7h8i9j0",
      contact: 7789012345,
      docNumber: "67890123456",
      status: "OK",
      email: "jon.kent@example.com",
    },
    {
      id: "k1l2m3n4",
      contact: 8890123456,
      docNumber: "78901234567",
      status: "Documento Pendente",
      email: "connor.kent@example.com",
    },
    {
      id: "o5p6q7r8",
      contact: 9901234567,
      docNumber: "89012345678",
      status: "Documento Reprovado",
      email: "lois.lane@example.com",
    },
    {
      id: "s9t0u1v2",
      contact: 1012345678,
      docNumber: "90123456789",
      status: "OK",
      email: "jim.gordon@example.com",
    },
    {
      id: "w3x4y5z6",
      contact: 1123456789,
      docNumber: "01234567890",
      status: "Documento Pendente",
      email: "lucius.fox@example.com",
    },
  ];

  if (memberId) {
    const member = teamMember.find((member) => member.id === memberId);
    return member ? [member] : [];
  }
  return teamMember;
}

export default async function Team() {
  const data = await getData();

  return (
    <section className="flex flex-wrap flex-col gap-6 justify-center place-content-center">
      <h1 className="text-2xl font-bold text-neutral-700 text-center m-9">
        Equipe Técnica{" "}
      </h1>
      <div className="flex w-flex-wrap gap-6 place-content-center w-full">
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  );
}
