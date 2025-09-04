import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEditalStore } from "@/store/EditalRegister";
import { toast } from "sonner";

interface Level {
  id: number;
  name: string;
  subLevels: Level[];
}
import { Limites } from "@/lib/utils";

interface SelectAreaProps {
  data: Level[];
  limites: Limites;
}

const SelectArea: React.FC<SelectAreaProps> = ({ data, limites }) => {
  const [selectedAreas, setSelectedAreas] = useState<Level[]>([]);
  const { inserirArea, Qualificacao } = useEditalStore();
  const [existeSubniveis, setExisteSubniveis] = useState(false);

  const handleSelect = (levelId: number, name: string, depth: number) => {
    const newSelection = [...selectedAreas];
    newSelection[depth] = { id: levelId, name, subLevels: [] };
    setSelectedAreas(newSelection.slice(0, depth + 1));
  };

  const setAreaOnStore = (): void => {
    const nomeAreaSelecionada = selectedAreas[selectedAreas.length - 1]?.name;
    const idAreaSelecionada = selectedAreas[selectedAreas.length - 1]?.id;

    const nivelAtual = selectedAreas.length;
    const chaveLimite = `LimiteMaximoNivel${nivelAtual}` as keyof Limites;
    const limite = limites[chaveLimite];

    const areasNoMesmoNivel = Qualificacao.filter(
      (area) => area.subLevels.length === nivelAtual - 1
    );

    if (limite !== null && areasNoMesmoNivel.length >= limite) {
      toast.error(
        `Você só pode selecionar até ${limite} áreas no nível ${nivelAtual}`
      );
      return;
    }

    if (nomeAreaSelecionada) {
      const areaExists = Qualificacao.some(
        (area) => area.name === nomeAreaSelecionada
      );

      if (areaExists) {
        toast.error("A área selecionada já está inclusa");
      } else {
        const novaArea = {
          name: nomeAreaSelecionada,
          areaId: idAreaSelecionada.toString(),
          Consultores: [],
          AreaDocuments: [],
          subLevels: selectedAreas
            .slice(0, -1)
            .map((area) => area.id.toString()),
        };
        inserirArea(novaArea);
        setSelectedAreas([]);
      }
    } else {
      toast.error("Nenhuma área foi selecionada");
    }
  };

  const renderSelects = (levels: Level[], depth = 0): JSX.Element => {
    return (
      <div>
        <Select
          onValueChange={(value) => {
            const selectedLevel = levels.find(
              (level) => level.id === Number(value)
            );
            if (selectedLevel) {
              setExisteSubniveis(selectedLevel.subLevels.length > 0);
              handleSelect(selectedLevel.id, selectedLevel.name, depth);
            }
          }}
        >
          <SelectTrigger>
            <SelectValue
              placeholder={`Selecione sua ${depth === 0 ? "Área" : "Subárea"}`}
            />
          </SelectTrigger>
          <SelectContent>
            {levels.map((level) => (
              <SelectItem key={level.id} value={level.id.toString()}>
                {level.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedAreas[depth] &&
          selectedAreas[depth].id &&
          (
            levels.find((l) => l.id === selectedAreas[depth].id)?.subLevels ??
            []
          ).length > 0 && (
            <div className="ml-4 mt-4">
              {renderSelects(
                levels.find((l) => l.id === selectedAreas[depth].id)!.subLevels,
                depth + 1
              )}
            </div>
          )}
      </div>
    );
  };

  return (
    <div>
      <h3>Selecione a área desejada:</h3>
      {renderSelects(data)}
      <Button
        className="m-5 bg-gradient-primary hover:shadow-lg hover:shadow-gray-500/40 transition-all disabled:cursor-not-allowed disabled:pointer-events-auto disabled:shadow-none"
        onClick={setAreaOnStore}
        disabled={selectedAreas.length === 0 || existeSubniveis}
      >
        Confirmar Seleção
      </Button>
    </div>
  );
};

export default SelectArea;
