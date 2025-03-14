"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Trash2Icon } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { nanoid } from "nanoid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  MultipleCheckBoxOptions,
  AreaDocSchema,
  IAreaDocSchema,
} from "@/types/types";
import CheckboxFormMultiplo from "./CheckBoxNaturezasForm";
import { useEditalStore, Document } from "@/store/EditalRegister";
import { mockDocumentosAreaConsultor, naturezasPrestacao } from "@/mocks";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

export default function AreaCard({
  area,
  areaId,
}: {
  area: string;
  areaId: string;
}) {
  const [submittedFiles, setSubmittedFiles] = useState(false);
  const [checkboxHasError, setCheckboxHasError] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedNaturezas, setSelectedNaturezas] = useState<
    MultipleCheckBoxOptions[]
  >([]);

  const [travarBotaoMap, setTravarBotaoMap] = useState<Record<string, boolean>>(
    {}
  );

  const {
    removerArea,
    Qualificacao,
    setActiveArea,
    cadastrarDocumentosTecnicos,
    activeArea,
    limparDocumentosTecnicos,
    setNaturezaPrestacao,
    clearNaturezaPrestacao,
    limparConsultores,
  } = useEditalStore();

  const form = useForm<IAreaDocSchema & { natureza: string[] }>({
    resolver: zodResolver(AreaDocSchema),
    defaultValues: { mockInputFiles: [] },
  });

  const handleNaturezaSubmit = (naturezas: MultipleCheckBoxOptions[]) => {
    setSelectedNaturezas(naturezas);
    const naturezaPrestacao = naturezas.map((natureza) => ({
      ...natureza,
      areaId: activeArea,
    }));
    setNaturezaPrestacao(naturezaPrestacao, activeArea);
  };
  const handleRemoveArea = (areaId: string) => {
    if (Qualificacao.length === 1) {
      limparConsultores();
      toast.warning("Removido todas as áreas. Os Consultores foram removidos");
    }
    removerArea(areaId);
  };
  const handleResetNaturezas = () => {
    setSelectedNaturezas([]);
    clearNaturezaPrestacao(activeArea);
  };

  useEffect(() => {
    const areaHasFiles = Qualificacao.some(
      (area) => area.areaId === areaId && area.AreaDocuments.length > 0
    );
    const areaHasNatureza = Qualificacao.some(
      (area) => area.areaId === areaId && area.naturezaPrestacao.length > 0
    );

    setTravarBotaoMap((prev) => ({
      ...prev,
      [areaId]: !areaHasFiles || !areaHasNatureza,
    }));
  }, [Qualificacao, areaId]);

  useEffect(() => {
    if (Object.keys(form.formState.errors).length > 0) {
      toast.error("Insira todos os dados necessários para prosseguir");
    }
  }, [form.formState.errors]);

  useEffect(() => {
    const areaHasFiles = Qualificacao.some(
      (area) => area.areaId === activeArea && area.AreaDocuments.length > 0
    );

    if (areaHasFiles) {
      setSubmittedFiles(true);
    } else {
      setSubmittedFiles(false);
    }
  }, [Qualificacao, activeArea, submittedFiles]);

  const onSubmit = (data: IAreaDocSchema) => {
    const documentos: Document[] = [];

    data.mockInputFiles.forEach((category) => {
      Object.entries(category).forEach(([categoryKey, filesArray]) => {
        filesArray.forEach((fileObject) => {
          Object.entries(fileObject).forEach(([fieldKey, fileData]) => {
            const files = fileData.file;
            if (Array.isArray(files)) {
              files.forEach((file) => {
                if (file) {
                  documentos.push({
                    title: file.name,
                    blob: URL.createObjectURL(file),
                    id: nanoid(10),
                    areaId: activeArea,
                    category: fieldKey,
                    turnToBase64: file,
                  });
                }
              });
            }
          });
        });
      });
    });

    cadastrarDocumentosTecnicos(activeArea, documentos);
    setSubmittedFiles(true);
    form.reset();
    toast.success("Documentos preparados com sucesso!");
  };

  const handleResetDocuments = () => {
    setSelectedNaturezas([]);
    limparDocumentosTecnicos();
    toast.warning("Documentos removidos com sucesso!");
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card className="size-full cursor-pointer hover:shadow-xl transition-all relative">
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle>{area}</CardTitle>
              {!travarBotaoMap[areaId] ? <Check className="ml-2" /> : null}
            </div>
            <Trash2Icon
              className="absolute top-2 right-2 hover:text-red-500 hover:scale-110 transition-all cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveArea(areaId);
              }}
            />
          </CardHeader>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="my-3">{area}</DialogTitle>
        <DialogHeader className="my-3">
          Prossiga para a inserção dos dados necessários da área correspondente
          ou remova a área caso tenha inserido por engano.
        </DialogHeader>
        <DialogFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button onClick={() => setActiveArea(areaId)}>
                Inserir Documentos
              </Button>
            </DialogTrigger>
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
            </DialogClose>
            <DialogContent className=" overflow-auto h-5/6">
              <DialogTitle>Inserir Documentos e Consultores</DialogTitle>
              <DialogDescription className="text-center text-xl">
                {area}
              </DialogDescription>
              <DialogDescription className="flex flex-col">
                {submittedFiles ? (
                  <div className="bg-gray-100 p-4 rounded-lg shadow-md max-h-96 overflow-auto">
                    <h2 className="text-3xl font-semibold border-b pb-2 text-center">
                      Documentos Submetidos
                    </h2>
                    <ul className="list-disc list-inside mt-4">
                      {Qualificacao.map((area) =>
                        area.AreaDocuments.filter(
                          (doc) => doc.areaId === areaId
                        ).map((doc) => (
                          <li key={doc.id} className="my-2">
                            <span className="font-semibold">
                              {doc.category}:{" "}
                            </span>{" "}
                            <a
                              href={doc.blob}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline"
                            >
                              {doc.title}
                            </a>
                          </li>
                        ))
                      )}
                    </ul>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full mt-4">
                          Recadastrar Documentos
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>Recadastrar Documentos</DialogTitle>
                        <DialogDescription>
                          Tem certeza que deseja recadastrar os documentos? Você
                          precisará recadastrar todos os documentos da área
                          novamente.
                        </DialogDescription>
                        <DialogFooter>
                          <Button
                            variant="destructive"
                            onClick={handleResetDocuments}
                          >
                            Sim, Tenho certeza. Recadastrar Documentos!
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      {mockDocumentosAreaConsultor.map((item, index) => {
                        const categoryKey = Object.keys(item)[0];
                        const filesArray = item[categoryKey];
                        return (
                          <div key={index}>
                            <h2 className="text-lg text-center font-bold mb-4">
                              {categoryKey}
                            </h2>
                            {filesArray.map((field, fieldIndex) =>
                              Object.entries(field).map(
                                ([fieldName, label]) => (
                                  <FormField
                                    key={`${fieldName}-${fieldIndex}`}
                                    control={form.control}
                                    name={`mockInputFiles.${index}.${categoryKey}.${fieldIndex}.${fieldName}.file`}
                                    render={({ field }) => (
                                      <FormItem className="m-2">
                                        <FormLabel>{label}</FormLabel>
                                        <FormControl>
                                          <Input
                                            multiple
                                            accept="application/pdf, image/jpeg, image/jpg"
                                            type="file"
                                            onChange={(e) => {
                                              const files = e.target.files;
                                              if (files) {
                                                const fileArray =
                                                  Array.from(files);
                                                field.onChange(fileArray);
                                              }
                                            }}
                                          />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                )
                              )
                            )}
                          </div>
                        );
                      })}
                      <Button
                        className="bg-gradient-primary w-full"
                        type="submit"
                        disabled={Object.keys(form.formState.errors).length > 0}
                      >
                        Validar Documentos
                      </Button>
                    </form>
                  </Form>
                )}
                <div className="flex gap-2 justify-evenly m-2">
                  <CheckboxFormMultiplo
                    labelSelecionados="Natureza da Prestação"
                    opcoes={naturezasPrestacao}
                    onSubmit={handleNaturezaSubmit}
                    onReset={handleResetNaturezas}
                    opcoesSelecionadas={selectedNaturezas}
                    onErrorChange={setCheckboxHasError}
                  />
                </div>
              </DialogDescription>
              {Object.keys(form.formState.errors).length > 0 ||
                checkboxHasError ||
                (travarBotaoMap[areaId] && (
                  <Label className="text-md text-center text-neutral-700  transition-all uppercase bg-auxiliary-warning-500 flex flex-col justify-center rounded-lg">
                    Insira todos os dados necessários acima
                  </Label>
                ))}
              <DialogFooter>
                <Button
                  variant="ghost"
                  className=" hover:text-neutral-300 text-neutral-500 ho disabled:text-neutral-900  bg-auxiliary-success-400  hover:bg-auxiliary-success-500 disabled:bg-auxiliary-warning-400  disabled:cursor-not-allowed disabled:pointer-events-none disabled:shadow-none"
                  onClick={() => {
                    setOpen(false);
                    toast.success("Informaçoes da área inseridas com sucesso!");
                  }}
                  disabled={
                    Object.keys(form.formState.errors).length > 0 ||
                    checkboxHasError ||
                    travarBotaoMap[areaId]
                  }
                >
                  OK
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {/* <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost">Remover Área</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Remover Área</DialogTitle>
              <DialogDescription>
                Tem certeza que deseja remover a área?
              </DialogDescription>
              <DialogFooter>
                <Button
                  variant="destructive"
                  onClick={() => handleRemoveArea(areaId)}
                >
                  Sim, Tenho certeza. Remover Área!
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
