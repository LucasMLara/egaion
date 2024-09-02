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
import { useState } from "react";

export default function InsertEditalDocuments() {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<IEditalDoc>({
    resolver: zodResolver(DocSchema),
    defaultValues: { mockInputFiles: [] },
  });
  const { cadastrarDocumento, editalData, limparDocumentos } = useEditalStore();

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
    cadastrarDocumento(documentos);

    console.log("Submitted Data:", data);
    console.log("Documentos Added to Store:", documentos);
    setSubmitted(true);
    form.reset();
  };

  return (
    <div className="grid place-content-center mx-auto">
      {submitted || editalData.Documentos.length > 0 ? (
        <div className="widescreen-card bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Documentos Submetidos</h2>
          <ul>
            {editalData.Documentos.map((doc) => (
              <li key={doc.id} className="mb-2">
                <a href={doc.blob} target="_blank" rel="noopener noreferrer">
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
                            <FormLabel>{label}</FormLabel>
                            <FormControl>
                              <Input
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
            <Button className="bg-gradient-primary w-full" type="submit">
              Preparar Documentos
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
