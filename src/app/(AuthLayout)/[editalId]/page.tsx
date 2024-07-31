import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function page({
  params,
}: {
  params: {
    editalId: string;
  };
}) {
  const currentDate = new Date().toLocaleDateString("pt-BR");

  return (
    <section className="h-full grid grid-rows-2 gap-4 overflow-y-hidden">
      <div className="border-2 rounded-xl overflow-auto m-4 bg-neutral-300 text-neutral-600">
        <h1 className="text-center m-4 text-2xl font-bold">
          {" "}
          Edital : {params.editalId}{" "}
        </h1>
        <h2 className="text-center text-lg">Data: {currentDate}</h2>
        <p className="text-center m-4">
          {" "}
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun{" "}
        </p>
        <p className="text-center m-4">
          {" "}
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun{" "}
        </p>
        <p className="text-center m-4">
          {" "}
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun{" "}
        </p>
        <p className="text-center m-4">
          {" "}
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun{" "}
        </p>
        <p className="text-center m-4">
          {" "}
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun{" "}
        </p>
        <p className="text-center m-4">
          {" "}
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun{" "}
        </p>
        <p className="text-center m-4">
          {" "}
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun{" "}
        </p>
        <p className="text-center m-4">
          {" "}
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun{" "}
        </p>
        <p className="text-center m-4">
          {" "}
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun{" "}
        </p>
        <p className="text-center m-4">
          {" "}
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
          ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
          lorem ipsun lorem ipsun{" "}
        </p>
      </div>
      <div className="overflow-auto border-t-2 rounded-xl m-6">
        <h1 className="text-center m-4 text-2xl font-bold">
          Dados e documentos Obrigatórios
        </h1>
        <div className="grid sm:grid-cols-2 gap-4 m-1">
          <div className="grid gap-2">
            <Label htmlFor="doc1">Documento 1</Label>
            <Input className="transition-all" id="doc1" type="file" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="doc1">Documento 1</Label>
            <Input className="transition-all" id="doc1" type="file" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="doc1">Documento 1</Label>
            <Input className="transition-all" id="doc1" type="file" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="doc1">Documento 1</Label>
            <Input className="transition-all" id="doc1" type="file" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="doc1">Documento 1</Label>
            <Input className="transition-all" id="doc1" type="file" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="doc1">Documento 1</Label>
            <Input className="transition-all" id="doc1" type="file" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="doc1">Documento 1</Label>
            <Input className="transition-all" id="doc1" type="file" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="doc1">Documento 1</Label>
            <Input className="transition-all" id="doc1" type="file" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="doc1">Documento 1</Label>
            <Input className="transition-all" id="doc1" type="file" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="doc1">Documento 1</Label>
            <Input className="transition-all" id="doc1" type="file" />
          </div>
        </div>
        <Button className="flex float-end m-5 bg-gradient-primary">
          Cadastrar
        </Button>
      </div>
    </section>
  );
}
