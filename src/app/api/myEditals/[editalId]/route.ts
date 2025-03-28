import { auth } from "@/auth";
import prisma from "@/db";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { editalId: string } }) {
    const { editalId } = params;
    try {

        const session = await auth();

        if (!session || !session.user?.idSCCredenciada) {
            return NextResponse.json(
                { error: "Usuario não autenticado" },
                { status: 401 }
            );
        }

        // const userId = session.user.idSCCredenciada;

        const dadosDosDocumentos: Array<{ [key: string]: any }> = await prisma.$queryRaw`
                SELECT sdc.DadosDocumento, scd.Nome FROM SCDocCredenciadaEdital sdc 
                INNER JOIN SCDocumentacao scd 
                ON scd.idSCDocumentacao = sdc.DadosDocumento
                WHERE Aprovado IS NULL
                AND SCCredenciadasEdital =  ${BigInt(editalId)}
            `;


        const dadosDosMeusDocumentosSanitizados = dadosDosDocumentos.map((edital) =>
            Object.fromEntries(
                Object.entries(edital).map(([key, value]) => [
                    key,
                    typeof value === "bigint" ? value.toString() : value,
                ])
            )
        );

        const dadosQualificacaoTecnica: Array<{ [key: string]: any }> = await prisma.$queryRaw`
                SELECT * FROM SCParametrizacaoEdital
                where SCCredenciadasEdital = ${BigInt(editalId)}
                `
            ;

        const dadosQualificacaoTecnicaSanitizados = dadosQualificacaoTecnica.map((edital) =>
            Object.fromEntries(
                Object.entries(edital).map(([key, value]) => [
                    key,
                    typeof value === "bigint" ? value.toString() : value,
                ])
            )
        );

        const documentosConsultores: Array<{ [key: string]: any }> = await prisma.$queryRaw`
                SELECT * FROM SCConsultorEdital sce 
                inner join SCTecnico st 
                on st.idSCTecnico = sce.SCTecnico
                where SCCredenciadasEdital = ${BigInt(editalId)}
                `;

        const documentosConsultoresSanitizados = documentosConsultores.map((edital) =>
            Object.fromEntries(
                Object.entries(edital).map(([key, value]) => [
                    key,
                    typeof value === "bigint" ? value.toString() : value,
                ])
            )
        );

        const docsParametrizacaoConsultores: Array<{ [key: string]: any }> = await prisma.$queryRaw`
                select sn.* from SCConsultorNivel sn 
                inner join SCConsultorEdital sce 
                on sce.idSCConsultorEdital = sn.SCConsultorEdital
                inner join SCTecnico st 
                on st.idSCTecnico = sce.SCTecnico
                where SCCredenciadasEdital = 1645
        `;

        const docsParametrizacaoConsultoresSanitizados = docsParametrizacaoConsultores.map((edital) =>
            Object.fromEntries(
                Object.entries(edital).map(([key, value]) => [
                    key,
                    typeof value === "bigint" ? value.toString() : value,
                ])
            )
        );

        return NextResponse.json({ dadosDosMeusDocumentosSanitizados, dadosQualificacaoTecnicaSanitizados, documentosConsultoresSanitizados, docsParametrizacaoConsultoresSanitizados });
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json(
            { error: "Failed to fetch data" },
            { status: 500 }
        );
    }
}
