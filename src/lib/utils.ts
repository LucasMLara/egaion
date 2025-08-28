import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { IEditalCard, IDocCard } from "@/types/types";
import Dayjs from "dayjs";

export function formatDate(date: string) {
  const parsedDate = Dayjs(date);
  return parsedDate.isValid()
    ? parsedDate.format("DD/MM/YYYY")
    : "Data não definida.";
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

export function createBlobUrl(base64: string, mimeType: string): string {
  const base64Content = base64.includes(",") ? base64.split(",")[1] : base64;

  const byteString = atob(base64Content);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uintArray = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    uintArray[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([uintArray], { type: mimeType });
  return URL.createObjectURL(blob);
}

export function formatDocEntry(input: string): string {
  return input.replace(/\D/g, "");
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
      docFile: "",
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

export type InputItem = {
  idView: string;
  SCEdital: string;
  Nivel: number;
  idNivel: string;
  idNivelPai: string;
  Codigo: number;
  Descricao: string;
  Entidade: string;
  TipoNivel: string;
  DescTipoNivel: string;
};

export type OutputItem = {
  id: number;
  name: string;
  subLevels: OutputItem[];
};

export function transformData(input: InputItem[]): OutputItem[] {
  const idMap = new Map<string, OutputItem>();

  input.forEach((item) => {
    idMap.set(item.idView, {
      id: parseInt(item.idNivel, 10),
      name: item.Descricao,
      subLevels: [],
    });
  });

  const result: OutputItem[] = [];
  input.forEach((item) => {
    const current = idMap.get(item.idView);
    if (!current) return;

    if (item.idNivelPai === "0") {
      result.push(current);
    } else {
      const areas = input.find(
        (area) =>
          area.idNivel === item.idNivelPai && area.Nivel === item.Nivel - 1
      );
      if (areas) {
        const parent = idMap.get(areas.idView);
        if (parent) {
          parent.subLevels.push(current);
        }
      }
    }
  });
  const resultWithServices = addServiceLeaves(result);
  return resultWithServices;
}

type ServiceType = "Consultoria" | "Instrutoria";

function addServiceLeaves(tree: OutputItem[]): OutputItem[] {
  const SERVICES: ServiceType[] = ["Consultoria", "Instrutoria"];

  const clone = (n: OutputItem): OutputItem => ({
    id: n.id,
    name: n.name,
    subLevels: n.subLevels?.map(clone) ?? []
  });

  const withServices = (n: OutputItem): OutputItem => {
    const node = clone(n);

    if (!node.subLevels || node.subLevels.length === 0) {
      // folha → vira pai de duas folhas “Consultoria/Instrutoria”
      node.subLevels = SERVICES.map((svc, idx) => ({
        // gera id derivado só pra diferenciar (se precisar id único estrito,
        // troque por um gerador ou hash)
        id: Number(`${node.id}${idx + 1}`),
        name: `${node.name} - ${svc}`,
        subLevels: []
      }));
      return node;
    }

    node.subLevels = node.subLevels.map(withServices);
    return node;
  };

  return tree.map(withServices);
}

