"use server";
import prisma from "@/db";
import { ISignUp } from "@/types/types";
import { hashSync } from "bcryptjs";
import { formatDocEntry, sanitizeData } from "@/lib/utils";



export default async function signUp(newUser: ISignUp) {
    if (
        typeof newUser.CNPJ !== "string" ||
        typeof newUser.telefone !== "string" ||
        typeof newUser.password?.password !== "string" ||
        typeof newUser.email?.email !== "string" ||
        typeof newUser.razaoSocial !== "string"
    ) {
        throw new Error("Todos os campos devem ser preenchidos corretamente");
    }

    const userAlreadyExists = await prisma.sCCredenciada.findFirst({
        where: {
            OR: [
                { Email: newUser.email.email },
                { CNPJ: formatDocEntry(newUser.CNPJ) },
            ],
        },
    });

    if (userAlreadyExists) {
        throw new Error("Usuário já existe");
    }

    const idSCCredenciada = await prisma.bAGENERATORTABLE.findFirst({
        where: {
            sequenceName: "SCCREDENCIADA",
        }
    })

    const sanitizedData = sanitizeData([idSCCredenciada])
    const newUserId = +(sanitizedData[0] as { sequenceValue: number }).sequenceValue + 1;

    const createdUser = await prisma.sCCredenciada.create({
        data: {
            idSCCredenciada: newUserId,
            CNPJ: formatDocEntry(newUser.CNPJ),
            Telefone: formatDocEntry(newUser.telefone),
            Email: newUser.email.email,
            RazaoSocial: newUser.razaoSocial,
            Senha: hashSync(newUser.password.password, 12),
        },
    });

    if (createdUser) {
        await prisma.bAGENERATORTABLE.update({
            where: {
                sequenceName: "SCCREDENCIADA",
            },
            data: {
                sequenceValue: newUserId,
            }
        });
    }
}
