import CreateConsultant from "./CreateConsultant";
import ConsultantTable from "../ConsultantTable/ConsultantTable";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IMultipleForm, MultipleFormSchema } from "@/types/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEditalStore } from "@/store/EditalRegister";
import { Button } from "@/components/ui/button";
import CheckboxFormMultiplo from "./CheckBoxForm";
import { useState } from "react";
export default function ConsultantsArea() {
  const [areasSelecionadas, setAreasSelecionadas] = useState<string[]>([]);
  const { Consultores, Qualificacao } = useEditalStore();
  const areasPreSelecionadas = Qualificacao.map(({ name, areaId }) => ({
    value: name,
    label: name,
    id: areaId,
  }));

  function handleAreasSubmit(areas: string[]) {
    setAreasSelecionadas(areas);
  }

  function handleReset() {
    setAreasSelecionadas([]);
  }

  const form = useForm<IMultipleForm>({
    resolver: zodResolver(MultipleFormSchema),
    defaultValues: {
      options: areasSelecionadas,
    },
  });

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
                <Button className="w-full flex items-center">
                  Adicionar Consultor
                </Button>
              </DialogTrigger>
            )}
            <DialogContent>
              <DialogTitle>Insira os Dados do seu consultor:</DialogTitle>
              <DialogDescription>
                Atente-se aos dados inseridos antes de submeter as informações
              </DialogDescription>
              <CreateConsultant />
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
