import React, { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useEditalStore } from "@/store/EditalRegister";
import { prepararDocumentosCredenciada } from "@/lib/concatEditalDocuments";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DocSchema, IEditalDoc, RequiredDocuments } from "@/types/types";
import { Input } from "@/components/ui/input";

export default function InsertEditalDocuments({
  documentosRequeridos,
}: {
  documentosRequeridos: RequiredDocuments[];
}) {
  const form = useForm<IEditalDoc>({
    resolver: zodResolver(DocSchema),
    defaultValues: { editalDocs: [] },
  });

  const {
    Documentos,
    cadastrarDocumento,
    removerDocumento,
    alterarPermissaoEdital,
    Qualificacao,
    Consultores,
    RequiredDocumentsQty,
  } = useEditalStore();

  async function handleFieldSubmit(
    fieldName: string,
    file: File | undefined,
    idSCDocumentacao: string
  ) {
    const isValid = await form.trigger(fieldName as keyof IEditalDoc);

    if (isValid && file) {
      const blobUrl = URL.createObjectURL(file);
      const documento = {
        title: fieldName,
        fileName: file.name,
        blob: blobUrl,
        id: idSCDocumentacao,
        idSCDocumentacao,
        turnToBase64: file
      };
      cadastrarDocumento(documento);
    }
  }

  const allFilesUploaded = Documentos.length === RequiredDocumentsQty;

  useEffect(() => {
    Qualificacao.map(({ naturezaPrestacao, AreaDocuments }) => {
      if (
        naturezaPrestacao.length === 0 ||
        AreaDocuments.length === 0 ||
        Consultores.length === 0 ||
        !allFilesUploaded
      ) {
        alterarPermissaoEdital(false);
      } else {
        alterarPermissaoEdital(true);
      }
    });
  }, [Qualificacao, alterarPermissaoEdital, allFilesUploaded, Consultores]);

  function handleRemoveFile(documentId: string) {
    const documentToRemove = Documentos.find((doc) => doc.id === documentId);
    if (documentToRemove) {
      URL.revokeObjectURL(documentToRemove.blob);
      removerDocumento(documentId);
    }
  }

  return (
    <div className="grid place-content-center text-center">
      {documentosRequeridos.map((categoria, index) => {
        const categoryKey = Object.keys(categoria)[0];
        const filesArray = categoria[categoryKey];
        return (
          <div key={index}>
            <h2 className="text-lg text-center font-bold my-2">
              {categoryKey !== "Qualificação Técnica" ? categoryKey : ""}{" "}
            </h2>
            {filesArray.map((field, fieldIndex) =>
              Object.entries(field).map(([fieldName, label]) => {
                const inputLabel = label.split("#")[0];
                const idSCDocumentacao = label.split("#")[1];
                const inputName = `editalDocs.${index}.${categoryKey}.${fieldIndex}.${fieldName}.file`;
                const existingDocument = Documentos.find(
                  (doc) => doc.title === inputName
                );
                return (
                  <Form key={`${fieldName}-${fieldIndex}`} {...form}>
                    <FormField
                      name={inputName as `editalDocs.${number}.${string}`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex flex-col">
                            <FormLabel className="text-md my-1">
                              {inputLabel}
                            </FormLabel>
                          </div>
                          <FormControl>
                            <div className="flex gap-1">
                              {existingDocument ? (
                                <div className="flex w-full items-center justify-center gap-2 m-2">
                                  <a
                                    href={existingDocument.blob}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline"
                                  >
                                    Ver Documento
                                  </a>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() =>
                                      handleRemoveFile(existingDocument.id)
                                    }
                                  >
                                    Remover
                                  </Button>
                                </div>
                              ) : (
                                <>
                                  <Input
                                    accept="application/pdf, image/jpeg, image/jpg"
                                    type="file"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      field.onChange(file);
                                      if (file) {
                                        form.clearErrors(
                                          inputName as `editalDocs.${number}.${string}`
                                        );
                                      }
                                    }}
                                  />
                                  <Button
                                    type="button"
                                    onClick={() =>
                                      handleFieldSubmit(
                                        inputName,
                                        field.value as unknown as
                                          | File
                                          | undefined,
                                        idSCDocumentacao
                                      )
                                    }
                                  >
                                    Validar Documento
                                  </Button>
                                </>
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </Form>
                );
              })
            )}
          </div>
        );
      })}
    </div>
  );
}
