"use server";
import prisma from "@/db";
import { formatDocEntry, sanitizeData } from "@/lib/utils";
import { IEditalStore } from "@/store/EditalRegister";

type IEdital = Pick<IEditalStore, 'Consultores' | 'Documentos' | 'Qualificacao' | 'consultantAreaDocuments'>;

export default async function EditalRegister(newEdital: IEdital) {
    if (newEdital.Consultores.length === 0 || newEdital.Documentos.length === 0 || newEdital.Qualificacao.length === 0 || newEdital.consultantAreaDocuments.length === 0) {
        throw new Error("Todos os campos devem ser preenchidos corretamente");
    }

    //TODO - ao criar edital ,no store, enviar o id do edital para o backend para posterior validação se já foi cadastrado.

    // const idEdital = await prisma.cEDDemanda.findFirst({
    //     where: {
    //         OR: [
    //             { idCEDDemanda: newEdital.idEdital },
    //         ],
    //     },
    // });

    // await prisma.cEDDemanda.create({
    //     data: {


    //     }
    // });
}

//TODO - INSERIR O ID DO USUARIO NO EDITAL
// const myEditals = await prisma.cEDDemanda.findUnique({
//     where: {
//         credeciada LINHA 1983 do PRISMA: uysuaricoookie()
//     },
// });