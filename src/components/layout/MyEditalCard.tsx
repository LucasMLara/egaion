import { useEffect } from "react";
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
  editalId,
  status,
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
          <DialogTitle>{editalDialogTitle}</DialogTitle>
          <DialogDescription className="font-ubuntu">
            {editalDialogDescription}
          </DialogDescription>
        </DialogHeader>
        <div className="container">{editalDialogContent}</div>
      </DialogContent>
    </Dialog>
  );
}
