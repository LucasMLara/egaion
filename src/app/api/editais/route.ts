
import prisma from "@/db";

import { NextResponse } from "next/server";

export async function GET() {
    try {

        const editais: Array<{ [key: string]: any }> = await prisma.$queryRaw`
        SELECT 
            se.idSCEdital,
            se.NomeEdital,
            se.Objetivos,
            se.ResumoEdital,
            format(se.InicioEdital, 'dd/MM/yyyy') as InicioEdital,
            format(se.FimEdital, 'dd/MM/yyyy') as FimEdital,
            stc.Descricao as TipodeCredenciamento,
            se.Status as Status
        FROM sCEdital se
        JOIN SCTipoCredenciame stc ON se.TipodeCredenciamento = stc.idSCTipoCredenciame
        `;


        const sanitizedEditais = editais.map((edital) =>
            Object.fromEntries(
                Object.entries(edital).map(([key, value]) => [
                    key,
                    typeof value === "bigint" ? value.toString() : value,
                ])
            )
        );
        return NextResponse.json({ editais: sanitizedEditais });
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json(
            { error: "Failed to fetch data" },
            { status: 500 }
        );
    }
}
