"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { DadosSanitizados, gerarSchemaDocumentos } from "@/types/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function MyEditalContent({
  params,
}: {
  params: { editalId: string };
}) {
  const [dados, setDados] = useState<DadosSanitizados>({
    dadosDosMeusDocumentosSanitizados: [],
    dadosQualificacaoTecnicaSanitizados: [],
    documentosConsultoresSanitizados: [],
    docsParametrizacaoConsultoresSanitizados: [],
  });

  const { editalId } = params;
  const router = useRouter();

  const formSchema = gerarSchemaDocumentos({
    dadosDosMeusDocumentosSanitizados:
      dados.dadosDosMeusDocumentosSanitizados || [],
    dadosQualificacaoTecnicaSanitizados: (
      dados.dadosQualificacaoTecnicaSanitizados || []
    ).map((item) => ({
      Nome: item.Parametrizacao,
    })),
    documentosConsultoresSanitizados:
      dados.documentosConsultoresSanitizados || [],
    docsParametrizacaoConsultoresSanitizados:
      dados.docsParametrizacaoConsultoresSanitizados || [],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (formData: any) => {
    console.log("Formulário validado:", formData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/myEditals/${editalId}`);
        if (!res.ok) throw new Error("Erro ao buscar dados do edital");
        const data = await res.json();
        setDados({
          dadosDosMeusDocumentosSanitizados:
            data.dadosDosMeusDocumentosSanitizados.map((doc: any) => ({
              ...doc,
              file: undefined,
            })),
          dadosQualificacaoTecnicaSanitizados:
            data.dadosQualificacaoTecnicaSanitizados.map((doc: any) => ({
              Nome: doc.Parametrizacao,
              file: undefined,
            })),
          documentosConsultoresSanitizados:
            data.documentosConsultoresSanitizados.map((doc: any) => ({
              ...doc,
              file: undefined,
            })),
          docsParametrizacaoConsultoresSanitizados:
            data.docsParametrizacaoConsultoresSanitizados.map((doc: any) => ({
              ...doc,
              file: undefined,
            })),
        });
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      }
    };
    fetchData();
  }, [editalId]);

  const renderGrupo = (categoria: string, lista: { Nome: string }[]) => {
    if (!lista.length) return null;

    return (
      <div className="border p-4 rounded-xl shadow-sm space-y-4">
        <h2 className="font-semibold text-lg capitalize text-neutral-700">
          {categoria
            .replace(/Sanitizados$/, "")
            .replace(/([A-Z])/g, " $1")
            .replace(/Docs /i, "")}
        </h2>

        {lista.map((doc, idx) => (
          <div key={idx} className="space-y-1">
            <Label>{doc.Nome}</Label>
            <Input
              type="file"
              accept="application/pdf, image/jpeg, image/jpg"
              {...register(`${categoria}.${idx}.file`)}
            />
            {(errors[categoria] as any)?.[idx]?.file && (
              <p className="text-sm text-red-500">
                {(errors[categoria] as any)?.[idx]?.file?.message}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="my-6">
      <h1 className="text-2xl font-bold text-neutral-700 text-center">
        {dados.dadosDosMeusDocumentosSanitizados?.[0]?.NomeEdital || ""}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-6">
        {renderGrupo(
          "dadosDosMeusDocumentosSanitizados",
          dados.dadosDosMeusDocumentosSanitizados || []
        )}

        {renderGrupo(
          "dadosQualificacaoTecnicaSanitizados",
          (dados.dadosQualificacaoTecnicaSanitizados || []).map((item) => ({
            Nome: item.Nome,
          }))
        )}

        {renderGrupo(
          "documentosConsultoresSanitizados",
          dados.documentosConsultoresSanitizados || []
        )}

        {renderGrupo(
          "docsParametrizacaoConsultoresSanitizados",
          dados.docsParametrizacaoConsultoresSanitizados || []
        )}

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
