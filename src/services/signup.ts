"use server";
import prisma from "@/db";
import { ISignUp } from "@/types/types";
import { hashSync } from "bcryptjs";
import { formatDocEntry } from "@/lib/utils";


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


    if (typeof newUser.password.password !== "string") {
        throw new Error("Senha inválida");
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
    const newUserOkay = {
        idSCCredenciada: 8,
        CNPJ: formatDocEntry(newUser.CNPJ),
        Telefone: formatDocEntry(newUser.telefone),
        Email: newUser.email.email,
        RazaoSocial: newUser.razaoSocial,
        Senha: hashSync(newUser.password.password, 12),
    }

    console.log("New User:", newUserOkay);

    await prisma.sCCredenciada.create({
        data: newUserOkay,
    });
}
