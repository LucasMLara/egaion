import {
  DocumentoEmpresaAjuste,
  generateEmpresaAreaDocsSchema,
} from "@/types/types";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { TrashIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEditalStore } from "@/store/EditalRegister";
import { toast } from "sonner";
import { useEffect } from "react";
import NoContent from "../NoContent";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { MessageSquareWarningIcon } from "lucide-react";

interface Props {
  DocumentosQualificacaoEmpresaAjustesProp: Record<
    string,
    DocumentoEmpresaAjuste[]
  >;
}

export default function DocsQualifTecEmpresaAdj({
  DocumentosQualificacaoEmpresaAjustesProp,
}: Props) {
  const {
    cadastrarDocumentosQualificacaoEmpresaAjustes,
    removerDocumentosQualificacaoEmpresaAjustes,
    DocumentosQualificacaoEmpresaAjustes,
    alterarPermissaoAjuste,
  } = useEditalStore();
  const schema = generateEmpresaAreaDocsSchema(
    Object.values(DocumentosQualificacaoEmpresaAjustesProp).flat()
  );

  type FormSchema = z.infer<typeof schema>;

  const {
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const allDocsPreenchidos = Object.values(
    DocumentosQualificacaoEmpresaAjustesProp
  )
    .flat()
    .every((doc) => {
      const uniqueKey = `${doc.Parametrizacao} - ${doc.NomeInput}`.replaceAll(
        ".",
        "__DOT__"
      );
      return DocumentosQualificacaoEmpresaAjustes.some(
        (d) => d.id === doc.idSCCredenciada && d.title === uniqueKey
      );
    });

  useEffect(() => {
    alterarPermissaoAjuste("DocsQualifTecEmpresaAdj", allDocsPreenchidos);
  }, [alterarPermissaoAjuste, allDocsPreenchidos]);

  if (!DocumentosQualificacaoEmpresaAjustesProp)
    return (
      <NoContent texto="Não há documentos pendentes para preenchimento nesta sessão" />
    );

  return (
    <div className="space-y-6">
      {Object.entries(DocumentosQualificacaoEmpresaAjustesProp).map(
        ([area, docs]) => {
          return (
            <div key={area} className="border p-4 my-2 rounded-xl shadow-lg">
              <span className="font-bold flex my-2">{area}</span>
              <div>
                {docs.map((doc) => {
                  const uniqueKey =
                    `${doc.Parametrizacao} - ${doc.NomeInput}`.replaceAll(
                      ".",
                      "__DOT__"
                    );
                  const arquivosSalvos =
                    DocumentosQualificacaoEmpresaAjustes.filter(
                      (d) =>
                        d.id === doc.idSCCredenciada && d.title === uniqueKey
                    );

                  return (
                    <div key={uniqueKey} className="mb-4">
                      <div className="flex items-center justify-between my-4">
                        <Label className="flex items-center justify-center font-medium my-2">
                          <>
                            {doc.NomeInput} -{" "}
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
                        {arquivosSalvos.length > 0 && (
                          <Button
                            variant="ghost"
                            onClick={() => {
                              arquivosSalvos.forEach((arq) => {
                                return removerDocumentosQualificacaoEmpresaAjustes(
                                  arq.id,
                                  arq.title
                                );
                              });
                            }}
                            className="text-red-500 text-sm"
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
                              const filesArray = Array.from(
                                e.target.files || []
                              );
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
                                  title: uniqueKey,
                                  blob: URL.createObjectURL(file),
                                  id: doc.idSCCredenciada,
                                  turnToBase64: file,
                                  fileName: file.name,
                                  areaName: doc.Parametrizacao,
                                  modalidade:
                                    doc.NomeInput === "Relato de Experiência"
                                      ? "RelatoExperiencia"
                                      : "AtestadoCapacidadeTecnica",
                                })
                              );
                              documentosConvertidos.forEach((doc) =>
                                cadastrarDocumentosQualificacaoEmpresaAjustes(
                                  doc
                                )
                              );
                              toast.success("Arquivos preparados com sucesso!");
                            }}
                          />
                          {Array.isArray(errors[uniqueKey]) &&
                            errors[uniqueKey]?.map((erro, i) => (
                              <p key={i} className="text-red-500 text-sm mt-1">
                                {erro?.message?.toString()}
                              </p>
                            ))}
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
            </div>
          );
        }
      )}
    </div>
  );
}
