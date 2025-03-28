"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { maskCpf } from "@/lib/utils";
import { ConsultantRowDisplay } from "@/types/types";
import { useRouter } from "next/navigation";

import { LoaderIcon } from "lucide-react";

export default function TeamMember({
  params,
}: {
  params: { editalId: string };
}) {
  const { editalId } = params;
  const router = useRouter();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch(`/api/myEditals/${editalId}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar dados do edital");
        }
        const data = await response.json();
        console.log(data);
      };
      fetchData();
    } catch (e) {}
  }, [editalId]);

  return (
    <section className="my-6">
      <h1 className="text-2xl font-bold text-neutral-700 text-center">
        Detalhes : {editalId}
      </h1>
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
    </section>
  );
}
