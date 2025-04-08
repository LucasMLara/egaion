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

        const dadosDosDocumentos: Array<{ [key: string]: any }> = await prisma.$queryRaw`
            SELECT ce.idSCCredenciadasEdital,  e.idSCEdital,e.NomeEdital,
            c.idSCCredenciada,c.RazaoSocial, dce.Aprovado, d.Nome
            FROM SCCredenciadasEdital ce
            INNER JOIN SCDocCredenciadaEdital dce ON dce.SCCredenciadasEdital = ce.idSCCredenciadasEdital
            INNER JOIN SCDocumentacao d ON d.idSCDocumentacao = dce.DadosDocumento
            INNER JOIN SCCredenciada c ON c.idSCCredenciada = ce.Credenciada
            INNER JOIN SCEdital e ON e.idSCEdital = ce.SCEdital
            WHERE SCCredenciadasEdital = ${BigInt(editalId)}
            AND dce.Aprovado = 0
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
                SELECT ce.idSCCredenciadasEdital,  e.idSCEdital,e.NomeEdital,
                c.idSCCredenciada,c.RazaoSocial, pe.Parametrizacao,pe.ApvAtestadoCapacidadeTec as "Atestado de Capacidade Técnica", pe.ApvRelatoExperiencia as "Relato de Experiência"
                FROM SCCredenciadasEdital ce
                INNER JOIN SCParametrizacaoEdital pe ON pe.SCCredenciadasEdital = ce.idSCCredenciadasEdital
                INNER JOIN SCCredenciada c ON c.idSCCredenciada = ce.Credenciada
                INNER JOIN SCEdital e ON e.idSCEdital = ce.SCEdital
                WHERE SCCredenciadasEdital = ${BigInt(editalId)}
                AND (
                    pe.ApvAtestadoCapacidadeTec = 0 OR 
                    pe.ApvRelatoExperiencia = 0 OR 
                    pe.ApvAtestadoCapacidadeTec IS NOT NULL OR 
                    pe.ApvRelatoExperiencia IS NOT NULL
                    )
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
                SELECT ce.idSCCredenciadasEdital,  e.idSCEdital,e.NomeEdital,
                c.idSCCredenciada,c.RazaoSocial, cce.idSCConsultorEdital, t.idSCTecnico, t.Nome, t.CPF,
                t.ApvCompFormacaoAcademica, t.ApvComprovanteVinculoPJ, t.ApvDocumentosPessoais , t.ApvRegistroProfissional
                FROM SCCredenciadasEdital ce
                INNER JOIN SCConsultorEdital cce ON cce.SCCredenciadasEdital = ce.idSCCredenciadasEdital
                INNER JOIN SCTecnico t ON t.idSCTecnico = cce.SCTecnico
                INNER JOIN SCCredenciada c ON c.idSCCredenciada = ce.Credenciada
                INNER JOIN SCEdital e ON e.idSCEdital = ce.SCEdital
                WHERE SCCredenciadasEdital = ${BigInt(editalId)}
                AND (t.ApvCompFormacaoAcademica = 0 OR t.ApvComprovanteVinculoPJ = 0 OR t.ApvDocumentosPessoais = 0 OR t.ApvRegistroProfissional = 0)
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
        SELECT ce.idSCCredenciadasEdital,  e.idSCEdital,e.NomeEdital,
        c.idSCCredenciada,c.RazaoSocial, cce.idSCConsultorEdital, t.idSCTecnico,t.Nome, t.CPF,
        ccn.Parametrizacao,ccn.Aprovado
        FROM SCCredenciadasEdital ce
        INNER JOIN SCConsultorEdital cce ON cce.SCCredenciadasEdital = ce.idSCCredenciadasEdital
        INNER JOIN SCConsultorNivel ccn ON ccn.SCConsultorEdital = cce.idSCConsultorEdital
        INNER JOIN SCTecnico t ON t.idSCTecnico = cce.SCTecnico
        INNER JOIN SCCredenciada c ON c.idSCCredenciada = ce.Credenciada
        INNER JOIN SCEdital e ON e.idSCEdital = ce.SCEdital
        WHERE SCCredenciadasEdital = ${BigInt(editalId)}
        AND (ccn.Aprovado = 0)
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
