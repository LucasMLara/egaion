import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

import React from "react";
import { IDocInput } from "@/types/types";

export default function FileUploader({
  arquivo,
  label,
  onchange,
  padrao,
  titulo,
}: IDocInput) {
  const [, setArquivoPadrao] = useState(padrao);
  return (
    <div className="grid md:grid-cols-[1fr_3fr] m-8">
      <Label className="my-5" htmlFor={titulo}>
        {label}
      </Label>
      <Input
        className="transition-all"
        id={titulo}
        type="file"
        value={arquivo}
        onChange={onchange}
      />
      <div className="flex items-center gap-2">
        <p className="text-sm">Documento Padrão ?</p>
        <Checkbox
          className="transition-all m-2"
          id="inscricaoCnpjPadrao"
          checked={padrao}
          onChange={(ps) => setArquivoPadrao(!ps)}
        />
      </div>
      <Separator />
    </div>
  );
}
