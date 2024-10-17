import React from "react";
import CreateConsultant from "./CreateConsultant";
import ConsultantTable from "../ConsultantTable/ConsultantTable";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEditalStore } from "@/store/EditalRegister";
import { Button } from "../ui/button";
export default function ConsultantsArea() {
  const { Consultores } = useEditalStore();
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="md:w-64 w-full m-10 flex items-center">
            Adicionar Consultor
          </Button>
        </DialogTrigger>
        {Consultores.length > 0 && (
          <div className="flex gap-2 justify-evenly m-2 ">
            <ConsultantTable />
          </div>
        )}
        <DialogContent className="md:min-w-[720px] overflow-y-auto h-5/6 md:h-3/4">
          <DialogTitle>Adicionar Consultor</DialogTitle>
          <DialogDescription>Preencha os dados do consultor</DialogDescription>
          <CreateConsultant />
        </DialogContent>
      </Dialog>
    </div>
  );
}
