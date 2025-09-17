import {
  DocumentosAgrupadosPorConsultorEArea,
  generateConsultorAreaDocsSchema,
} from "@/types/types";
import { useEffect, useMemo } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { TrashIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEditalStore } from "@/store/EditalRegister";
import { z } from "zod";
import { toast } from "sonner";
import NoContent from "../NoContent";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { MessageSquareWarningIcon } from "lucide-react";

interface Props {
  DocumentosDosConsultoresPorAreaAjustesProp: DocumentosAgrupadosPorConsultorEArea;
}

export default function DocsAreaConsultsAdj({
  DocumentosDosConsultoresPorAreaAjustesProp,
}: Props) {
  const schema = generateConsultorAreaDocsSchema(
    DocumentosDosConsultoresPorAreaAjustesProp
  );

  type FormSchema = z.infer<typeof schema>;

  const {
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {},
  });

  const {
    cadastrarDocumentosQualificacaoConsultoresAjustes,
    removerDocumentosQualificacaoConsultoresAjustes,
    DocumentosQualificacaoConsultoresAjustes,
    alterarPermissaoAjuste,
  } = useEditalStore();

  const allDocsPreenchidos = Object.entries(
    DocumentosDosConsultoresPorAreaAjustesProp
  ).every(([consultor, areas]) => {
    return Object.keys(areas).every((area) => {
      const uniqueKey = `${consultor} - ${area}`.replaceAll(".", "__DOT__");
      return DocumentosQualificacaoConsultoresAjustes.some(
        (doc) => doc.title === uniqueKey
      );
    });
  });

  useEffect(() => {
    alterarPermissaoAjuste("DocsQualifTecConsultAdj", allDocsPreenchidos);
  }, [alterarPermissaoAjuste, allDocsPreenchidos]);

  if (!DocumentosDosConsultoresPorAreaAjustesProp)
    return (
      <NoContent texto="Não há documentos pendentes para preenchimento nesta sessão" />
    );

  return (
    <div className="space-y-6">
      {Object.entries(DocumentosDosConsultoresPorAreaAjustesProp).map(
        ([consultor, areas]) => {
          const nomeDoConsultor = consultor.split("-")[0];
          const idSCTecnico = consultor.split("-")[1];
          return (
            <div
              key={consultor}
              className="border p-4 my-2 rounded-xl shadow-lg"
            >
              <span className="font-bold flex my-2">{nomeDoConsultor}</span>
              {Object.keys(areas).map((area) => {
                const uniqueKey = `${consultor} - ${area}`.replaceAll(
                  ".",
                  "__DOT__"
                );
                const arquivosSalvos =
                  DocumentosQualificacaoConsultoresAjustes.filter(
                    (d) => d.title === uniqueKey
                  );
                return (
                  <div key={uniqueKey} className="mb-4">
                    <div className="flex items-center justify-between my-4">
                      {areas[area].map((doc, idx) => (
                        <Label
                          key={idx}
                          className="flex items-center justify-center my-2 text-sm font-bold"
                        >
                          <>
                            {area} -{" "}
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <MessageSquareWarningIcon className="size-4 text-muted-foreground hover:text-primary-400 stroke-black hover:stroke-primary-400 hover:scale-110 transition-all cursor-help ml-1" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  {doc.JustificativaNaoAprovacao}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </>
                        </Label>
                      ))}

                      {arquivosSalvos.length > 0 && (
                        <Button
                          className="text-red-500 text-sm"
                          variant="ghost"
                          onClick={() => {
                            arquivosSalvos.forEach((arq) => {
                              return removerDocumentosQualificacaoConsultoresAjustes(
                                arq.id,
                                arq.title
                              );
                            });
                          }}
                        >
                          <TrashIcon className="w-4 h-4 mr-1" />
                          Remover todos
                        </Button>
                      )}
                    </div>
                    {arquivosSalvos.length === 0 ? (
                      <>
                        <Input
                          type="file"
                          multiple
                          accept=".pdf,image/jpeg,image/jpg"
                          onChange={async (e) => {
                            const filesArray = Array.from(e.target.files || []);
                            setValue(uniqueKey, filesArray, {
                              shouldValidate: true,
                            });
                            const isValid = await trigger(uniqueKey);

                            if (!isValid)
                              return toast.error(
                                "Erro ao validar arquivos. Insira-os novamente."
                              );
                            const documentosConvertidos = filesArray.map(
                              (file) => ({
                                areaName: area,
                                title: uniqueKey,
                                blob: URL.createObjectURL(file),
                                id: `${uniqueKey}-${file.name}`,
                                turnToBase64: file,
                                fileName: file.name,
                                idSCTecnico,
                              })
                            );
                            documentosConvertidos.forEach((doc) =>
                              cadastrarDocumentosQualificacaoConsultoresAjustes(
                                doc
                              )
                            );
                            toast.success("Arquivos preparados com sucesso!");
                          }}
                        />
                        {Array.isArray(errors[uniqueKey]) &&
                          errors[uniqueKey][0]?.message && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors[uniqueKey][0]?.message}
                            </p>
                          )}
                      </>
                    ) : (
                      <div className="space-y-2">
                        {arquivosSalvos.map((arquivo, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between bg-gray-100 p-2 rounded"
                          >
                            <a
                              href={arquivo.blob}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline"
                            >
                              {arquivo.fileName}
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        }
      )}
    </div>
  );
}
