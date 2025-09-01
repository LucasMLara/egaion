import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  fileInputSchema,
  FileInputForm,
  MultipleCheckBoxOptions,
} from "@/types/types";
import { useEditalStore } from "@/store/EditalRegister";
import { Checkbox } from "@/components/ui/checkbox";
import { naturezasPrestacao } from "@/mocks";

interface MultipleAreaInputsProps {
  areas: { id: string; label: string }[];
  onFormSubmit?: (data: FileInputForm) => void;
  onFormReset?: () => void;
}

const MultipleAreaInputs: React.FC<MultipleAreaInputsProps> = ({
  areas,
  onFormSubmit,
  onFormReset,
}) => {
  const [submittedData, setSubmittedData] = useState<FileInputForm | null>(
    null
  );

  const {
    alterarPermissaoConsultor,
    removeConsultantAreaDocuments,
    insertConsultantAreaDocuments,
    setConsultantNaturezasPorAreas,
    Qualificacao,
  } = useEditalStore();

  const { control, handleSubmit, formState, reset } = useForm<FileInputForm>({
    resolver: zodResolver(fileInputSchema),
    defaultValues: {
      arquivosTecnicos: areas.map((area) => ({
        areaId: area.id,
        files: [],
        areaName: area.label,
        naturezas: [],
      })),
    },
  });

  const { errors } = formState;

  const onSubmit = ({ arquivosTecnicos }: FileInputForm) => {
    const hasFilesForAllAreas = arquivosTecnicos.every(
      (input) => input.files.length > 0
    );

    if (!hasFilesForAllAreas) {
      toast.error("Por favor, insira um arquivo para cada área selecionada!");
      return;
    }
    setSubmittedData({ arquivosTecnicos });

    toast.success("Arquivos preparados com sucesso!");
    if (onFormSubmit) {
      onFormSubmit({ arquivosTecnicos });
    }
    const transformedData: MultipleCheckBoxOptions[] = arquivosTecnicos.map(
      (item) => ({
        id: item.areaId,
        label: item.areaName,
        value: item.areaId,
      })
    );

    insertConsultantAreaDocuments(arquivosTecnicos);
    setConsultantNaturezasPorAreas(transformedData);
    alterarPermissaoConsultor(true);
  };

  const handleReset = () => {
    reset();
    setSubmittedData(null);
    if (onFormReset) {
      onFormReset();
    }
    removeConsultantAreaDocuments();
    alterarPermissaoConsultor(false);
  };

  // const todasAsAreasPossuemPeloMenosUmaNaturezaSelecionada = Qualificacao.every(
  //   (area) => area.naturezaPrestacao.length > 0
  // );

  const areasSemNatureza = Qualificacao.filter(
    ({ naturezaPrestacao }) => naturezaPrestacao.length === 0
  );

  return (
    <div>
      {submittedData ? (
        <div>
          {submittedData.arquivosTecnicos.map((area) => (
            <div key={area.areaId} className="mb-4">
              <h3 className="text-lg font-semibold mb-2">
                {areas.find((a) => a.id === area.areaId)?.label}
              </h3>
              <ul className="list-disc list-inside">
                {area.files.map((file, index) => (
                  <li key={index} className="text-blue-500 underline">
                    <a
                      href={URL.createObjectURL(file)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {file.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Button type="button" onClick={handleReset} className="m-1 w-full">
            Recadastrar Documentos
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {areas.map((area, index) => (
            <div key={area.id} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {area.label}
              </label>
              <Controller
                control={control}
                name={`arquivosTecnicos.${index}.files`}
                render={({ field }) => (
                  <Input
                    type="file"
                    accept="application/pdf, image/jpeg, image/jpg"
                    multiple
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files) {
                        field.onChange(Array.from(files));
                      }
                    }}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                  />
                )}
              />
              {/* <Controller
                name={`arquivosTecnicos.${index}.naturezas`}
                control={control}
                render={({ field }) => (
                  <div>
                    <span className="my-2 block">
                      Prestação de Serviços para {area.label}
                    </span>
                    <div className="flex gap-3 items-center justify-center">
                      {naturezasPrestacao.map(({ id, label }) => {
                        const uniqueId = `${id}-${area.id}`;
                        return (
                          <Label
                            key={uniqueId}
                            className="text-center m-2"
                            htmlFor={uniqueId}
                          >
                            {label}
                            <Checkbox
                              id={uniqueId}
                              className="mx-2"
                              checked={field.value?.includes(id)}
                              onCheckedChange={(checked) => {
                                field.onChange(
                                  checked
                                    ? [...(field.value || []), id]
                                    : field.value?.filter(
                                        (value) => value !== id
                                      )
                                );
                              }}
                            />
                          </Label>
                        );
                      })}
                    </div>
                  </div>
                )}
              /> */}

              {errors.arquivosTecnicos?.[index]?.files && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.arquivosTecnicos[index].files.message}
                </p>
              )}
            </div>
          ))}
          <div className="flex gap-4 mt-4">
            <Button
              type="submit"
              className="w-full"
              disabled={Object.keys(errors).length > 0}
            >
              Validar Documentos
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default MultipleAreaInputs;
