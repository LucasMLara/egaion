"use client";
import { useEffect, useState } from "react";
import ConsultantTable from "@/components/ConsultantTable/ConsultantTable";
import { useEditalStore } from "@/store/EditalRegister";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";

export default function Team() {
  const { Consultores, setActiveArea } = useEditalStore();
  const hasSomeConsultant = Consultores.length > 0;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setActiveArea("");
    setLoading(false);
  }, [setActiveArea]);

  if (loading) {
    return (
      <section className="text-lg flex flex-wrap gap-2 items-center justify-center h-full">
        <LoaderIcon className="animate-spin size-14 text-primary-400" />
      </section>
    );
  }

  return hasSomeConsultant ? (
    <ConsultantTable />
  ) : (
    <section className="text-lg flex flex-wrap flex-col gap-1 items-center justify-center h-full">
      <h1 className="text-xl font-bold text-neutral-700 text-center m-9">
        Nenhum Consultor Cadastrado
      </h1>
      <Link href="/memberregister">
        <Button className="w-full bg-gradient-primary hover:shadow-lg hover:shadow-gray-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-auto disabled:shadow-none">
          Cadastrar
        </Button>
      </Link>
    </section>
  );
}
