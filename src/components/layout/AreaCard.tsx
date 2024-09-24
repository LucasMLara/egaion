import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { useEditalStore, Documents } from "@/store/EditalRegister";

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
import { mockDocumentosAreaConsultor } from "@/mocks";
import { useState } from "react";
import CreateConsultant from "./CreateConsultant";
import { Input } from "../ui/input";
import ConsultantCard from "./ConsultantCard";

export default function AreaCard({ area }: { area: string }) {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<IEditalDoc>({
    resolver: zodResolver(DocSchema),
    defaultValues: { mockInputFiles: [] },
  });

  const handleReupload = () => {
    // limparDocumentos();
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

    // cadastrarDocumento(documentos);

    console.log("Submitted Data:", data);
    console.log("Documentos Added to Store:", documentos);
    setSubmitted(true);
    form.reset();
  };
  const {
    removerArea,
    editalData: { Consultores },
  } = useEditalStore();
  return (
    <Dialog>
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
              <Button>Inserir Dados</Button>
            </DialogTrigger>
            <DialogContent className="min-w-[700px] overflow-auto h-5/6">
              <DialogTitle>Inserir Documentos e Consultores</DialogTitle>
              <DialogDescription className="flex flex-col">
                <Input type="file" />
                <Input type="file" />
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
                {Consultores.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 my-5">
                    {Consultores.map(({ nome, id, contato, email }) => (
                      <ConsultantCard
                        key={id}
                        email={email.email}
                        id={id}
                        name={nome}
                        telefone={contato}
                      />
                    ))}
                  </div>
                )}
              </DialogDescription>
              <DialogFooter>
                <Button>Salvar</Button>
              </DialogFooter>
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
                  onClick={() => {
                    removerArea(area);
                  }}
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