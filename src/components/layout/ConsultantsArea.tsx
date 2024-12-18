import CreateConsultant from "./CreateConsultant";
import ConsultantTable from "../ConsultantTable/ConsultantTable";

import { MultipleCheckBoxOptions } from "@/types/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useEditalStore } from "@/store/EditalRegister";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
export default function ConsultantsArea() {


  const {
    Consultores,
    Qualificacao,
    Documentos,
    alterarPermissaoEdital,
  } = useEditalStore();

  useEffect(() => {
    Qualificacao.map(({ naturezaPrestacao, AreaDocuments }) => {
      if (
        naturezaPrestacao.length === 0 ||
        AreaDocuments.length === 0 ||
        Consultores.length === 0 ||
        Documentos.length === 0
      ) {
        alterarPermissaoEdital(false);
      } else {
        alterarPermissaoEdital(true);
      }
    });
  }, [Qualificacao, alterarPermissaoEdital, Documentos, Consultores]);

  if (Qualificacao.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Não há áreas cadastradas
        </h1>
        <p className="text-lg text-gray-600 text-center">
          Por favor, cadastre as áreas antes de adicionar consultores
        </p>
      </div>
    );

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="md:w-64 w-full my-10 flex items-center">
            Adicionar Membro de Equipe
          </Button>
        </DialogTrigger>
        <DialogContent className="md:min-w-[720px] overflow-y-auto h-2/6 md:h-1/2">
            <DialogTitle>Insira os Dados do seu consultor:</DialogTitle>
              <DialogDescription>
                Atente-se aos dados inseridos antes de submeter as informações
              </DialogDescription>
          <CreateConsultant />
        </DialogContent>
      </Dialog>
      {Consultores.length > 0 && (
        <div className="flex gap-2 justify-evenly m-2 ">
          <ConsultantTable />
        </div>
      )}
    </div>
  );
}
