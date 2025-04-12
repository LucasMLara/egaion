import { useMemo, useEffect } from "react";
import { generateEmpresaDocsSchema, IGenerateEmpresaDocs } from "@/types/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditalStore } from "@/store/EditalRegister";

type DocumentosParaAjustes = {
  Aprovado: boolean;
  Nome: string;
  idSCDocumentacao: string;
};

export default function DocsEmpresaAdj({
  documentosParaAjustes,
}: {
  documentosParaAjustes: DocumentosParaAjustes[];
}) {
  const schema = generateEmpresaDocsSchema(documentosParaAjustes);

  const {
    documentosEmpresaAjustes,
    inserirDocumentosEmpresaAjustes,
    removerDocumentosEmpresaAjustes,
  } = useEditalStore();

  const {
    control,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm<IGenerateEmpresaDocs>({
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {},
  });

  const documentosPendentes = useMemo(
    () => documentosParaAjustes.filter((doc) => !doc.Aprovado),
    [documentosParaAjustes]
  );
  useEffect(() => {
    const subscription = watch((values, { name }) => {
      if (name) {
        trigger(name);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  async function handleFieldSubmit(
    fieldName: string,
    file: File | undefined,
    idSCDocumentacao: string
  ) {
    const isValid = await trigger(fieldName as keyof IGenerateEmpresaDocs);

    if (isValid && file) {
      const blobUrl = URL.createObjectURL(file);
      const documento: any = {
        Nome: fieldName,
        fileName: file.name,
        blob: blobUrl,
        id: idSCDocumentacao,
        turnToBase64: file,
      };

      console.log(documento);
      inserirDocumentosEmpresaAjustes(documento);
    }
  }

  function handleRemoveFile(documentId: string) {
    const documentToRemove = documentosEmpresaAjustes.find(
      (doc) => doc.id === documentId
    );
    if (documentToRemove) {
      URL.revokeObjectURL(documentToRemove.blob);
      removerDocumentosEmpresaAjustes(documentId);
    }
  }
  //TODO usar essa variavel abaixo para bloquear o botao de envio e colocar todas as props da pagina principal em cada componente para ler no console e trabalhar com os dados recebidos
  const allFilesUploaded = documentosPendentes.every((doc) =>
    documentosEmpresaAjustes.some((d) => d.id === doc.idSCDocumentacao)
  );

  console.log("allFilesUploaded", allFilesUploaded);
  if (documentosParaAjustes.length === 0) return <p>n tem nada</p>;

  return (
    <div className="space-y-4">
      {documentosPendentes.map((doc) => (
        <div key={doc.Nome}>
          <Label className="flex items-center justify-center font-semibold my-2">
            {doc.Nome}
          </Label>
          <Controller
            name={doc.Nome}
            control={control}
            render={({ field }) => {
              const existingDocument = documentosEmpresaAjustes.find(
                (d) => d.id === doc.idSCDocumentacao
              );
              return existingDocument ? (
                <div className="flex w-full items-center justify-center gap-2 m-2">
                  <a
                    href={existingDocument.blob}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm"
                  >
                    Ver Documento
                  </a>
                  <Button
                    type="button"
                    onClick={() => handleRemoveFile(existingDocument.id)}
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
                    field.onChange(file);
                    if (file) {
                      setValue(doc.Nome, file);
                      await handleFieldSubmit(
                        doc.Nome,
                        file,
                        doc.idSCDocumentacao
                      );
                    }
                  }}
                />
              );
            }}
          />
          {errors[doc.Nome] && (
            <p className="text-red-500 text-sm">
              {(errors[doc.Nome] as any)?.message}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
