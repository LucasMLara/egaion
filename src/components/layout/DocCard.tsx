"use client";

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
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { currentDate } from "@/lib/utils";
type iDocCard = {
  status?: "ok" | "pending" | "error";
};

const statusClasses = {
  ok: "bg-auxiliary-success-400 text-neutral-600",
  pending: "bg-auxiliary-warning-500 text-neutral-600",
  error: "bg-auxiliary-error-400 text-neutral-500",
};
export default function DocCard({ status }: iDocCard) {
  const statusClass = status ? statusClasses[status] : "";
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          className={`size-64 cursor-pointer hover:shadow-xl transition-all ${statusClass}`}
        >
          <CardHeader>
            <CardTitle>DOCUMENTO</CardTitle>
            <CardDescription>Data: {currentDate}</CardDescription>
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
      <DialogContent className="h-3/5 overflow-auto">
        <DialogHeader>
          <DialogTitle className="font-ubuntu text-xl">
            Situação do Documento:
          </DialogTitle>
          <DialogDescription className="font-ubuntu text-md">
            CNPJ
          </DialogDescription>
        </DialogHeader>
        <div>
          <h1 className="font-bold text-lg">Justificativa:</h1>
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsunlorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun
        </div>
        <DialogFooter className="flex flex-col flex-wrap">
          <Input
            id="cnpj"
            type="file"
            required
            onChange={(e) => console.log(e)}
          />
          <Button className="bg-gradient-primary w-full">Enviar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
