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
import { currentDate } from "@/lib/utils";
import { IEditalCard } from "@/types/types";

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

export default function EditalCard({
  status,
  areas,
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
            <div>
              {areas?.map((area, i) => (
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
