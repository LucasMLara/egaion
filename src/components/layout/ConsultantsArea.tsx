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
import CheckboxFormMultiplo from "./CheckBoxInputAreaForm";
import { useEffect, useState, useMemo } from "react";
export default function ConsultantsArea() {
  const [areasSelecionadas, setAreasSelecionadas] = useState<
    MultipleCheckBoxOptions[]
  >([]);

  const {
    Consultores,
    Qualificacao,
    permissaoDeCadastroConsultor,
    Documentos,
    alterarPermissaoEdital,
  } = useEditalStore();
  const areasPreSelecionadas = Qualificacao.map(({ name, areaId }) => ({
    value: name,
    label: name,
    id: areaId,
  }));

  function handleAreasSubmit(areas: MultipleCheckBoxOptions[]) {
    setAreasSelecionadas(areas);
  }
  const handleConsultantAreas = useMemo(() => {
    return areasSelecionadas.map(({ id }) => id);
  }, [areasSelecionadas]);

  function handleReset() {
    setAreasSelecionadas([]);
  }

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
            Adicionar Consultor
          </Button>
        </DialogTrigger>
        <DialogContent className="md:min-w-[720px] overflow-y-auto h-2/6 md:h-1/2">
          <DialogTitle>Em quais áreas esse consultor irá atuar? </DialogTitle>
          <DialogDescription>
            Selecione uma ou mais áreas - (Lembre-se de selecionar todas as
            áreas previamente antes de adicionar seus consultores). Atente-se em
            anexar todos os documentos técnicos referentes À todas as áreas
            selecionadas
          </DialogDescription>
          <CheckboxFormMultiplo
            labelSelecionados="Áreas selecionadas para o seu consultor à cadastrar:"
            opcoes={areasPreSelecionadas}
            onSubmit={handleAreasSubmit}
            onReset={handleReset}
            opcoesSelecionadas={areasSelecionadas}
          />
          <Dialog>
            {areasSelecionadas.length > 0 && (
              <DialogTrigger asChild>
                <Button
                  className="w-full flex items-center"
                  disabled={permissaoDeCadastroConsultor}
                >
                  Adicionar Consultor
                </Button>
              </DialogTrigger>
            )}
            <DialogContent>
              <DialogTitle>Insira os Dados do seu consultor:</DialogTitle>
              <DialogDescription>
                Atente-se aos dados inseridos antes de submeter as informações
              </DialogDescription>
              <CreateConsultant consultantAreas={handleConsultantAreas} />
            </DialogContent>
          </Dialog>
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
