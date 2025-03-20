import { useEffect, useState } from "react";
import { ChevronsUpDown, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEditalStore } from "@/store/EditalRegister";

export default function LocalidadesForm() {
  const {
    LocalidadesDisponiveis,
    limitesDeLocalidade,
    inserirLocalidadesDoConsultor,
    localidadesDoConsultor,
  } = useEditalStore();
  const [open, setOpen] = useState(false);

  function handleSelectLocalidade(localidade: { nome: string; id: string }) {
    const localidadeJaAdicionada = localidadesDoConsultor.find(
      (loc) => loc.idSCLocalidade === localidade.id
    );
    if (localidadeJaAdicionada) {
      toast.error("Localidade já adicionada");
      return;
    }

    inserirLocalidadesDoConsultor([
      ...localidadesDoConsultor,
      { nome: localidade.nome, idSCLocalidade: localidade.id },
    ]);
    setOpen(false);
  }

  useEffect(() => {
    if (
      localidadesDoConsultor.length >=
      limitesDeLocalidade.QuantidadeMaximaLocalidade
    ) {
      toast.error(
        `Limite de localidades atingido, máximo de ${limitesDeLocalidade.QuantidadeMaximaLocalidade} localidades`
      );
      return;
    }
  }, [localidadesDoConsultor, limitesDeLocalidade.QuantidadeMaximaLocalidade]);

  return (
    <div className="flex flex-col gap-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-52 justify-between"
          >
            Selecione a localidade
            <ChevronsUpDown className="ml-2 size-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-52 p-0">
          <Command>
            <CommandInput placeholder="Procure sua localidade" />
            <CommandList>
              <CommandEmpty>Localidade Não encontrada</CommandEmpty>
              <CommandGroup>
                {LocalidadesDisponiveis.map((localidade) => (
                  <CommandItem
                    className="flex items-center justify-center"
                    key={localidade.idSCLocalidade}
                    value={localidade.nome}
                    onSelect={(currentValue) => {
                      handleSelectLocalidade({
                        nome: currentValue,
                        id: localidade.idSCLocalidade,
                      });
                    }}
                  >
                    {localidade.nome}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {localidadesDoConsultor.length > 0
        ? `Selecionados  ${localidadesDoConsultor.length} das ${limitesDeLocalidade.QuantidadeMaximaLocalidade} localidades disponíveis`
        : null}
      <div className="flex flex-wrap gap-2 m-3">
        {localidadesDoConsultor.map((localidade, index) => (
          <Badge
            key={localidade.idSCLocalidade}
            className="flex items-center"
            variant="secondary"
          >
            {`${index + 1} - ${localidade.nome}`}
            <Trash2Icon
              onClick={() =>
                inserirLocalidadesDoConsultor(
                  localidadesDoConsultor.filter((loc) => loc !== localidade)
                )
              }
              className="ml-2 hover:text-red-500 hover:scale-110 transition-all cursor-pointer size-4"
              aria-label={`Remove ${localidade}`}
            />
          </Badge>
        ))}
      </div>
    </div>
  );
}
