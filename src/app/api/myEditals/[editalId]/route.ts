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


        const documentosDaEmpresa = dadosDosDocumentos.map((edital) =>
            Object.fromEntries(
                Object.entries(edital).map(([key, value]) => [
                    key,
                    typeof value === "bigint" ? value.toString() : value,
                ])
            )
        );

        const dadosQualificacaoTecnica: Array<{ [key: string]: any }> = await prisma.$queryRaw`
            SELECT ce.idSCCredenciadasEdital,  e.idSCEdital,e.NomeEdital,
                    c.idSCCredenciada,c.RazaoSocial, pe.Parametrizacao, 'Atestado de Capacidade Técnica' as NomeInput
                    FROM SCCredenciadasEdital ce
                    INNER JOIN SCParametrizacaoEdital pe ON pe.SCCredenciadasEdital = ce.idSCCredenciadasEdital
                    INNER JOIN SCCredenciada c ON c.idSCCredenciada = ce.Credenciada
                    INNER JOIN SCEdital e ON e.idSCEdital = ce.SCEdital
                    WHERE SCCredenciadasEdital = ${BigInt(editalId)}
                    AND pe.ApvAtestadoCapacidadeTec = 0
                    UNION ALL 
                    SELECT ce.idSCCredenciadasEdital,  e.idSCEdital,e.NomeEdital,
                    c.idSCCredenciada,c.RazaoSocial, pe.Parametrizacao, 'Relato de Experiência' as NomeInput
                    FROM SCCredenciadasEdital ce
                    INNER JOIN SCParametrizacaoEdital pe ON pe.SCCredenciadasEdital = ce.idSCCredenciadasEdital
                    INNER JOIN SCCredenciada c ON c.idSCCredenciada = ce.Credenciada
                    INNER JOIN SCEdital e ON e.idSCEdital = ce.SCEdital
                    WHERE SCCredenciadasEdital = ${BigInt(editalId)}
                    AND pe.ApvRelatoExperiencia = 0`
            ;

        const DocumentosQualificacaoTecnicaEmpresa = dadosQualificacaoTecnica.map((edital) =>
            Object.fromEntries(
                Object.entries(edital).map(([key, value]) => [
                    key,
                    typeof value === "bigint" ? value.toString() : value,
                ])
            )
        );

        const documentosConsultores: Array<{ [key: string]: any }> = await prisma.$queryRaw`
        select ce.idSCCredenciadasEdital,  e.idSCEdital,e.NomeEdital,
            c.idSCCredenciada,c.RazaoSocial, cce.idSCConsultorEdital, t.idSCTecnico, t.Nome, t.CPF,
            'Comprovante de Formação Acadêmica' as NomeInput
            from SCCredenciadasEdital ce
            inner join SCConsultorEdital cce on cce.SCCredenciadasEdital = ce.idSCCredenciadasEdital
            inner join SCTecnico t on t.idSCTecnico = cce.SCTecnico
            inner join SCCredenciada c on c.idSCCredenciada = ce.Credenciada
            inner join SCEdital e on e.idSCEdital = ce.SCEdital
            where SCCredenciadasEdital = ${BigInt(editalId)}
            and t.ApvCompFormacaoAcademica = 0 

            UNION ALL 

            select ce.idSCCredenciadasEdital,  e.idSCEdital,e.NomeEdital,
            c.idSCCredenciada,c.RazaoSocial, cce.idSCConsultorEdital, t.idSCTecnico, t.Nome, t.CPF,
            'Comprovante de Vínculo' as NomeInput
            from SCCredenciadasEdital ce
            inner join SCConsultorEdital cce on cce.SCCredenciadasEdital = ce.idSCCredenciadasEdital
            inner join SCTecnico t on t.idSCTecnico = cce.SCTecnico
            inner join SCCredenciada c on c.idSCCredenciada = ce.Credenciada
            inner join SCEdital e on e.idSCEdital = ce.SCEdital
            where SCCredenciadasEdital = ${BigInt(editalId)}
            and t.ApvComprovanteVinculoPJ = 0 

            UNION ALL

            select ce.idSCCredenciadasEdital,  e.idSCEdital,e.NomeEdital,
            c.idSCCredenciada,c.RazaoSocial, cce.idSCConsultorEdital, t.idSCTecnico, t.Nome, t.CPF,
            'Documentos Pessoais' as NomeInput
            from SCCredenciadasEdital ce
            inner join SCConsultorEdital cce on cce.SCCredenciadasEdital = ce.idSCCredenciadasEdital
            inner join SCTecnico t on t.idSCTecnico = cce.SCTecnico
            inner join SCCredenciada c on c.idSCCredenciada = ce.Credenciada
            inner join SCEdital e on e.idSCEdital = ce.SCEdital
            where SCCredenciadasEdital = ${BigInt(editalId)}
            AND t.ApvDocumentosPessoais = 0 

            UNION ALL 

            select ce.idSCCredenciadasEdital,  e.idSCEdital,e.NomeEdital,
            c.idSCCredenciada,c.RazaoSocial, cce.idSCConsultorEdital, t.idSCTecnico, t.Nome, t.CPF,
            'Registro Profissional' as NomeInput
            from SCCredenciadasEdital ce
            inner join SCConsultorEdital cce on cce.SCCredenciadasEdital = ce.idSCCredenciadasEdital
            inner join SCTecnico t on t.idSCTecnico = cce.SCTecnico
            inner join SCCredenciada c on c.idSCCredenciada = ce.Credenciada
            inner join SCEdital e on e.idSCEdital = ce.SCEdital
            where SCCredenciadasEdital = ${BigInt(editalId)}
            and t.ApvRegistroProfissional = 0`;

        const documentosPessoaisConsultores = documentosConsultores.map((edital) =>
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

        const documentosDosConsultoresPorArea = docsParametrizacaoConsultores.map((edital) =>
            Object.fromEntries(
                Object.entries(edital).map(([key, value]) => [
                    key,
                    typeof value === "bigint" ? value.toString() : value,
                ])
            )
        );

        return NextResponse.json({ documentosDaEmpresa, DocumentosQualificacaoTecnicaEmpresa, documentosPessoaisConsultores, documentosDosConsultoresPorArea });
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json(
            { error: "Failed to fetch data" },
            { status: 500 }
        );
    }
}

