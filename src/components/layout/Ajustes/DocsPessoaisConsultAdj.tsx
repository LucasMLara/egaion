import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEditalStore } from "@/store/EditalRegister";

import {
  schemaDocsPessoais,
  GrupoConsultor,
  IDocumentoConsultor,
} from "@/types/types";

export default function DocsPessoaisConsultAdj({
  documentosDosConsultoresParaAjustes,
}: {
  documentosDosConsultoresParaAjustes: GrupoConsultor[];
}) {
  const {
    register,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<IDocumentoConsultor>({
    resolver: zodResolver(schemaDocsPessoais),
    mode: "onChange",
    defaultValues: {
      documentos: {},
    },
  });
  console.log(
    "documentosDosConsultoresParaAjustes",
    documentosDosConsultoresParaAjustes
  );
  const {
    inserirDocumentosPessoaisConsultorAjustes,
    removerDocumentosPessoaisConsultorAjustes,
    documentosPessoaisConsultoresAjustes,
  } = useEditalStore();

  async function handleFieldSubmit(
    fieldName: string,
    file: File | undefined,
    idSCDocumentacao: string
  ) {
    const isValid = await trigger(fieldName as keyof IDocumentoConsultor);

    if (isValid && file) {
      const blobUrl = URL.createObjectURL(file);
      const documento = {
        fileName: file.name,
        blob: blobUrl,
        id: idSCDocumentacao,
        turnToBase64: file,
        title: fieldName,
      };
      inserirDocumentosPessoaisConsultorAjustes(documento);
    }
  }

  function handleRemoveFile(documentId: string) {
    const documento = documentosPessoaisConsultoresAjustes.find(
      (doc) => doc.id === documentId
    );
    if (documento) {
      URL.revokeObjectURL(documento.blob);
      removerDocumentosPessoaisConsultorAjustes(documentId);
    }
  }

  //TODO usar essa variavel abaixo para bloquear o botao de envio e colocar todas as props da pagina principal em cada componente para ler no console e trabalhar com os dados recebidos
  const allfilesUploaded = documentosDosConsultoresParaAjustes.every(
    (consultor) =>
      consultor.documentos.every((doc) => {
        const existing = documentosPessoaisConsultoresAjustes.find(
          (d) => d.id === `${doc.NomeInput}-${consultor.cpf}`
        );
        return existing !== undefined;
      })
  );
  console.log("allfilesUploaded", allfilesUploaded);
  return (
    <div className="space-y-6">
      {documentosDosConsultoresParaAjustes.map((consultor) => (
        <div
          key={consultor.cpf}
          className="border rounded-xl p-4 my-2  space-y-4 shadow-lg"
        >
          <h2 className="font-semibold text-lg">{consultor.nome}</h2>

          {consultor.documentos.map((doc) => {
            const existing = documentosPessoaisConsultoresAjustes.find(
              (d) => d.id === `${doc.NomeInput}-${consultor.cpf}`
            );

            return (
              <div key={doc.NomeInput} className="flex flex-col gap-1">
                <Label className="flex items-center justify-center font-medium my-2">
                  {doc.NomeInput}
                </Label>

                {existing ? (
                  <div className="flex items-center justify-center gap-2">
                    <a
                      href={existing.blob}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline text-sm"
                    >
                      {existing.fileName}
                    </a>
                    <Button
                      type="button"
                      onClick={() => handleRemoveFile(existing.id)}
                      variant="ghost"
                    >
                      Remover
                    </Button>
                  </div>
                ) : (
                  <Input
                    type="file"
                    accept=".pdf,image/jpeg,image/jpg"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setValue(`documentos.${doc.NomeInput}`, file);
                        await handleFieldSubmit(
                          doc.NomeInput,
                          file,
                          `${doc.NomeInput}-${consultor.cpf}`
                        );
                      }
                    }}
                  />
                )}

                {errors.documentos?.[doc.NomeInput] && (
                  <p className="text-red-500 text-sm">
                    {errors.documentos[doc.NomeInput]?.message}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
