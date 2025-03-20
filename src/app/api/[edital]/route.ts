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

        const foundEditalLocalidades = await prisma.sCLocalidade.findMany({
            where: {
                SCEdital: parseInt(edital),
            }
        })

        const editalAreaParameters = await prisma.$queryRaw`SELECT * FROM vw_nivel_edital WHERE SCEdital = ${edital}`;

        const serializedEditalLocalidades = JSON.parse(
            JSON.stringify(foundEditalLocalidades, (_, value) =>
                typeof value === "bigint" ? value.toString() : value
            )
        );

        const serializedEditalParameters = JSON.parse(
            JSON.stringify(editalAreaParameters, (_, value) =>
                typeof value === "bigint" ? value.toString() : value
            )
        );


        const foundEditalAttachments = await prisma.anexo.findMany({
            where: {
                SCEdital: parseInt(edital),
            },
        });

        const foundEdital = await prisma.sCEdital.findUnique({
            where: {
                idSCEdital: parseInt(edital),
            },
        });

        const serializedFoundEdital = JSON.parse(
            JSON.stringify(foundEdital, (_, value) =>
                typeof value === "bigint" ? value.toString() : value
            )
        );

        const foundEditalDocuments = await prisma.sCDocumentacao.findMany({
            where: {
                SCEdital: parseInt(edital),
            },
        })

        const editalDocCategories = await prisma.sCCategoriaDocumento.findMany({});

        const serializedEditalDocCategorias = JSON.parse(
            JSON.stringify(editalDocCategories, (_, value) =>
                typeof value === "bigint" ? value.toString() : value
            )
        );

        if (!foundEdital) {
            return NextResponse.json({ message: "Nenhum edital com este ID foi encontrado" }, { status: 404 });
        }

        const serializedEdital = JSON.parse(
            JSON.stringify(foundEdital, (_, value) =>
                typeof value === "bigint" ? value.toString() : value
            )
        );

        const serializedEditalAttachments = JSON.parse(
            JSON.stringify(foundEditalAttachments, (_, value) =>
                typeof value === "bigint" ? value.toString() : value
            )
        );
        const serializedEditalHistory = JSON.parse(
            JSON.stringify(foundEditalHistory, (_, value) =>
                typeof value === "bigint" ? value.toString() : value
            )
        );

        const serializedEditalDocuments = JSON.parse(
            JSON.stringify(foundEditalDocuments, (_, value) => typeof value === "bigint" ? value.toString() : value)
        )

        return NextResponse.json({ serializedEdital, serializedEditalHistory, serializedEditalAttachments, serializedEditalDocuments, serializedEditalDocCategorias, serializedEditalParameters, serializedEditalLocalidades, serializedFoundEdital });

    } catch (error: any) {
        console.error("Error fetching data:", error);
        return NextResponse.json(
            { error: `Failed to fetch data: ${error.message}` },
            { status: 500 }
        );
    }
}