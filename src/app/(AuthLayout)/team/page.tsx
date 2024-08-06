import { Payment, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

export async function getData(memberId?: string): Promise<Payment[]> {
  memberId ? console.log(memberId) : null;

  const teamMember: Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "a1b2c3d4",
      amount: 200,
      status: "success",
      email: "john.doe@example.com",
    },
    {
      id: "e5f6g7h8",
      amount: 150,
      status: "failed",
      email: "jane.smith@example.com",
    },
    {
      id: "i9j0k1l2",
      amount: 250,
      status: "pending",
      email: "peter.parker@example.com",
    },
    {
      id: "m3n4o5p6",
      amount: 300,
      status: "success",
      email: "bruce.wayne@example.com",
    },
    {
      id: "q7r8s9t0",
      amount: 400,
      status: "pending",
      email: "clark.kent@example.com",
    },
    {
      id: "u1v2w3x4",
      amount: 500,
      status: "failed",
      email: "diana.prince@example.com",
    },
    {
      id: "y5z6a7b8",
      amount: 600,
      status: "success",
      email: "barry.allen@example.com",
    },
    {
      id: "c9d0e1f2",
      amount: 700,
      status: "pending",
      email: "hal.jordan@example.com",
    },
    {
      id: "g3h4i5j6",
      amount: 800,
      status: "success",
      email: "arthur.curry@example.com",
    },
    {
      id: "k7l8m9n0",
      amount: 900,
      status: "failed",
      email: "victor.stone@example.com",
    },
    {
      id: "o1p2q3r4",
      amount: 1000,
      status: "pending",
      email: "oliver.queen@example.com",
    },
    {
      id: "s5t6u7v8",
      amount: 1100,
      status: "success",
      email: "kara.danvers@example.com",
    },
    {
      id: "w9x0y1z2",
      amount: 1200,
      status: "pending",
      email: "lois.lane@example.com",
    },
    {
      id: "a3b4c5d6",
      amount: 1300,
      status: "failed",
      email: "jimmy.olsen@example.com",
    },
    {
      id: "e7f8g9h0",
      amount: 1400,
      status: "success",
      email: "perry.white@example.com",
    },
    {
      id: "i1j2k3l4",
      amount: 1500,
      status: "pending",
      email: "lex.luthor@example.com",
    },
    {
      id: "m5n6o7p8",
      amount: 1600,
      status: "success",
      email: "selina.kyle@example.com",
    },
    {
      id: "q9r0s1t2",
      amount: 1700,
      status: "pending",
      email: "harley.quinn@example.com",
    },
    {
      id: "u3v4w5x6",
      amount: 1800,
      status: "failed",
      email: "eddie.brock@example.com",
    },
    {
      id: "y7z8a9b0",
      amount: 1900,
      status: "success",
      email: "ben.parker@example.com",
    },
    {
      id: "c1d2e3f4",
      amount: 2000,
      status: "pending",
      email: "mary.jane@example.com",
    },
    {
      id: "g5h6i7j8",
      amount: 2100,
      status: "failed",
      email: "may.parker@example.com",
    },
    {
      id: "k9l0m1n2",
      amount: 2200,
      status: "success",
      email: "felicia.hardy@example.com",
    },
    {
      id: "o3p4q5r6",
      amount: 2300,
      status: "pending",
      email: "norman.osborn@example.com",
    },
    {
      id: "s7t8u9v0",
      amount: 2400,
      status: "failed",
      email: "gwen.stacy@example.com",
    },
    {
      id: "w1x2y3z4",
      amount: 2500,
      status: "success",
      email: "john.jameson@example.com",
    },
    {
      id: "a5b6c7d8",
      amount: 2600,
      status: "pending",
      email: "flash.thompson@example.com",
    },
    {
      id: "e9f0g1h2",
      amount: 2700,
      status: "failed",
      email: "liz.allan@example.com",
    },
    {
      id: "i3j4k5l6",
      amount: 2800,
      status: "success",
      email: "betty.brant@example.com",
    },
    {
      id: "m7n8o9p0",
      amount: 2900,
      status: "pending",
      email: "ned.leeds@example.com",
    },
    {
      id: "q1r2s3t4",
      amount: 3000,
      status: "failed",
      email: "debra.whitman@example.com",
    },
    {
      id: "u5v6w7x8",
      amount: 3100,
      status: "success",
      email: "glory.grant@example.com",
    },
    {
      id: "y9z0a1b2",
      amount: 3200,
      status: "pending",
      email: "jor-el@example.com",
    },
    {
      id: "c3d4e5f6",
      amount: 3300,
      status: "failed",
      email: "lara.lor-van@example.com",
    },
    {
      id: "g7h8i9j0",
      amount: 3400,
      status: "success",
      email: "jon.kent@example.com",
    },
    {
      id: "k1l2m3n4",
      amount: 3500,
      status: "pending",
      email: "connor.kent@example.com",
    },
    {
      id: "o5p6q7r8",
      amount: 3600,
      status: "failed",
      email: "lois.lane@example.com",
    },
    {
      id: "s9t0u1v2",
      amount: 3700,
      status: "success",
      email: "jim.gordon@example.com",
    },
    {
      id: "w3x4y5z6",
      amount: 3800,
      status: "pending",
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
