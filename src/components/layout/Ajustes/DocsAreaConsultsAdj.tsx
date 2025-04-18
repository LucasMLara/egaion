import {
  DocumentosAgrupadosPorConsultorEArea,
  generateConsultorAreaDocsSchema,
} from "@/types/types";
import { useMemo } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { TrashIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEditalStore } from "@/store/EditalRegister";

interface Props {
  DocumentosDosConsultoresPorAreaAjustesProp: DocumentosAgrupadosPorConsultorEArea;
}

export default function DocsAreaConsultsAdj({
  DocumentosDosConsultoresPorAreaAjustesProp,
}: Props) {
  const schema = useMemo(
    () =>
      generateConsultorAreaDocsSchema(
        DocumentosDosConsultoresPorAreaAjustesProp
      ),
    [DocumentosDosConsultoresPorAreaAjustesProp]
  );

  const {
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  //TODO verificar o setvalue, eu estou inserindo arquivos e n estao indo pro store e o gpt ja ta pagando de doido
  const {
    cadastrarDocumentosQualificacaoConsultoresAjustes,
    removerDocumentosQualificacaoConsultoresAjustes,
    DocumentosQualificacaoConsultoresAjustes,
  } = useEditalStore();

  const handleDocumentUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    uniqueKey: string
  ) => {
    const filesArray = Array.from(e.target.files || []);
    setValue(uniqueKey, filesArray, {
      shouldValidate: true,
    });

    const isValid = await trigger(uniqueKey);
    if (!isValid) return;

    const documentosConvertidos = filesArray.map((file) => ({
      title: uniqueKey,
      blob: URL.createObjectURL(file),
      id: `${uniqueKey}-${file.name}`,
      turnToBase64: file,
      fileName: file.name,
    }));

    documentosConvertidos.forEach((doc) =>
      cadastrarDocumentosQualificacaoConsultoresAjustes(doc)
    );
  };

  return (
    <div className="space-y-6">
      {Object.entries(DocumentosDosConsultoresPorAreaAjustesProp).map(
        ([consultor, areas]) => {
          return (
            <div
              key={consultor}
              className="border p-4 my-2 rounded-xl shadow-lg"
            >
              <span className="font-bold flex my-2">{consultor}</span>
              {Object.keys(areas).map((area) => {
                const uniqueKey = `${consultor} - ${area}`;
                const arquivosSalvos =
                  DocumentosQualificacaoConsultoresAjustes.filter(
                    (d) => d.title === uniqueKey
                  );

                return (
                  <div key={uniqueKey} className="mb-4">
                    <Label className="text-sm font-bold">{area}</Label>
                    {arquivosSalvos.length > 0 && (
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() =>
                          removerDocumentosQualificacaoConsultoresAjustes(
                            arquivosSalvos[0].id,
                            arquivosSalvos[0].title
                          )
                        }
                      />
                    )}
                    {arquivosSalvos.length === 0 ? (
                      <>
                        <Input
                          type="file"
                          multiple
                          accept=".pdf,image/jpeg,image/jpg"
                          onChange={(e) => handleDocumentUpload(e, uniqueKey)}
                        />
                        {errors[uniqueKey]?.message && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors[uniqueKey].message.toString()}
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
