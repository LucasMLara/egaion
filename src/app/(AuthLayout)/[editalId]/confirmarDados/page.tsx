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
import { useRouter } from "next/navigation";
import { useMyEditals } from "@/store/useMyEditals";
import { nanoid } from "nanoid";

export default function ConfirmaDados() {
  const { setMyEdital } = useMyEditals();
  const router = useRouter();
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
    <div className="rounded w-full md:w-4/6 bg-neutral-500 flex flex-col items-center content-center md:mx-auto mt-14 p-5">
      <h3 className="scroll-m-20 text-2xl font-bold tracking-tight mb-5">
        Atenção:
      </h3>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Antes de prosseguir, por favor, verifique todos os dados inseridos.
        Certifique-se de que todas as informações estão corretas, pois após a
        confirmação, não será possível alterá-las.
      </h4>
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
