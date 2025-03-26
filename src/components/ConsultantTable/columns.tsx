"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { ConsultantRowDisplay } from "@/types/types";

const ConsultantActionsCell = ({
  consultant,
}: {
  consultant: ConsultantRowDisplay;
}) => {
  const removerConsultor = useEditalStore((state) => state.removerConsultor);
  const [open, setOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

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
          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
          >
            Ver Detalhes
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteConfirmation(true)}>
            Remover Consultor
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={deleteConfirmation} onOpenChange={setDeleteConfirmation}>
        <DialogContent>
          <DialogTitle>Remover Consultor</DialogTitle>
          <DialogDescription>
            <p>Tem certeza que deseja remover o consultor?</p>
          </DialogDescription>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() => {
                removerConsultor(consultant.id);
                setDeleteConfirmation(false);
              }}
            >
              Remover
            </Button>
            <Button
              onClick={() => setDeleteConfirmation(false)}
              variant={"ghost"}
            >
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Detalhes do Consultor</DialogTitle>
          <DialogDescription>
            <Tabs defaultValue="consultor">
              <TabsList>
                <TabsTrigger value="consultor">Dados Pessoais</TabsTrigger>
                <TabsTrigger value="areas">Áreas Cadastradas</TabsTrigger>
              </TabsList>
              <TabsContent value="consultor">
                <ul className="flex flex-col gap-2 h-full">
                  <li>
                    <strong>Nome:</strong> {consultant.nome}
                  </li>
                  <li>
                    <strong>CPF:</strong> {maskCpf(consultant.CPF)}
                  </li>
                  <li>
                    <strong>Email:</strong> {consultant.email}
                  </li>
                  <li>
                    <strong>Contato:</strong> {consultant.contato}
                  </li>
                </ul>
              </TabsContent>
              <TabsContent value="areas">
                <div className="flex flex-col gap-2">
                  {consultant.areas && consultant.areas.length > 0 ? (
                    consultant.areas.map((area, index) => (
                      <div key={index} className="border p-2 rounded">
                        {area.label}
                      </div>
                    ))
                  ) : (
                    <p>Nenhuma área cadastrada</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </DialogDescription>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
    cell: ({ row }) => <ConsultantActionsCell consultant={row.original} />,
  },
];
