"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DocSchema, IEditalDoc, MultipleCheckBoxOptions } from "@/types/types";
import CheckboxFormMultiplo from "./CheckBoxNaturezasForm";
import { useEditalStore, Documents } from "@/store/EditalRegister";
import { mockDocumentosAreaConsultor, naturezasPrestacao } from "@/mocks";
import { toast } from "sonner";

export default function AreaCard({
  area,
  areaId,
}: {
  area: string;
  areaId: string;
}) {
  const [submittedFiles, setSubmittedFiles] = useState(false);

  const [open, setOpen] = useState(false);
  const [selectedNaturezas, setSelectedNaturezas] = useState<
    MultipleCheckBoxOptions[]
  >([]);

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

  const form = useForm<IEditalDoc & { natureza: string[] }>({
    resolver: zodResolver(DocSchema),
    defaultValues: { mockInputFiles: [], natureza: [] },
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
      (area) => area.areaId === activeArea && area.AreaDocuments.length > 0
    );

    if (areaHasFiles) {
      setSubmittedFiles(true);
    } else {
      setSubmittedFiles(false);
    }
  }, [Qualificacao, activeArea, submittedFiles]);

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
                areaId: activeArea,
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
        <Card className="size-full cursor-pointer hover:shadow-xl transition-all">
          <CardHeader>
            <div className="flex items-center justify-center">  
              <CardTitle>{area}</CardTitle>
            </div>
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
            <DialogContent className=" overflow-auto h-5/6">
              <DialogTitle>Inserir Documentos e Consultores</DialogTitle>
              <DialogDescription className="text-center text-xl">{area}</DialogDescription>
              <DialogDescription className="flex flex-col">
                {submittedFiles ? (
                  <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <h2 className="text-3xl font-semibold border-b pb-2">
                      Documentos Submetidos
                    </h2>
                    <ul className="list-disc list-inside mt-4">
                      {Qualificacao.map((area) =>
                        area.AreaDocuments.filter(
                          (doc) => doc.areaId === areaId
                        ).map((doc) => (
                          <li key={doc.id} className="my-2">
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
                        <Button className="w-full mt-4">Recadastrar Documentos</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>Recadastrar Documentos</DialogTitle>
                        <DialogDescription>
                          Tem certeza que deseja recadastrar os documentos?
                          Você precisará recadastrar todos os documentos da área novamente.
                        </DialogDescription>
                        <DialogFooter>
                          <Button variant='destructive' onClick={handleResetDocuments}>
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
                                            accept="application/pdf, image/jpeg, image/jpg"
                                            type="file"
                                            onChange={(e) =>
                                              field.onChange(
                                                e.target.files?.[0]
                                              )
                                            }
                                          />
                                        </FormControl>
                                        <FormMessage />
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
                        Preparar Documentos
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
                  />
                </div>
              </DialogDescription>
            </DialogContent>
          </Dialog>
          <Dialog>
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
          </Dialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
