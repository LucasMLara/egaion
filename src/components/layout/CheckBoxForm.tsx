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
import { NaturezaSchema, INatureza } from "@/types/types";
import { useEditalStore } from "@/store/EditalRegister";
import { naturezasPrestacao } from "@/mocks";
import { useEffect, useState } from "react";

export default function CheckboxFormMultiplo() {
  const {
    setNaturezaPrestacao,
    activeArea,
    Qualificacao,
    clearNaturezaPrestacao,
  } = useEditalStore();
  const form = useForm<INatureza>({
    resolver: zodResolver(NaturezaSchema),
    defaultValues: {
      naturezas: [],
    },
  });

  function onSubmit({ naturezas }: INatureza) {
    console.log(naturezas);
    setNaturezaPrestacao(naturezas, activeArea);
  }

  // useEffect(() => {

  //   const selectedArea = Qualificacao.find(
  //     (area) => area.areaId === activeArea
  //   );

  //   form.reset({
  //     naturezas: Array.isArray(selectedArea?.naturezaPrestacao)
  //       ? selectedArea.naturezaPrestacao.map((np) => np.label)
  //       : [],
  //   });

  // }, [activeArea, Qualificacao, form]);

  function handleReset() {
    console.log("xhama", activeArea);
    clearNaturezaPrestacao(activeArea);
    form.reset();
  }

  // console.log(
  //   Qualificacao.map((area) =>
  //     area.naturezaPrestacao
  //       .filter((natureza) => natureza.areaId === activeArea)
  //       .map((natureza) => natureza.label)
  //   )
  // );
  const currentArea = Qualificacao.find((area) => area.areaId === activeArea);
  const temNaturezas = currentArea
    ? currentArea.naturezaPrestacao.length > 0
    : false;

  return temNaturezas ? (
    <div className="flex flex-col gap-4">
      <h2>Naturezas Selecionadas: </h2>
      <ul>
        {/* {Qualificacao.map((area) =>
          area.naturezaPrestacao
            .filter((natureza) => natureza.areaId === activeArea)
            .map((natureza) => <li key={natureza.id}>{natureza.label}</li>)
        )} */}
        {Qualificacao.map(
          (area) =>
            area.naturezaPrestacao?.length > 0 &&
            area.naturezaPrestacao
              .filter((np) => np.areaId === activeArea)
              .map((natureza) => <li key={natureza.id}>{natureza.label}</li>)
        )}
      </ul>
      <Button onClick={handleReset}>Trocar</Button>
    </div>
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="naturezas"
          render={() => (
            <FormItem>
              <FormDescription>Selecione pelo menos uma opção:</FormDescription>
              <div className="flex flex-wrap gap-2">
                {naturezasPrestacao.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="naturezas"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.label)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.label])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.label
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
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
