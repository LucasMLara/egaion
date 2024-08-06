import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getData } from "../page";
import DocCard from "@/components/layout/DocCard";
import { generateDocCardData } from "@/lib/utils";

export default async function TeamMember({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = params;
  const member = await getData(userId);
  const docCardData = generateDocCardData(6);

  const maskCpf = (cpf: string) => {
    return cpf.replace(/(\d{2})\d{5}(\d{3})/, "$1***$2");
  };
  const name = member[0].email.split("@")[0];
  return (
    <section className="my-6">
      <h1 className="text-2xl font-bold text-neutral-700 text-center">
        Detalhes
      </h1>
      <form className="flex flex-col m-9 gap-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2 my-2 flex-grow">
            <Label htmlFor="nome">Nome</Label>
            <Input
              className="transition-all w-full"
              id="nome"
              type="nome"
              required
              name="nome"
              defaultValue={name}
            />
          </div>
          <div className="flex flex-col gap-2 my-2 flex-grow">
            <Label htmlFor="email">Email</Label>
            <Input
              className="transition-all w-full"
              id="email"
              type="email"
              name="email"
              placeholder="egaion@pentago.com.br"
              disabled
              defaultValue={member[0].email}
            />
          </div>
          <div className="flex flex-col gap-2 my-2 flex-grow">
            <Label htmlFor="CPF">CPF</Label>
            <Input
              className="transition-all w-full"
              id="CPF"
              disabled
              type="CPF"
              defaultValue={maskCpf(member[0].docNumber)}
              name="CPF"
            />
          </div>
          <div className="flex flex-col gap-2 my-2 flex-grow">
            <Label htmlFor="contato">Contato</Label>
            <Input
              className="transition-all w-full"
              id="contato"
              type="text"
              name="contato"
              defaultValue={member[0].contact}
            />
          </div>
        </div>
        <div className="grid justify-center md:grid-cols-2">
          {docCardData.map((card) => (
            <DocCard
              key={card.docId}
              docStatus={card.docStatus}
              docTitle={card.docTitle}
              docDate={card.docDate}
              docAreas={card.docAreas}
              docContent={card.docContent}
              docDialogContent={card.docDialogContent}
              docDialogDescription={card.docDialogDescription}
              docDialogTitle={card.docDialogTitle}
              docId={card.docId}
            />
          ))}
        </div>
        <div className="w-full flex justify-end mt-4">
          <Button
            type="submit"
            className="bg-gradient-primary hover:shadow-lg hover:shadow-gray-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-auto disabled:shadow-none w-64"
          >
            Atualizar
          </Button>
        </div>
      </form>
    </section>
  );
}
