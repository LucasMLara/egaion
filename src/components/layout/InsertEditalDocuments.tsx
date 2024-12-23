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

import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DocSchema, IEditalDoc } from "@/types/types";
import { mockInputsEmpresa } from "@/mocks";
import { Input } from "@/components/ui/input";

export default function InsertEditalDocuments() {
  const form = useForm<IEditalDoc>({
    resolver: zodResolver(DocSchema),
    defaultValues: { mockInputFiles: [] },
  });

  const { Documentos, cadastrarDocumento, removerDocumento, alterarPermissaoEdital, Qualificacao, Consultores } = useEditalStore();

  async function handleFieldSubmit(fieldName: string, file: File | undefined) {
    const isValid = await form.trigger(fieldName as keyof IEditalDoc);

    if (isValid && file) {
      const blobUrl = URL.createObjectURL(file);
      const documento = {
        title: fieldName,
        blob: blobUrl,
        id: `${fieldName}-${Date.now()}`,
      };

      cadastrarDocumento(documento);
      console.log(`${fieldName} submitted with value:`, documento);
    } else {
      console.log(`${fieldName} validation failed.`);
    }
  }

  const totalFileInputs = mockInputsEmpresa.reduce(
    (count, category) =>
      count +
      Object.values(category)
        .flat()
        .reduce((subCount, fields) => subCount + Object.keys(fields).length, 0),
    0
  );

  const allFilesUploaded =
    Documentos.length === totalFileInputs;

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
    removerDocumento(documentId);
  }
  return (
    <div className="grid place-content-center text-center">
      {mockInputsEmpresa.map((categoria, index) => {
        const categoryKey = Object.keys(categoria)[0];
        const filesArray = categoria[categoryKey];
        return (
          <div key={index}>
            <h2 className="text-lg text-center font-bold mb-4">
              {categoryKey}
            </h2>
            {filesArray.map((field, fieldIndex) =>
              Object.entries(field).map(([fieldName, label]) => {
                const inputName = `mockInputFiles.${index}.${categoryKey}.${fieldIndex}.${fieldName}.file`;
                const existingDocument = Documentos.find(
                  (doc) => doc.title === inputName
                );
                return (
                  <Form key={`${fieldName}-${fieldIndex}`} {...form}>
                    <FormField
                      name={inputName as `mockInputFiles.${number}.${string}`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex flex-col">
                            <FormLabel className="text-md">{label}</FormLabel>
                            <FormLabel className="text-sm font-light">
                              Selecione seu arquivo clicando na área abaixo
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
                                          inputName as `mockInputFiles.${number}.${string}`
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
                                          | undefined
                                      )
                                    }
                                  >
                                    Carregar Documento
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
