"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  IMultipleForm,
  MultipleFormSchema,
  MultipleCheckBoxOptions,
} from "@/types/types";
import MultipleAreaInputs from "./MultipleAreaInputs";
import { useEditalStore } from "@/store/EditalRegister";
import { useEffect } from "react";



interface CheckboxFormMultiploProps {
  opcoes: MultipleCheckBoxOptions[];
  onSubmit: (opcoes: MultipleCheckBoxOptions[]) => void;
  onReset: () => void;
  opcoesSelecionadas: MultipleCheckBoxOptions[];
  labelSelecionados: string;
}

export default function CheckboxFormMultiplo({
  opcoes,
  onSubmit,
  onReset,
  opcoesSelecionadas,
}: CheckboxFormMultiploProps) {
  const { alterarPermissaoConsultor } = useEditalStore();
  
  const form = useForm<IMultipleForm>({
    resolver: zodResolver(MultipleFormSchema),
    defaultValues: {
      options: opcoesSelecionadas.map((opcao) => opcao.label),
    },
  });
  
  useEffect(() => {
    alterarPermissaoConsultor(false);

  } ,[alterarPermissaoConsultor]);

  function handleSubmit(data: IMultipleForm) {
    onSubmit(
      data.options
        .map((label) => opcoes.find((o) => o.label === label))
        .filter(
          (opcao): opcao is MultipleCheckBoxOptions => opcao !== undefined
        )
    );
  }

  const temOpcoes = opcoesSelecionadas.length > 0;

  return temOpcoes ? (
    <div className="flex flex-col gap-4">
      <MultipleAreaInputs areas={opcoesSelecionadas} />
      <Button onClick={onReset} variant="ghost">
        Selecionar Novamente
      </Button>
    </div>
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="options"
          render={() => (
            <FormItem>
              <FormDescription>Selecione pelo menos uma opção:</FormDescription>
              <div className="flex flex-wrap gap-2">
                {opcoes.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="options"
                    render={({ field }) => (
                      <FormItem className="flex gap-3 items-center justify-center">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.label)}
                            onCheckedChange={(checked) =>
                              checked
                                ? field.onChange([...field.value, item.label])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.label
                                    )
                                  )
                            }
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={Object.keys(form.formState.errors).length > 0}
        >
          Confirmar Seleção
        </Button>
      </form>
    </Form>
  );
}
