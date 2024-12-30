import prisma from "@/db";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { edital: string } }) {
    const { edital } = params;

    try {
        if (!edital || isNaN(Number(edital))) {
            return NextResponse.json({ error: "ID do edital inválido ou Inexistente" }, { status: 400 });
        }

        const foundEditalHistory = await prisma.historico.findMany({
            where: {
                SCEdital: parseInt(edital),
            },
        });

        const foundEdital = await prisma.sCEdital.findUnique({
            where: {
                idSCEdital: parseInt(edital),
            },
        });

        if (!foundEdital) {
            return NextResponse.json({ message: "Nenhum edital com este ID foi encontrado" }, { status: 404 });
        }

        const serializedEdital = JSON.parse(
            JSON.stringify(foundEdital, (_, value) =>
                typeof value === "bigint" ? value.toString() : value
            )
        );

        const serializedEditalHistory = JSON.parse(
            JSON.stringify(foundEditalHistory, (_, value) =>
                typeof value === "bigint" ? value.toString() : value
            )
        );

        return NextResponse.json({serializedEdital, serializedEditalHistory });

    } catch (error: any) {
        console.error("Error fetching data:", error);
        return NextResponse.json(
            { error: `Failed to fetch data: ${error.message}` },
            { status: 500 }
        );
    }
}