import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArquivosTecnicosSchema, IArquivosTecnicos } from "@/types/types";
import { useEditalStore } from "@/store/EditalRegister";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRef } from "react";

interface IMultipleAreaInputs {
  onSubmit?: (data: any) => void;
  onReset?: () => void;
  areas?: { name: string; id: string }[];
  consultantId?: string;
}
//TODO - Implementar a lógica de MultipleAreaInputs para que renderize por area selecioanda, um input multiplo de file para e vincule todos esses arquivos a uma areaId e ao id do Consultor
export default function MultipleAreaInputs({
  onReset,
  onSubmit,
  areas,
  consultantId,
}: IMultipleAreaInputs) {
  // Eses tipos estao todos errados, preciso corrigir
  const form = useForm<IArquivosTecnicos>({
    resolver: zodResolver(ArquivosTecnicosSchema),
    defaultValues: { areaId: "", consultantId: "", arquivosTecnicos: [] },
  });

  return (
    <div>
      Eu preciso colocar um Input de File Múltiplo com validação de pelo menos 1
      arquivo inserido por input, esses inputs tem como label , a área
      selecionada anteriormente e eu preciso vincular todos os files do input à
      esse ID da área
    </div>
  );
}
