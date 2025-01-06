import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { IEditalCard, IDocCard } from "@/types/types";
import  Dayjs from "dayjs"

export function formatDate(date: string) {
  return Dayjs(date).format("DD/MM/YYYY");
}

export function sanitizeData(data: any[]) {
  return data.map((edital) =>
    Object.fromEntries(
      Object.entries(edital).map(([key, value]) => [
        key,
        typeof value === "bigint" ? value.toString() : value,
      ])
    )
  );
}                               

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function formatDocEntry(input: string) : string {
  return input.replace(/\D/g, '');
}

export const currentDate = new Date().toLocaleDateString("pt-BR");

export const maskCpf = (cpf: string) => {
  return cpf.replace(/(\d{2})\d{5}(\d{3})/, "$1***$2");
};

const statusOptions: IEditalCard["status"][] = ["ok", "pending", "error", null];
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

export function generateDocCardData(size: number = 20): IDocCard[] {
  const length = Math.floor(Math.random() * size) + 1;
  const data: IDocCard[] = [];

  for (let i = 0; i < length; i++) {
    const docCard: IDocCard = {
      docId: `ID-${i + 1}`,
      docTitle: `Doc Title ${i + 1}`,
      docContent: sampleContent,
      docStatus: getRandomItem(statusOptions),
      docDate: getRandomDate(),
      docDialogTitle: `Dialog Title ${i + 1}`,
      docDialogDescription: `Description for Dialog ${i + 1}`,
      docDialogContent: sampleDialogContent,
    };

    data.push(docCard);
  }

  return data;
}
