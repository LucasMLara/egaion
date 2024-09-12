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
import { useMyEditals } from "@/store/useMyEditals";
import { nanoid } from "nanoid";

export default function ConfirmaDados() {
  const { editalData } = useEditalStore();
  const { setMyEdital } = useMyEditals();
  const { Consultores, Documentos } = editalData;
  const router = useRouter();
  //TODO VERIFICAR SE O NANO ID É DIFERENTE A CADA CADASTRO - SÓ PARA NAO DAR PROBLEMA NO MOCK
  function cadastrarEdital() {
    setMyEdital({
      date: new Date(),
      description: "Descrição Teste",
      id: nanoid(),
      status: null,
      title: "Edital Teste",
    });
    router.push("cadastroRealizado");
  }

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
              <Button
                type="submit"
                className="bg-gradient-primary"
                onClick={cadastrarEdital}
              >
                Confirmar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
