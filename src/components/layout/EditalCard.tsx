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
import { Badge } from "@/components/ui/badge";

type IEditalCard = {
  status?: "ok" | "pending" | "error";
};

const statusClasses = {
  ok: "bg-auxiliary-success-400 text-neutral-600",
  pending: "bg-auxiliary-warning-500 text-neutral-600",
  error: "bg-auxiliary-error-400 text-neutral-500",
};

export default function EditalCard({ status }: IEditalCard) {
  const statusClass = status ? statusClasses[status] : "";
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          className={`size-64 cursor-pointer hover:shadow-xl transition-all ${statusClass}`}
        >
          <CardHeader>
            <CardTitle>Edital: 0001/2024</CardTitle>
            <CardDescription>Data: 00/00/00</CardDescription>
            <div>
              <Badge className="justify-center bg-neutral-700">Área 1</Badge>
              <Badge className="justify-center bg-auxiliary-success-600">
                Área 2
              </Badge>
              <Badge className="justify-center bg-auxiliary-error-400">
                Subárea 1
              </Badge>
              <Badge className="justify-center bg-neutral-700">Subárea 2</Badge>
              <Badge className="justify-center bg-gradient-primary">
                Subárea 3
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            loren ipsun loren ipsun loren ipsun loren ipsun loren
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="h-2/5 overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Detalhes do Edital:</DialogTitle>
          <DialogDescription className="font-ubuntu">
            Descrição
          </DialogDescription>
        </DialogHeader>
        <div className="container">
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
        </div>
        <DialogFooter>
          <Link href={"/1"}>
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
