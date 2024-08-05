import { type ClassValue, clsx } from "clsx";
// import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { IEditalCard } from "@/types/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const currentDate = new Date().toLocaleDateString("pt-BR");

// export type IEditalCard = {
//   status?: "ok" | "pending" | "error" | null;
//   areas?: string[] | ReactNode[];
//   editalCardContent: ReactNode;
//   editalCardTitle: string;
//   editalCardDate: Date | string;
//   editalDialogTitle: string;
//   editalDialogDescription: string;
//   editalDialogContent: ReactNode | string;
//   editalId: string;
// };

const statusOptions: IEditalCard["status"][] = ["ok", "pending", "error", null];
const areaOptions: string[] = ["area1", "area2", "area3"];
const sampleContent = "Sample Content";
const sampleDialogContent = "Dialog Content";

function getRandomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomDate(): string {
  const start = new Date(2022, 0, 1);
  const end = new Date();
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  ).toLocaleDateString("pt-BR");
}

export function generateEditalCardData(): IEditalCard[] {
  const length = Math.floor(Math.random() * 20) + 1;
  const data: IEditalCard[] = [];

  for (let i = 0; i < length; i++) {
    const card: IEditalCard = {
      status: getRandomItem(statusOptions),
      areas: [getRandomItem(areaOptions), getRandomItem(areaOptions)],
      editalCardContent: sampleContent,
      editalCardTitle: `Edital: ${String(i + 1).padStart(4, "0")}/2024`,
      editalCardDate: getRandomDate(),
      editalDialogTitle: `Dialog Title ${i + 1}`,
      editalDialogDescription: `Description for Dialog ${i + 1}`,
      editalDialogContent: sampleDialogContent,
      editalId: `ID-${i + 1}`,
    };

    data.push(card);
  }

  return data;
}
