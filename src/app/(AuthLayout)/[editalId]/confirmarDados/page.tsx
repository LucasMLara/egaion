"use client";
import { useEditalStore } from "@/store/EditalRegister";
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
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function ConfirmaDados() {
  const { editalData } = useEditalStore();
  const { Consultores, Documentos } = editalData;
  const router = useRouter();

  return (
    <div className="rounded w-1/2 bg-neutral-500 flex flex-col items-center content-center mx-auto mt-14 p-5">
      <h1>Confirmação de Dados</h1>
      <h2>Consultores</h2>
      <ul>
        {Consultores.map((consultor) => (
          <li key={consultor.id}>
            <Label>{consultor.nome}</Label>
          </li>
        ))}
      </ul>
      <h2>Documentos</h2>
      <ul>
        {Documentos.map((documento) => (
          <li key={documento.id}>
            <Label>{documento.title}</Label>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap m-4 p-4 justify-evenly w-full">
        <Button onClick={() => router.back()} variant="ghost">
          Voltar
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary">Cadastrar</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Tem Certeza?</DialogTitle>
              <DialogDescription>
                Após confirmar, você não poderá alterar os dados cadastrados.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="submit" className="bg-gradient-primary">
                Confirmar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
