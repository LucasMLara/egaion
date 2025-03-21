import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { currentDate } from "@/lib/utils";
import { IEditalCard } from "@/types/types";
import { useEditalStore } from "@/store/EditalRegister";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const statusClasses = {
  ok: "bg-auxiliary-success-400 text-neutral-600",
  pending: "bg-auxiliary-warning-500 text-neutral-600",
  error: "bg-auxiliary-error-400 text-neutral-500",
};

export default function EditalCard({
  status,
  editalCardContent,
  editalCardTitle,
  editalCardDate,
  editalDialogTitle,
  editalDialogDescription,
  editalDialogContent,
  editalId,
  editalType,
}: IEditalCard) {
  const statusClass = status ? statusClasses[status] : "";
  const [sameCurrentEdital, setSameCurrentEdital] = useState(false);
  const { currentEditalId, reset, currentEditalName } = useEditalStore();
  const [open, setOpen] = useState(false);

  function validateEditalId(id: string) {
    const mesmoEdital = id === currentEditalId;
    if (mesmoEdital || !currentEditalId) {
      setSameCurrentEdital(true);
      toast.success("Abrindo edital");
    } else {
      toast.warning("Abrindo um novo edital");
      setSameCurrentEdital(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card
          onClick={() => validateEditalId(editalId)}
          className={`size-64 cursor-pointer hover:shadow-xl transition-all ${statusClass}`}
        >
          <CardHeader>
            <CardTitle>{editalCardTitle}</CardTitle>
            <CardDescription>
              {`${editalCardDate ? editalCardDate : currentDate}`}
            </CardDescription>
          </CardHeader>
          <CardContent>{editalCardContent}</CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="h-2/5 overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Detalhes do Edital: {editalDialogTitle}</DialogTitle>
          <DialogDescription className="font-ubuntu">
            <span className="flex flex-col gap-2 justify-center items-center">
              <span>{editalDialogDescription}</span>
              <span>{editalType}</span>
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="container">{editalDialogContent}</div>
        {!sameCurrentEdital ? (
          <DialogFooter>
            <Dialog>
              <DialogTrigger>
                <Button className="bg-gradient-primary hover:shadow-md transition-all disabled:cursor-wait">
                  Preencher Dados de outro edital?
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Atenção!</DialogTitle>
                <DialogDescription>
                  Você está prestes a se cadastrar em um novo edital. Só é
                  permitido o cadastro em um edital por vez.
                </DialogDescription>

                <DialogDescription>
                  Caso você continue, todos os dados que você já cadastrou no
                  edital{" "}
                  <span className="font-bold text-lg">{currentEditalName}</span>{" "}
                  serão perdidos.
                </DialogDescription>
                <DialogDescription>Deseja continuar?</DialogDescription>
                <DialogFooter>
                  <Link href={`/${editalId}`}>
                    <Button
                      variant="destructive"
                      className="hover:shadow-md transition-all"
                      onClick={() => {
                        setTimeout(() => {
                          reset();
                        }, 250);
                      }}
                    >
                      Sim
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="hover:shadow-md transition-all"
                    onClick={() => setOpen(false)}
                  >
                    Não
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </DialogFooter>
        ) : (
          <DialogFooter>
            <Link href={`/${editalId}`}>
              <Button
                type="submit"
                className="bg-gradient-primary hover:shadow-md transition-all disabled:cursor-wait"
              >
                Continuar cadastro
              </Button>
            </Link>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
