"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DocumentoConsultor,
  DocumentoConsultorPorArea,
  DocumentoQualificacao,
  DocumentosAgrupadosPorConsultorEArea,
  DocumentoSimples,
  adjustmentsSchema,
} from "@/types/types";
import { Button } from "@/components/ui/button";

export default function MyEditalPage() {
  const { editalId } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(adjustmentsSchema),
  });

  const [documentosDaEmpresa, setDocumentosDaEmpresa] = useState<
    DocumentoSimples[]
  >([]);
  const [documentosPessoaisConsultores, setDocumentosPessoaisConsultores] =
    useState<Record<string, DocumentoConsultor[]>>({});
  const [
    documentosQualificacaoTecnicaEmpresa,
    setDocumentosQualificacaoTecnicaEmpresa,
  ] = useState<Record<string, DocumentoQualificacao[]>>({});
  const [documentosDosConsultoresPorArea, setDocumentosDosConsultoresPorArea] =
    useState<DocumentosAgrupadosPorConsultorEArea>({});

  function agruparDocumentosDosConsultores(
    docs: DocumentoConsultorPorArea[]
  ): DocumentosAgrupadosPorConsultorEArea {
    if (!Array.isArray(docs)) return {};
    return docs.reduce((acc, doc) => {
      if (doc.Aprovado === false) {
        const consultorKey = `${doc.Nome}`;
        const areaKey = doc.Parametrizacao;

        if (!acc[consultorKey]) acc[consultorKey] = {};
        if (!acc[consultorKey][areaKey]) acc[consultorKey][areaKey] = [];

        acc[consultorKey][areaKey].push(doc);
      }

      return acc;
    }, {} as DocumentosAgrupadosPorConsultorEArea);
  }

  function agruparDocsEmpresaPorParametrizacao(docs?: DocumentoQualificacao[]) {
    if (!Array.isArray(docs)) return {};
    return docs.reduce((acc, doc) => {
      const key = doc.Parametrizacao;
      if (!acc[key]) acc[key] = [];
      acc[key].push(doc);
      return acc;
    }, {} as Record<string, DocumentoQualificacao[]>);
  }

  function agruparPorConsultor(
    array: DocumentoConsultor[]
  ): Record<string, DocumentoConsultor[]> {
    return array.reduce((acc, doc) => {
      if (!acc[doc.CPF]) acc[doc.CPF] = [];
      acc[doc.CPF].push(doc);
      return acc;
    }, {} as Record<string, DocumentoConsultor[]>);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/myEditals/${editalId}`);
        if (!res.ok) throw new Error("Erro ao buscar dados");
        const data = await res.json();

        console.log(data);
        setDocumentosDaEmpresa(data.documentosDaEmpresa || []);

        setDocumentosPessoaisConsultores(
          agruparPorConsultor(data.documentosPessoaisConsultores || [])
        );

        setDocumentosDosConsultoresPorArea(
          agruparDocumentosDosConsultores(
            data.documentosDosConsultoresPorArea || []
          )
        );

        setDocumentosQualificacaoTecnicaEmpresa(
          agruparDocsEmpresaPorParametrizacao(
            data.DocumentosQualificacaoTecnicaEmpresa || []
          )
        );
      } catch (err) {
        console.error("Erro ao carregar edital:", err);
      }
    };

    fetchData();
  }, [editalId]);

  const onSubmit = (data: any) => {
    console.log("Submissão:", data);
  };

  const nomeEdital =
    documentosDosConsultoresPorArea &&
    Object.values(documentosDosConsultoresPorArea).length > 0
      ? Object.values(documentosDosConsultoresPorArea)[0] &&
        Object.values(documentosDosConsultoresPorArea)[0] &&
        Object.values(Object.values(documentosDosConsultoresPorArea)[0])[0]?.[0]
          ?.NomeEdital
      : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
      <h1 className="text-2xl font-bold mb-6">
        Realizar Ajustes - Edital {nomeEdital ?? editalId}
      </h1>

      {documentosDaEmpresa.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-2">Documentos da Empresa</h2>
          {documentosDaEmpresa.map((doc, index) => (
            <div key={`empresa-${doc.Nome}-${index}`} className="space-y-1">
              <Label>{doc.Nome}</Label>
              <Input
                type="file"
                {...register(`documentosDaEmpresa.${doc.Nome}`)}
              />
            </div>
          ))}
        </section>
      )}

      {documentosPessoaisConsultores &&
        Object.keys(documentosPessoaisConsultores).length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-2">
              Documentos Pessoais dos Consultores
            </h2>
            {Object.entries(documentosPessoaisConsultores).map(
              ([cpf, docs]) => (
                <div key={cpf}>
                  <h3 className="font-semibold mt-4">
                    Consultor: {docs[0]?.Nome || cpf}
                  </h3>
                  {docs.map((doc, index) => (
                    <div
                      key={`${cpf}-${doc.NomeInput}-${index}`}
                      className="space-y-1"
                    >
                      <Label>{doc.NomeInput}</Label>
                      <Input
                        type="file"
                        {...register(
                          `documentosPessoaisConsultores.${cpf}.${doc.NomeInput}`
                        )}
                      />
                    </div>
                  ))}
                </div>
              )
            )}
          </section>
        )}

      {documentosQualificacaoTecnicaEmpresa &&
        Object.keys(documentosQualificacaoTecnicaEmpresa).length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-2">
              Documentos de Qualificação Técnica da Empresa
            </h2>
            {Object.entries(documentosQualificacaoTecnicaEmpresa).map(
              ([param, docs]) => (
                <div key={`qualificacao-${param}`} className="space-y-2 mt-4">
                  <h3 className="font-semibold">{param}</h3>
                  {docs.map((doc, index) => (
                    <div
                      key={`${param}-${doc.NomeInput}-${index}`}
                      className="space-y-1"
                    >
                      <Label>{doc.NomeInput}</Label>
                      <Input
                        type="file"
                        multiple
                        {...register(
                          `documentosQualificacaoTecnicaEmpresa.${param}.${doc.NomeInput}`
                        )}
                      />
                    </div>
                  ))}
                </div>
              )
            )}
          </section>
        )}

      {documentosDosConsultoresPorArea &&
        Object.keys(documentosDosConsultoresPorArea).length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-2">
              Documentos dos Consultores por Área
            </h2>
            {Object.entries(documentosDosConsultoresPorArea).map(
              ([consultorKey, areas]) => (
                <div key={consultorKey} className="space-y-4 mt-6">
                  <h3 className="font-semibold">{consultorKey}</h3>
                  {Object.entries(areas).map(([area, docs]) => (
                    <div key={area} className="space-y-2 ml-4">
                      <h4 className="text-sm font-medium text-gray-700">
                        Área: {area}
                      </h4>
                      {docs.map((doc, index) => (
                        <div
                          key={`${consultorKey}-${area}-${doc.NomeInput}-${index}`}
                          className="space-y-1"
                        >
                          <Label>{doc.NomeInput}</Label>
                          <Input
                            type="file"
                            multiple
                            {...register(
                              `documentosDosConsultoresPorArea.${consultorKey}.${area}.${doc.NomeInput}`
                            )}
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )
            )}
          </section>
        )}
      <section className="mt-6 flex justify-end space-x-4">
        <Button type="submit" variant="destructive">
          Desistir da Inscrição
        </Button>
        <Button type="submit">Enviar</Button>
      </section>
    </form>
  );
}
