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
  console.log(errors);
  return (
    <div className="space-y-6">
      {Object.entries(DocumentosQualificacaoEmpresaAjustesProp).map(
        ([area, docs]) => {
          return (
            <div key={area} className="border p-4 my-2 rounded-xl shadow-lg">
              <span className="font-bold flex my-2">{area}</span>
              <div>
                {docs.map((doc) => {
                  const uniqueKey = `${doc.Parametrizacao} - ${doc.NomeInput}`;

                  const arquivosSalvos =
                    DocumentosQualificacaoEmpresaAjustes.filter(
                      (d) =>
                        d.id === doc.idSCCredenciada && d.title === uniqueKey
                    );

                  return (
                    <div key={uniqueKey} className="mb-4">
                      <Label className="my-4 flex">{doc.NomeInput}</Label>

                      {/* Se ainda não houver arquivos cadastrados, mostra o input */}
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

                              // Seta o valor manualmente
                              setValue(uniqueKey, filesArray, {
                                shouldValidate: true,
                              });

                              const isValid = await trigger(uniqueKey);

                              if (isValid) {
                                const documentosConvertidos = filesArray.map(
                                  (file) => ({
                                    title: uniqueKey,
                                    blob: URL.createObjectURL(file),
                                    id: doc.idSCCredenciada,
                                    turnToBase64: file,
                                  })
                                );

                                documentosConvertidos.forEach((doc) =>
                                  cadastrarDocumentosQualificacaoEmpresaAjustes(
                                    doc
                                  )
                                );
                              }
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
                                {arquivo.title}
                              </a>
                              <Button
                                variant="ghost"
                                onClick={() =>
                                  removerDocumentosQualificacaoEmpresaAjustes(
                                    arquivo.id
                                  )
                                }
                              >
                                <TrashIcon className="w-4 h-4 text-red-500" />
                              </Button>
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
