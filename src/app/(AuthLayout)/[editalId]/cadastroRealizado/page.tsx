"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useEditalStore } from "@/store/EditalRegister";
export default function CadastroRealizado() {
  const { reset } = useEditalStore();
  //TODO  CONTINUAR AQUI
  // useEffect(() => reset(), [reset]);
  return (
    <div className="flex flex-col h-full items-center justify-center">
      <div className="text-center flex w-5/6 md:w-3/4 flex-col rounded-md border-2 bg-neutral-500 justify-center items-center p-7">
        <h1 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Cadastro Realizado com Sucesso
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Seu cadastro foi realizado com sucesso, clique no botão abaixo para
          voltar a tela dos seus editais
        </p>
        <Link href="/" className="mt-5">
          <Button className="w-full bg-gradient-primary hover:shadow-lg hover:shadow-gray-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-auto disabled:shadow-none">
            Voltar
          </Button>
        </Link>
      </div>
    </div>
  );
}
