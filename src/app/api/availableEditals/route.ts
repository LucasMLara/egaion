
import prisma from "@/db";

import { NextResponse } from "next/server";

export async function GET() {
    try {
        const editais = await prisma.sCCredenciadasEdital.findMany();
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
