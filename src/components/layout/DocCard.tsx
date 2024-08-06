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
import { IDocCard } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "../ui/input";
import { currentDate } from "@/lib/utils";

const statusClasses = {
  ok: "bg-auxiliary-success-400 text-neutral-600",
  pending: "bg-auxiliary-warning-500 text-neutral-600",
  error: "bg-auxiliary-error-400 text-neutral-500",
};

type Area = "area1" | "area2" | "area3";

const areaColors: Record<Area, string> = {
  area1: "bg-neutral-700",
  area2: "bg-auxiliary-success-600",
  area3: "bg-auxiliary-error-400",
};

export default function DocCard({
  // docStatus,
  docTitle,
  docDate,
  docAreas,
  docContent,
  docDialogContent,
  docDialogDescription,
  docDialogTitle,
}: IDocCard) {
  // const statusClass = docStatus ? statusClasses[docStatus] : "";
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          className={`size-64 cursor-pointer hover:shadow-xl transition-all`}
        >
          <CardHeader>
            <CardTitle>{docTitle}</CardTitle>
            <CardDescription>{`${
              docDate ? docDate : currentDate
            }`}</CardDescription>
            <div>
              {docAreas?.map((area, i) => (
                <Badge
                  key={i}
                  className={`justify-center ${
                    typeof area === "string"
                      ? areaColors[area as Area]
                      : "bg-neutral-700"
                  }`}
                >
                  {area}
                </Badge>
              ))}
            </div>
          </CardHeader>
          <CardContent>{docContent}</CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="h-3/5 overflow-auto">
        <DialogHeader>
          <DialogTitle className="font-ubuntu text-xl">
            Situação do Documento: {docDialogTitle}
          </DialogTitle>
          <DialogDescription className="font-ubuntu text-md">
            CNPJ : {docDialogDescription}
          </DialogDescription>
        </DialogHeader>
        {docDialogContent && (
          <div>
            <h1 className="font-bold text-lg">Justificativa:</h1>
            {docDialogContent}
          </div>
        )}
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
