"use client";
import { useEffect } from "react";
import ConsultantTable from "@/components/ConsultantTable/ConsultantTable";
import { useEditalStore } from "@/store/EditalRegister";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Team() {
  const { Qualificacao, setActiveArea } = useEditalStore();
  const hasSomeConsultant = Qualificacao.some(
    (qualificacao) => qualificacao.Consultores.length > 0
  );

  useEffect(() => setActiveArea(""), [setActiveArea]);
  console.log(Qualificacao);

  return hasSomeConsultant ? (
    <ConsultantTable />
  ) : (
    <section className="flex flex-col place-content-center">
      <h1 className="text-xl font-bold text-neutral-700 text-center m-9">
        Nenhum Consultor Cadastrado
      </h1>
      <Link href="/memberregister" className="mt-5">
        <Button className="w-full bg-gradient-primary hover:shadow-lg hover:shadow-gray-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-auto disabled:shadow-none">
          Cadastrar
        </Button>
      </Link>
    </section>
  );
}
