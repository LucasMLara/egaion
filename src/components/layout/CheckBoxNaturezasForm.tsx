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
import { useEditalStore } from "@/store/EditalRegister";
import { useState, useEffect } from "react";
import { toast } from "sonner";
interface CheckboxFormMultiploProps {
  opcoes: MultipleCheckBoxOptions[];
  onSubmit: (opcoes: MultipleCheckBoxOptions[]) => void;
  onReset: () => void;
  opcoesSelecionadas: MultipleCheckBoxOptions[];
  labelSelecionados: string;
  hasError?: boolean;
  onErrorChange?: (error: boolean) => void;
}
export default function CheckboxFormMultiplo({
  opcoes,
  onSubmit,
  onReset,
  opcoesSelecionadas,
  labelSelecionados,
  hasError = false,
  onErrorChange,
}: CheckboxFormMultiploProps) {
  const [submittedAreas, setSubmittedAreas] = useState(false);
  const [_, setError] = useState(hasError);
  const form = useForm<IMultipleForm>({
    resolver: zodResolver(MultipleFormSchema),
    defaultValues: {
      options: opcoesSelecionadas.map((opcao) => opcao.label),
    },
  });

  const { Qualificacao, activeArea } = useEditalStore();


  useEffect(() => {
    const formErrors = Object.keys(form.formState.errors).length > 0;
    setError(formErrors);
    onErrorChange?.(formErrors);
  }, [form.formState.errors, onErrorChange])

  useEffect(() => {
    const hasAreasPreviouslySelected = Qualificacao.some(
      (area) => area.areaId === activeArea && area.naturezaPrestacao.length > 0
    );

    hasAreasPreviouslySelected
      ? setSubmittedAreas(true)
      : setSubmittedAreas(false);
  }, [Qualificacao, activeArea]);

  function handleSubmit(data: IMultipleForm) {
    onSubmit(
      data.options
        .map((label) => opcoes.find((o) => o.label === label))
        .filter(
          (opcao): opcao is MultipleCheckBoxOptions => opcao !== undefined
        )
    );
    toast.success("Opções selecionadas com sucesso!");
  }

  return submittedAreas ? (
    <div className="flex flex-col gap-4">
      <h2>{labelSelecionados}</h2>
      <ul>
        {Qualificacao.map((area) =>
          area.naturezaPrestacao
            .filter((natureza) => natureza.areaId === activeArea)
            .map((natureza) => <li key={natureza.id}>{natureza.label}</li>)
        )}
      </ul>
      <Button onClick={onReset}>Selecionar Novamente</Button>
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
        <Button type="submit" className="w-full" disabled={Object.keys(form.formState.errors).length > 0}>
          Confirmar Seleção
        </Button>
      </form>
    </Form>
  );
}
