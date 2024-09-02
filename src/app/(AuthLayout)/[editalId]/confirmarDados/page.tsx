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
import Link from "next/link";
import { EyeIcon } from "lucide-react";

export default function ConfirmaDados() {
  const { editalData } = useEditalStore();
  const { Consultores, Documentos } = editalData;
  const router = useRouter();

  return (
    <div className="rounded w-full md:w-1/2 bg-neutral-500 flex flex-col items-center content-center md:mx-auto mt-14 p-5">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Confirmação de Dados
      </h3>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Consultores
      </h4>
      <ul>
        {Consultores.map((consultor) => (
          <li key={consultor.id}>
            <Label>{consultor.nome}</Label>
          </li>
        ))}
      </ul>
      <h4 className="text-xl font-semibold tracking-tight">Documentos</h4>
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
              <Link href="/edital/cadastroRealizado">
                <Button type="submit" className="bg-gradient-primary">
                  Confirmar
                </Button>
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
