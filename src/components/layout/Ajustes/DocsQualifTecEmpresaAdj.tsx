import {
  DocumentoEmpresaAjuste,
  generateEmpresaAreaDocsSchema,
} from "@/types/types";
import { useForm } from "react-hook-form";
import { object, z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { TrashIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEditalStore } from "@/store/EditalRegister";
import { useMemo } from "react";

function agruparPorParametrizacaoEDocumento(
  docs: DocumentoEmpresaAjuste[]
): Record<string, DocumentoEmpresaAjuste[]> {
  return docs.reduce((acc, doc) => {
    const key = `${doc.Parametrizacao}|||${doc.NomeInput}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(doc);
    return acc;
  }, {} as Record<string, DocumentoEmpresaAjuste[]>);
}

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
    register,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  return (
    <div className="space-y-6">
      {Object.entries(DocumentosQualificacaoEmpresaAjustesProp).map(
        ([area, docs]) => {
          return (
            <div key={area} className="border p-4 my-2 rounded-xl shadow-lg">
              <span className="font-bold flex my-2">{area}</span>
              <div>
                {docs.map((doc) => {
                  const key = `${doc.Parametrizacao} - ${doc.NomeInput}`;
                  const arquivosSalvos =
                    DocumentosQualificacaoEmpresaAjustes.filter(
                      (d) =>
                        d.id === doc.idSCCredenciada &&
                        d.title === doc.NomeInput
                    );

                  return (
                    <div key={key} className="mb-4">
                      <Label className="my-4 flex">{doc.NomeInput}</Label>

                      {/* Se ainda não houver arquivos cadastrados, mostra o input */}
                      {arquivosSalvos.length === 0 ? (
                        <>
                          <Input
                            type="file"
                            multiple
                            accept=".pdf,image/jpeg,image/jpg"
                            {...register(key)}
                            onChange={async (e) => {
                              const filesArray = Array.from(
                                e.target.files || []
                              );
                              setValue(key, filesArray);
                              const isValid = await trigger(key);

                              if (isValid) {
                                const documentosConvertidos = filesArray.map(
                                  (file) => ({
                                    title: doc.NomeInput,
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

                          {errors[key]?.message && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors[key]?.message?.toString()}
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
