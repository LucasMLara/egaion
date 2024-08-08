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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
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
        <DialogFooter>
          <Link href={`/${editalId}`}>
            <Button
              type="submit"
              className="bg-gradient-primary hover:shadow-md transition-all disabled:cursor-wait"
            >
              Ver Detalhes
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
