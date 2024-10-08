import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { useEditalStore, Documents } from "@/store/EditalRegister";
import { mockDocumentosAreaConsultor } from "@/mocks";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DocSchema, IEditalDoc } from "@/types/types";
import { useState } from "react";
import CreateConsultant from "./CreateConsultant";
import { Input } from "../ui/input";
import CheckboxFormMultiplo from "./CheckBoxForm";
import ConsultantCard from "./ConsultantCard";

export default function AreaCard({
  area,
  areaId,
}: {
  area: string;
  areaId: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    removerArea,
    Qualificacao,
    setActiveArea,
    cadastrarDocumentosTecnicos,
    activeArea,
    limparDocumentosTecnicos,
  } = useEditalStore();

  const form = useForm<IEditalDoc & { natureza: string[] }>({
    resolver: zodResolver(DocSchema),
    defaultValues: { mockInputFiles: [], natureza: [] },
  });

  const handleReupload = () => {
    limparDocumentosTecnicos();
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
                areaId: activeArea,
              });
            }
          });
        });
      });
    });

    cadastrarDocumentosTecnicos(activeArea, documentos);

    setSubmitted(true);
    form.reset();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card className="size-52 cursor-pointer hover:shadow-xl transition-all ">
          <CardHeader>
            <CardTitle>{area}</CardTitle>
            <CardDescription>Area description</CardDescription>
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
                Inserir Dados
              </Button>
            </DialogTrigger>
            <DialogContent className="min-w-[700px] overflow-auto h-5/6">
              <DialogTitle>Inserir Documentos e Consultores</DialogTitle>
              <DialogDescription className="flex flex-col">
                {submitted ? (
                  <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                      Documentos Submetidos
                    </h2>
                    <ul>
                      {Qualificacao.map((area) =>
                        area.AreaDocuments.filter(
                          (doc) => doc.areaId === areaId
                        ).map((doc) => (
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
                        ))
                      )}
                    </ul>
                    <Button className="w-full mt-4" onClick={handleReupload}>
                      Recadastrar Documentos
                    </Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      {mockDocumentosAreaConsultor.map((item, index) => {
                        const categoryKey = Object.keys(item)[0];
                        const filesArray = item[categoryKey];
                        return (
                          <>
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
                                              onChange={(e) => {
                                                field.onChange(
                                                  e.target.files?.[0]
                                                );
                                              }}
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
                          </>
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
                <div className="flex gap-2 justify-evenly m-2 ">
                  <CheckboxFormMultiplo />
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="my-4">Adicionar Consultor</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>Adicionar Consultor</DialogTitle>
                    <DialogDescription>
                      Preencha os dados do consultor
                    </DialogDescription>
                    <CreateConsultant />
                  </DialogContent>
                </Dialog>
                {Qualificacao.map((area) => (
                  <div
                    key={area.areaId}
                    className="flex flex-wrap place-content-center gap-5 m-2"
                  >
                    {area.Consultores.filter(
                      (consultor) => consultor.areaId === areaId
                    ).map((consultor) => (
                      <ConsultantCard
                        key={consultor.id}
                        email={consultor.email.email}
                        id={consultor.id}
                        name={consultor.nome}
                        telefone={consultor.contato}
                      />
                    ))}
                  </div>
                ))}
              </DialogDescription>
              {/* <DialogFooter>
                <Button
                  onClick={() => {
                    // console.log(form.getValues("natureza"));
                    handleNaturezaPrestacao(form.getValues("natureza")[0]);
                    // setOpen(false);
                  }}
                >
                  Salvar
                </Button>
              </DialogFooter> */}
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost">Remover Area</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Remover Area</DialogTitle>
              <DialogDescription>
                Tem certeza que deseja remover a área?
              </DialogDescription>
              <DialogFooter>
                <Button
                  variant="destructive"
                  onClick={() => removerArea(areaId)}
                >
                  Sim, Tenho certeza. Remover Area!
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
