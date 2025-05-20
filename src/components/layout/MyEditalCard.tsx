import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IEditalCard } from "@/types/types";

import { currentDate, generateEditalCardData } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const statusClasses = {
  ok: "bg-auxiliary-success-400 text-neutral-600",
  pending: "bg-auxiliary-warning-500 text-neutral-600",
  error: "bg-auxiliary-error-400 text-neutral-500",
};
export default function MyEditalCard({
  editalCardContent,
  editalCardDate,
  editalCardTitle,
  editalDialogContent,
  editalDialogDescription,
  editalDialogTitle,
  status,
  editalType,
  editalId,
  justificativa,
}: IEditalCard) {
  const statusClass = status ? statusClasses[status] : "";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          className={`size-64 cursor-pointer hover:shadow-xl transition-all ${statusClass}`}
        >
          <CardHeader>
            <CardTitle>{editalCardTitle}</CardTitle>
            <CardDescription
              className={status === "error" ? "text-neutral-950" : ""}
            >
              {`${editalCardDate ? editalCardDate : currentDate}`}
            </CardDescription>
          </CardHeader>
          <CardContent>{editalCardContent}</CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="h-2/5 overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="text-center">{editalDialogTitle}</DialogTitle>
          <DialogDescription className="font-ubuntu">
            <span className="flex flex-col gap-2 justify-center items-center">
              <span>{editalDialogDescription}</span>
              <span>{editalType}</span>
            </span>
          </DialogDescription>
        </DialogHeader>
        {justificativa && (
          <div className="flex justify-center items-center gap-2 flex-col">
            <span className="font-bold">Observações:</span>
            <span>{justificativa}</span>
          </div>
        )}
        <div className="container">{editalDialogContent}</div>
        {status === "pending" && (
          <DialogFooter className="flex justify-center items-end gap-4">
            <Link href={`/meuEdital/${editalId}`}>
              <Button className="hover:shadow-md transition-all">
                Detalhes
              </Button>
            </Link>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
