"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getData } from "@/components/ConsultantTable/ConsultantTable";
import { maskCpf } from "@/lib/utils";
import { ConsultantRowDisplay } from "@/types/types";
import { useRouter } from "next/navigation";

import { LoaderIcon } from "lucide-react";

export default function TeamMember({ params }: { params: { userId: string } }) {
  const { userId } = params;
  const [member, setMember] = useState<ConsultantRowDisplay[]>([]);
  const router = useRouter();

  useEffect(() => {
    const data = getData(userId);
    setMember(data as ConsultantRowDisplay[]);
  }, [userId]);

  if (member.length === 0)
    return (
      <div className="text-lg flex flex-wrap gap-2 items-center justify-center h-full">
        <LoaderIcon className="animate-spin size-14 text-primary-400" />
      </div>
    );
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
              type="text"
              required
              name="nome"
              defaultValue={member[0]?.nome}
            />
          </div>
          <div className="flex flex-col gap-2 my-2 flex-grow">
            <Label htmlFor="email">Email</Label>
            <Input
              className="transition-all w-full"
              id="email"
              type="email"
              name="email"
              disabled
              defaultValue={member[0]?.email || ""}
            />
          </div>
          <div className="flex flex-col gap-2 my-2 flex-grow">
            <Label htmlFor="CPF">CPF</Label>
            <Input
              className="transition-all w-full"
              id="CPF"
              disabled
              type="text"
              name="CPF"
              defaultValue={maskCpf(member[0]?.CPF || "")}
            />
          </div>
          <div className="flex flex-col gap-2 my-2 flex-grow">
            <Label htmlFor="contato">Contato</Label>
            <Input
              className="transition-all w-full"
              id="contato"
              type="text"
              name="contato"
              defaultValue={member[0]?.contato || ""}
            />
          </div>
        </div>
        <div className="w-full flex justify-end mt-4 gap-4">
          <Button onClick={() => router.back()} variant="outline" type="button">
            Voltar
          </Button>
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
