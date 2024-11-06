"use client";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditalStore } from "@/store/EditalRegister";
import { maskCpf } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConsultantRowDisplay } from "@/types/types";

const ConsultantActionsCell = ({ memberId }: { memberId: string }) => {
  const removerConsultor = useEditalStore((state) => state.removerConsultor);

  return (
    <div className="text-center flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Opções</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* <Link href={`/team/${memberId}`}>
            <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
          </Link> */}
          <DropdownMenuItem onClick={() => removerConsultor(memberId)}>
            Remover Consultor
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const columns: ColumnDef<ConsultantRowDisplay>[] = [
  {
    accessorKey: "CPF",
    header: () => <div className="text-center">CPF</div>,
    cell: ({ row }) => (
      <div className="text-center">{maskCpf(row.original.CPF)}</div>
    ),
  },
  {
    accessorKey: "nome",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-center">{row.original.nome}</div>,
  },
  {
    accessorKey: "email",
    header: () => <div className="text-center">Email</div>,
    cell: ({ row }) => <div className="text-center">{row.original.email}</div>,
  },
  {
    accessorKey: "Opçoes",
    header: () => <div className="text-right">Opções</div>,
    cell: ({ row }) => <ConsultantActionsCell memberId={row.original.id} />,
  },
];
