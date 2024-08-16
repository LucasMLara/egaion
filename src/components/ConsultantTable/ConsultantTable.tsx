import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ConsultantRowDisplay } from "@/types/types";

export async function getData(
  memberId?: string
): Promise<ConsultantRowDisplay[]> {
  const consultant: ConsultantRowDisplay[] = [
    {
      id: "728ed52f",
      email: "m@example.com",
      nome: "Carlos Silva",
      CPF: "12345678901",
      contato: "91987654321",
    },
    {
      id: "a1b2c3d4",
      email: "john.doe@example.com",
      nome: "João Oliveira",
      CPF: "23456789012",
      contato: "92987654321",
    },
    {
      id: "e5f6g7h8",
      email: "jane.smith@example.com",
      nome: "Maria Santos",
      CPF: "34567890123",
      contato: "93987654321",
    },
    {
      id: "i9j0k1l2",
      email: "peter.parker@example.com",
      nome: "Pedro Costa",
      CPF: "45678901234",
      contato: "94987654321",
    },
    {
      id: "m3n4o5p6",
      email: "bruce.wayne@example.com",
      nome: "Bruno Souza",
      CPF: "56789012345",
      contato: "95987654321",
    },
    {
      id: "q7r8s9t0",
      email: "clark.kent@example.com",
      nome: "Carlos Ferreira",
      CPF: "67890123456",
      contato: "96987654321",
    },
    {
      id: "u1v2w3x4",
      email: "diana.prince@example.com",
      nome: "Diana Pereira",
      CPF: "78901234567",
      contato: "97987654321",
    },
    {
      id: "y5z6a7b8",
      email: "barry.allen@example.com",
      nome: "Breno Almeida",
      CPF: "89012345678",
      contato: "98987654321",
    },
    {
      id: "c9d0e1f2",
      email: "hal.jordan@example.com",
      nome: "Henrique Lima",
      CPF: "90123456789",
      contato: "99987654321",
    },
    {
      id: "g3h4i5j6",
      email: "arthur.curry@example.com",
      nome: "Artur Rodrigues",
      CPF: "01234567890",
      contato: "90987654321",
    },
    {
      id: "k7l8m9n0",
      email: "victor.stone@example.com",
      nome: "Vitor Gomes",
      CPF: "12345098765",
      contato: "91876543210",
    },
    {
      id: "o1p2q3r4",
      email: "oliver.queen@example.com",
      nome: "Olavo Marques",
      CPF: "23456109876",
      contato: "92876543210",
    },
    {
      id: "s5t6u7v8",
      email: "kara.danvers@example.com",
      nome: "Karla Fernandes",
      CPF: "34567210987",
      contato: "93876543210",
    },
    {
      id: "w9x0y1z2",
      email: "lois.lane@example.com",
      nome: "Lúcia Silva",
      CPF: "45678321098",
      contato: "94876543210",
    },
    {
      id: "a3b4c5d6",
      email: "jimmy.olsen@example.com",
      nome: "Jaime Ribeiro",
      CPF: "56789432109",
      contato: "95876543210",
    },
    {
      id: "e7f8g9h0",
      email: "perry.white@example.com",
      nome: "Pedro Branco",
      CPF: "67890543210",
      contato: "96876543210",
    },
    {
      id: "i1j2k3l4",
      email: "lex.luthor@example.com",
      nome: "Alex Lima",
      CPF: "78901654321",
      contato: "97876543210",
    },
    {
      id: "m5n6o7p8",
      email: "selina.kyle@example.com",
      nome: "Célia Alves",
      CPF: "89012765432",
      contato: "98876543210",
    },
    {
      id: "q9r0s1t2",
      email: "harley.quinn@example.com",
      nome: "Helena Martins",
      CPF: "90123876543",
      contato: "99876543210",
    },
    {
      id: "u3v4w5x6",
      email: "eddie.brock@example.com",
      nome: "Eduardo Rocha",
      CPF: "01234987654",
      contato: "90876543210",
    },
    {
      id: "y7z8a9b0",
      email: "ben.parker@example.com",
      nome: "Bernardo Sousa",
      CPF: "12346098765",
      contato: "91987654320",
    },
    {
      id: "c1d2e3f4",
      email: "mary.jane@example.com",
      nome: "Mariana Carvalho",
      CPF: "23457109876",
      contato: "92987654320",
    },
    {
      id: "g5h6i7j8",
      email: "may.parker@example.com",
      nome: "Márcia Dias",
      CPF: "34568210987",
      contato: "93987654320",
    },
    {
      id: "k9l0m1n2",
      email: "felicia.hardy@example.com",
      nome: "Felícia Cardoso",
      CPF: "45679321098",
      contato: "94987654320",
    },
    {
      id: "o3p4q5r6",
      email: "norman.osborn@example.com",
      nome: "Norberto Pires",
      CPF: "56780432109",
      contato: "95987654320",
    },
    {
      id: "s7t8u9v0",
      email: "gwen.stacy@example.com",
      nome: "Gisele Nunes",
      CPF: "67891543210",
      contato: "96987654320",
    },
    {
      id: "w1x2y3z4",
      email: "john.jameson@example.com",
      nome: "João Teixeira",
      CPF: "78902654321",
      contato: "97987654320",
    },
    {
      id: "a5b6c7d8",
      email: "flash.thompson@example.com",
      nome: "Fábio Araújo",
      CPF: "89013765432",
      contato: "98987654320",
    },
    {
      id: "e9f0g1h2",
      email: "liz.allan@example.com",
      nome: "Lívia Costa",
      CPF: "90124876543",
      contato: "99987654320",
    },
    {
      id: "i3j4k5l6",
      email: "betty.brant@example.com",
      nome: "Beatriz Figueiredo",
      CPF: "01235987654",
      contato: "90987654320",
    },
    {
      id: "m7n8o9p0",
      email: "ned.leeds@example.com",
      nome: "Nestor Guimarães",
      CPF: "12347098765",
      contato: "91876543211",
    },
    {
      id: "q1r2s3t4",
      email: "debra.whitman@example.com",
      nome: "Débora Medeiros",
      CPF: "23458109876",
      contato: "92876543211",
    },
    {
      id: "u5v6w7x8",
      email: "glory.grant@example.com",
      nome: "Glória Farias",
      CPF: "34569210987",
      contato: "93876543211",
    },
    {
      id: "y9z0a1b2",
      email: "jor-el@example.com",
      nome: "Jorge Esteves",
      CPF: "45670321098",
      contato: "94876543211",
    },
    {
      id: "c3d4e5f6",
      email: "lara.lor-van@example.com",
      nome: "Laura Neves",
      CPF: "56781432109",
      contato: "95876543211",
    },
    {
      id: "g7h8i9j0",
      email: "jon.kent@example.com",
      nome: "Jonas Freitas",
      CPF: "67892543210",
      contato: "96876543211",
    },
    {
      id: "k1l2m3n4",
      email: "connor.kent@example.com",
      nome: "Conrado Ribeiro",
      CPF: "78903654321",
      contato: "97876543211",
    },
    {
      id: "o5p6q7r8",
      email: "lois.lane@example.com",
      nome: "Lúcia Silva",
      CPF: "89014765432",
      contato: "98876543211",
    },
    {
      id: "s9t0u1v2",
      email: "jim.gordon@example.com",
      nome: "Jaime Moreira",
      CPF: "90125876543",
      contato: "99876543211",
    },
    {
      id: "w3x4y5z6",
      email: "lucius.fox@example.com",
      nome: "Lúcio Moreira",
      CPF: "01236987654",
      contato: "90876543211",
    },
  ];
  if (memberId) {
    const member = consultant.find((member) => member.id === memberId);
    return member ? [member] : [];
  }
  return consultant;
}

export default async function ConsultantTable() {
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
