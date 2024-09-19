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

interface Level {
  id: number;
  name: string;
  subLevels: Level[];
}

interface SelectAreaProps {
  data: Level[];
}

const SelectArea: React.FC<SelectAreaProps> = ({ data }) => {
  const [selectedAreas, setSelectedAreas] = useState<Level[]>([]);
  const [selectedStoreAreas] = useState<string[]>([]);
  const {
    editalData: {
      Qualificacao: { areas },
    },
    inserirArea,
  } = useEditalStore();

  const handleSelect = (levelId: number, name: string, depth: number) => {
    const newSelection = [...selectedAreas];
    newSelection[depth] = { id: levelId, name, subLevels: [] };
    setSelectedAreas(newSelection.slice(0, depth + 1));
  };

  const setAreaOnStore = (): void => {
    const ultimaAreaSelecionada = selectedAreas[selectedAreas.length - 1]?.name;
    setSelectedAreas([]);
    if (ultimaAreaSelecionada) {
      inserirArea(ultimaAreaSelecionada);
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
              handleSelect(selectedLevel.id, selectedLevel.name, depth);
            }
          }}
        >
          <SelectTrigger>
            <SelectValue
              placeholder={`Selecione sua ${depth === 0 ? "Area" : "Subarea"}`}
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
        onClick={() => setAreaOnStore()}
      >
        Confirmar Seleção
      </Button>
    </div>
  );
};

export default SelectArea;
