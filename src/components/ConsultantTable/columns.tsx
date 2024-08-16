"use client";
import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

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

export const columns: ColumnDef<ConsultantRowDisplay>[] = [
  // {
  //   id: "Seleção",
  //   accessorKey: "status",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  // },
  {
    accessorKey: "CPF",
    header: () => {
      return <div className="text-center">CPF</div>;
    },
    cell: ({ row }) => (
      <div className="text-center">{`${maskCpf(row.original.CPF)}`}</div>
    ),
  },
  {
    accessorKey: "nome",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nome
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{`${row.original.nome}`}</div>
    ),
  },
  {
    accessorKey: "email",
    header: () => {
      return <div className="text-center">Email</div>;
    },
    cell: ({ row }) => (
      <div className="text-center">{`${row.original.email}`}</div>
    ),
  },
  {
    accessorKey: "Opçoes",
    header: () => <div className="text-right">Opções</div>,
    cell: ({ row }) => {
      const member = row.original;
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
              <DropdownMenuLabel>Selecione</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(member.id)}
              >
                Copiar ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link href={`/team/${member.id}`}>
                <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
