import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DocSchema, IEditalDoc } from "@/types/types";
import { mockInputsEmpresa } from "@/mocks";
import { Documents, useEditalStore } from "@/store/EditalRegister";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function InsertEditalDocuments() {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<IEditalDoc>({
    resolver: zodResolver(DocSchema),
    defaultValues: { mockInputFiles: [] },
  });
  const {
    cadastrarDocumento,
    limparDocumentos,
    Documentos,
    alterarPermissaoEdital,
    Qualificacao,
    Consultores,
  } = useEditalStore();

  const handleReupload = () => {
    limparDocumentos();
    setSubmitted(false);
  };

  const onSubmit = (data: IEditalDoc) => {
    const documentos: Documents[] = [];
    data.mockInputFiles.forEach((category) => {
      Object.entries(category).forEach(([categoryKey, filesArray]) => {
        filesArray.forEach((fileObject) => {
          Object.entries(fileObject).forEach(([fileKey, fileData]) => {
            if (fileData.file) {
              documentos.push({
                title: `${categoryKey}-${fileKey}`,
                blob: URL.createObjectURL(fileData.file),
                id: `${categoryKey}-${fileKey}-${Date.now()}`,
              });
            }
          });
        });
      });
    });
    toast.success("Documentos preparados com sucesso!");
    cadastrarDocumento(documentos);
    setSubmitted(true);
    form.reset();
  };

  const { errors } = form.formState;

  useEffect(() => {
    Qualificacao.map(({ naturezaPrestacao, AreaDocuments }) => {
      if (
        naturezaPrestacao.length === 0 ||
        AreaDocuments.length === 0 ||
        Consultores.length === 0 ||
        Documentos.length === 0
      ) {
        alterarPermissaoEdital(false);
      } else {
        alterarPermissaoEdital(true);
      }
    });
  }, [Qualificacao, alterarPermissaoEdital, Documentos, Consultores]);

  return (
    <div className="grid place-content-center text-center">
      {submitted || Documentos.length > 0 ? (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Documentos Submetidos
          </h2>
          <ul className="list-disc list-inside mt-4">
            {Documentos.map((doc) => (
              <li key={doc.id} className="my-2">
                <a
                  href={doc.blob}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="leading-7 [&:not(:first-child)]:mt-6 text-blue-500 underline"
                >
                  {doc.title}
                </a>
              </li>
            ))}
          </ul>
          <Button
            className="bg-gradient-primary w-full mt-4"
            onClick={handleReupload}
          >
            Recadastrar Documentos
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {mockInputsEmpresa.map((item, index) => {
              const categoryKey = Object.keys(item)[0];
              const filesArray = item[categoryKey];
              return (
                <div key={index}>
                  <h2 className="text-lg text-center font-bold mb-4">
                    {categoryKey}
                  </h2>
                  {filesArray.map((field, fieldIndex) =>
                    Object.entries(field).map(([fieldName, label]) => (
                      <FormField
                        key={`${fieldName}-${fieldIndex}`}
                        control={form.control}
                        name={`mockInputFiles.${index}.${categoryKey}.${fieldIndex}.${fieldName}.file`}
                        render={({ field }) => (
                          <FormItem className="m-2">
                            <div className="flex flex-col">
                              <FormLabel className="text-md">{label}</FormLabel>
                              <FormLabel className="text-sm font-light ">
                                Selecione seu arquivo clicando na área abaixo
                              </FormLabel>
                            </div>
                            <FormControl>
                              <Input
                                accept="application/pdf, image/jpeg, image/jpg"
                                type="file"
                                onChange={(e) => {
                                  field.onChange(e.target.files?.[0]);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))
                  )}
                </div>
              );
            })}
            <Button
              className="bg-gradient-primary w-full mb-5"
              type="submit"
              disabled={Object.keys(errors).length > 0}
            >
              Preparar Documentos
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
