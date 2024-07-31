import React from "react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HomeIcon, FileTextIcon, UsersIcon, EditIcon } from "lucide-react";

export default function DrawerMenu() {
  return (
    <div className="w-24 h-full bg-neutral-400 flex flex-col items-center justify-center gap-16">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/home">
              <HomeIcon className="size-6 stroke-black hover:stroke-primary-400 hover:scale-110 transition-all" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Início</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/team">
              <UsersIcon className="size-6 stroke-black hover:stroke-primary-400 hover:scale-110 transition-all" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Equipe Técnica</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="editais">
              <EditIcon className="size-6 stroke-black hover:stroke-primary-400 hover:scale-110 transition-all" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Editais</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="docs">
              <FileTextIcon className="size-6 stroke-black hover:stroke-primary-400 hover:scale-110 transition-all" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Documentação</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
