import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Controller, useFormContext } from "react-hook-form";


interface FileInputProps {
  name: string;
  label: string;
}

const FileInput: React.FC<FileInputProps> = ({ name, label }) => {
  const { control, setValue, formState } = useFormContext();
  const { errors } = formState;

console.log(errors)


  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            {field.value ? (
              <div className="flex flex-col justify-center w-full gap-1 m-2">
                <a
                  href={URL.createObjectURL(field.value)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {label}
                </a>
                <Button
                  variant="ghost"
                  onClick={() => setValue(name, null)}
                  className="ml-2"
                >
                  Remover
                </Button>
              </div>
            ) : (
              <div className="w-full ">
                <div className="flex flex-col justify-items-center gap-1 m-2">
                  <Label htmlFor={name}>{label}</Label>
                  <Label> Selecione seu arquivo clicando na área abaixo</Label>
                </div>
                <Input
                  type="file"
                  accept="application/pdf, image/jpeg, image/jpg"
                  onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                />
              </div>
            )}
          </div>
        </div>
      )}
    />
  );
};

export default FileInput;
