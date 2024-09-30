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
import { useState } from "react";

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
}: IEditalCard) {
  const statusClass = status ? statusClasses[status] : "";
  const [avisoDeReset, setAvisoDeReset] = useState(false);
  const { currentEditalId, setEditalId, reset } = useEditalStore();

  function validateEditalId(id: string) {
    if (id !== currentEditalId && currentEditalId !== "") {
      toast.warning("Abrindo um novo edital");
      setAvisoDeReset(true);
    } else {
      setEditalId(id);
      setAvisoDeReset(false);
      toast.success("Abrindo edital");
    }
  }

  return (
    <Dialog>
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
            {editalDialogDescription}
          </DialogDescription>
        </DialogHeader>
        <div className="container">{editalDialogContent}</div>
        {avisoDeReset ? (
          <DialogFooter>
            <Dialog>
              <DialogTrigger>
                <Button
                  className="bg-gradient-primary hover:shadow-md transition-all disabled:cursor-wait"
                  onClick={() => setEditalId(editalId)}
                >
                  Preencher Dados de outro edital?
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Atenção!</DialogTitle>
                <DialogDescription>
                  Você está prestes a abrir um novo edital. Deseja continuar?
                </DialogDescription>
                <DialogFooter>
                  <Link href={`/${editalId}`}>
                    <Button
                      variant="destructive"
                      className="hover:shadow-md transition-all"
                      onClick={() => {
                        reset();
                        setEditalId(editalId);
                      }}
                    >
                      Sim
                    </Button>
                  </Link>
                  <Button
                    variant="secondary"
                    className="hover:shadow-md transition-all"
                    onClick={() => setAvisoDeReset(false)}
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
                onClick={() => setEditalId(editalId)}
                className="bg-gradient-primary hover:shadow-md transition-all disabled:cursor-wait"
              >
                Ver Detalhes
              </Button>
            </Link>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
