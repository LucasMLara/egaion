
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

        const editais = await prisma.sCCredenciadasEdital.findMany({
            where: {
                Credenciada: BigInt(userId)
            },
        });


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
