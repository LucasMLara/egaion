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
import { mockQualificacaoTecnica } from "@/mocks";
import { Documents, useEditalStore } from "@/store/EditalRegister";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CreateConsultant from "./CreateConsultant";
import ConsultantCard from "./ConsultantCard";

type areas = {
  [key: string]: {
    [key: string]: string;
  }[];
};

type TQualificacaoTecnicaDocs = {
  areas: string[];
  mockInputFiles: {
    [key: string]: {
      [key: string]: {
        file: File | null;
        name: string;
      }[];
    }[];
  }[];
};

export default function InsertQualificacaoTecnicaDocs() {
  const areas: areas[] = [
    {
      "Area 1": [
        { "Subarea1.1": "Subarea 1.1" },
        { "Subarea1.2": "Subarea 1.2" },
        { "Subarea1.3": "Subarea 1.3" },
      ],
      "Area 2": [
        { "Subarea2.1": "Subarea 2.1" },
        { "Subarea2.2": "Subarea 2.2" },
        { "Subarea2.3": "Subarea 2.3" },
      ],
      "Area 3": [
        { "Subarea3.1": "Subarea 3.1" },
        { "Subarea3.2": "Subarea 3.2" },
        { "Subarea3.3": "Subarea 3.3" },
      ],
    },
  ];

  const {
    cadastrarDocumentoQualificacao,
    editalData,
    limparDocumentosTecnicos,
    alterarPermissao,
    removerArea,
    inserirArea,
    removerNaturezaPrestacao,
    indicarNaturezaPrestacao,
  } = useEditalStore();
  const [submitted, setSubmitted] = useState(false);

  const naturezaprestacaocontas: string[] = ["Consultoria", "Instrutoria"];
  const form = useForm<IEditalDoc>({
    resolver: zodResolver(DocSchema),
    defaultValues: { mockInputFiles: [] },
  });
  const { errors } = form.formState;

  useEffect(() => {
    Object.keys(errors).length > 0 ||
    editalData.Documentos.length == 0 ||
    editalData.Consultores.length == 0 ||
    editalData.Qualificacao.areas.length == 0 ||
    editalData.Qualificacao.naturezaPrestacao === ""
      ? alterarPermissao(true)
      : alterarPermissao(false);
  }, [
    errors,
    editalData.Consultores,
    editalData.Qualificacao,
    editalData.Documentos,
  ]);

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
    cadastrarDocumentoQualificacao(documentos);

    console.log("Submitted Data:", data);
    console.log("Documentos Added to Store:", documentos);
    setSubmitted(true);
    form.reset();
  };

  const handleReupload = () => {
    limparDocumentosTecnicos();
    setSubmitted(false);
  };

  return (
    <div className="flex flex-col gap-2 mx-auto text-center">
      <Select
        onValueChange={(value) => {
          inserirArea(value);
        }}
      >
        <SelectTrigger>
          Selecione a área correspondente
          {/* <SelectValue placeholder="Selecione a área correspondente" /> */}
        </SelectTrigger>
        <SelectContent>
          {areas.map((area, areaIndex) => (
            <SelectGroup key={areaIndex}>
              {Object.keys(area).map((areaKey, keyIndex) => (
                <div key={keyIndex}>
                  <SelectLabel>{areaKey}</SelectLabel>
                  {area[areaKey].map((subarea, subareaIndex) => (
                    <SelectItem
                      key={subareaIndex}
                      value={Object.keys(subarea)[0]}
                    >
                      {Object.values(subarea)[0]}
                    </SelectItem>
                  ))}
                </div>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
      {editalData.Qualificacao.areas.length > 0 && (
        <div>
          <h2 className="text-lg text-center font-bold mb-4">
            Áreas Selecionadas
          </h2>
          <ul className="flex flex-wrap">
            {editalData.Qualificacao.areas.map((area, index) => (
              <li key={index}>
                <Badge
                  className="cursor-pointer m-2 hover:bg-auxiliary-error-400"
                  variant="secondary"
                  onClick={() => removerArea(area)}
                >
                  {area}
                </Badge>{" "}
              </li>
            ))}
          </ul>
        </div>
      )}

      {editalData.Qualificacao.naturezaPrestacao ? (
        <div>
          Natureza da Prestação de Serviços:{" "}
          {editalData.Qualificacao.naturezaPrestacao}
          <Button
            variant="ghost"
            className="ml-2"
            onClick={() =>
              removerNaturezaPrestacao(
                editalData.Qualificacao.naturezaPrestacao
              )
            }
          >
            X
          </Button>
        </div>
      ) : (
        <Select
          onValueChange={(naturezaPrestacao) =>
            indicarNaturezaPrestacao(naturezaPrestacao)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Natureza da Prestação de Serviços" />
          </SelectTrigger>
          <SelectContent>
            {naturezaprestacaocontas.map((natureza, index) => (
              <SelectItem key={index} value={natureza}>
                {natureza}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {submitted || editalData.Qualificacao.documentosDaEmpresa.length > 0 ? (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Documentos Submetidos
          </h2>
          <ul>
            {editalData.Qualificacao.documentosDaEmpresa.map((doc) => (
              <li key={doc.id} className="my-2">
                <a
                  href={doc.blob}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="leading-7 [&:not(:first-child)]:mt-6"
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
            {mockQualificacaoTecnica.map((item, index) => {
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
              className="bg-gradient-primary w-full"
              type="submit"
              // disabled={Object.keys(errors).length > 0}
            >
              Preparar Documentos
            </Button>
          </form>
        </Form>
      )}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-gradient-primary">
            Vincular Consultor(es)
          </Button>
        </DialogTrigger>
        <DialogContent className="h-5/6 w-screen">
          <DialogTitle>Insira seu consultor</DialogTitle>
          <CreateConsultant />
        </DialogContent>
      </Dialog>
      {editalData.Consultores.length > 0 && (
        <section className="flex flex-wrap gap-5 place-content-center p-4 m-4">
          {editalData.Consultores.map((consultor) => (
            <ConsultantCard
              email={consultor.email.email}
              id={consultor.id}
              name={consultor.nome}
              telefone={consultor.contato}
              key={consultor.id}
            />
          ))}
        </section>
      )}
    </div>
  );
}
