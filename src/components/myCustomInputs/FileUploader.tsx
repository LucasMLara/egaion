import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import React from "react";
import { IDocInput } from "@/types/types";

export default function FileUploader({
  arquivo,
  label,
  onchange,
  titulo,
}: IDocInput) {
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
      <Separator />
    </div>
  );
}
