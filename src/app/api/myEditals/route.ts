import { auth } from "@/auth";
import prisma from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();

    if (!session || !session.user?.idSCCredenciada) {
      return NextResponse.json(
        { error: "Usuario não autenticado" },
        { status: 401 }
      );
    }

    const userId = session.user.idSCCredenciada;

    const editais: Array<{ [key: string]: any }> = await prisma.$queryRaw`
    SELECT 
      sce.idSCCredenciadasEdital,
      sce.SCEdital,
      sce.StatusCadastro,
      sce.JustificativaNaoAprovacao,
      se.NomeEdital,
      se.InicioEdital,
      se.FimEdital,
      se.Status
    FROM sCCredenciadasEdital sce
    JOIN sCEdital se ON sce.SCEdital = se.idSCEdital
    WHERE sce.Credenciada = ${BigInt(userId)}
  `;

    const sanitizedEditais = editais.map((edital) =>
      Object.fromEntries(
        Object.entries(edital).map(([key, value]) => [
          key,
          typeof value === "bigint" ? value.toString() : value,
        ])
      )
    );

    return NextResponse.json({ meusEditais: sanitizedEditais });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
