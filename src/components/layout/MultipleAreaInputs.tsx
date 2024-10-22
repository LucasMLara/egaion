import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArquivosTecnicosSchema,
  IArquivosTecnicos,
  MultipleCheckBoxOptions,
} from "@/types/types";
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
  areas?: MultipleCheckBoxOptions[];
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})}>
          {areas?.map((area) => (
            <FormField
              key={area.id}
              control={form.control}
              name="arquivosTecnicos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{area.label}</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      multiple
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files) {
                          form.setValue("arquivosTecnicos", Array.from(files));
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.arquivosTecnicos?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          ))}
        </form>
      </Form>
    </div>
  );
}
