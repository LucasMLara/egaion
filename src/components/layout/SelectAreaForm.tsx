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
import { nanoid } from "nanoid";

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
  const { inserirArea } = useEditalStore();

  const handleSelect = (levelId: number, name: string, depth: number) => {
    const newSelection = [...selectedAreas];
    newSelection[depth] = { id: levelId, name, subLevels: [] };
    setSelectedAreas(newSelection.slice(0, depth + 1));
  };

  const setAreaOnStore = (): void => {
    const ultimaAreaSelecionada = selectedAreas[selectedAreas.length - 1]?.name;
    const uniqueId = nanoid();
    if (ultimaAreaSelecionada) {
      const novaArea = {
        naturezaPrestacao: [],
        name: ultimaAreaSelecionada,
        areaId: uniqueId,
        Consultores: [],
        AreaDocuments: [],
      };
      // console.log("Nova área:", novaArea);
      inserirArea(novaArea);
      setSelectedAreas([]); // Reset selections after confirmation
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

        {/* Render sublevels if available */}
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
        disabled={selectedAreas.length === 0} // Disable button if no area selected
      >
        Confirmar Seleção
      </Button>
    </div>
  );
};

export default SelectArea;
