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

interface IMultipleAreaInputs {
  onFormSubmit?: (data: any) => void;
  onFormReset?: () => void;
  areas?: MultipleCheckBoxOptions[];
  consultantId?: string;
}
//TODO - Implementar a lógica de MultipleAreaInputs para que renderize por area selecioanda, um input multiplo de file para e vincule todos esses arquivos a uma areaId e ao id do Consultor
export default function MultipleAreaInputs({
  onFormReset,
  onFormSubmit,
  areas,
  consultantId,
}: IMultipleAreaInputs) {
  // Eses tipos estao todos errados, preciso corrigir
  const form = useForm<IArquivosTecnicos>({
    resolver: zodResolver(ArquivosTecnicosSchema),
    defaultValues: { areaId: "", consultantId: "", arquivosTecnicos: [] },
  });

  const handleSubmit = (data: IArquivosTecnicos) => {
    const hasFilesForAllAreas = areas?.every(
      (area) => console.log(data.arquivosTecnicos, area)

      // data.arquivosTecnicos.some((file) => file.areaId === area.id)
    );

    if (!hasFilesForAllAreas) {
      toast.error("Please upload at least one file for each area.");
      return;
    }

    if (onFormSubmit) {
      onFormSubmit(data);
    }
  };

  const handleReset = () => {
    form.reset();
    if (onFormReset) {
      onFormReset();
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
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
                          const updatedFiles = Array.from(files).map(
                            (file) => ({
                              file,
                              areaId: area.id,
                            })
                          );
                          form.setValue("arquivosTecnicos", [
                            ...field.value,
                            ...updatedFiles,
                          ]);
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
          <div className="flex gap-4 mt-4">
            <Button type="submit" className="w-full">
              Prepara Documentos
            </Button>
            <Button type="button" className="w-full" onClick={handleReset}>
              Recadastrar
            </Button>
            <Button
              type="button"
              className="w-full"
              onClick={() => console.log(form.formState.errors)}
            >
              Logar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
