"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { mockInputsConsultor } from "@/mocks";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";

const consultantSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  CPF: z.string().min(11, "CPF deve ter no mínimo 11 caracteres"),
  email: z.string().email("Email inválido"),
  confirmEmail: z.string().email("Email inválido"),
  contato: z.string().min(10, "Telefone deve ter no mínimo 10 caracteres"),
  documentos: z.array(
    z.object({
      key: z.string(),
      file: z.any(),
    })
  ),
});

type DocumentError = { _errors: string[] };

type ConsultantError = {
  nome?: { _errors: string[] };
  CPF?: { _errors: string[] };
  email?: { _errors: string[] };
  confirmEmail?: { _errors: string[] };
  contato?: { _errors: string[] };
  documentos?: { file: DocumentError }[];
  id?: number;
};

type ErrorsState = Record<number, ConsultantError>;

export default function CreateConsultant() {
  const [consultants, setConsultants] = useState<ConsultantError[]>([
    { id: 1 },
  ]);
  const [errors, setErrors] = useState<ErrorsState>({});

  const addConsultant = () => {
    setConsultants([...consultants, { id: consultants.length + 1 }]);
  };

  const isAddConsultantDisabled = () => {
    return consultants.some((_, index) => {
      const currentErrors = errors[index];
      return (
        !currentErrors || // No errors object yet
        Object.keys(currentErrors).length > 0 // There are validation errors
      );
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const consultantsData = consultants.map((consultant) => {
      const documents = mockInputsConsultor[0].documentoConsultor.map(
        (input) => {
          const key = Object.keys(input)[0];
          return {
            key,
            file: formData.get(`${key}-${consultant.id}`),
          };
        }
      );
      return {
        nome: formData.get(`nome-${consultant.id}`),
        CPF: formData.get(`CPF-${consultant.id}`),
        email: formData.get(`email-${consultant.id}`),
        confirmEmail: formData.get(`confirmEmail-${consultant.id}`),
        contato: formData.get(`contato-${consultant.id}`),
        documentos: documents,
      };
    });

    const validationResults = consultantsData.map((data) =>
      consultantSchema.safeParse(data)
    );
    const hasErrors = validationResults.some((result) => !result.success);

    if (hasErrors) {
      const newErrors = validationResults.reduce(
        (acc: Record<number, any>, result, index) => {
          if (!result.success) {
            acc[index] = result.error.format();
          }
          return acc;
        },
        {}
      );
      setErrors(newErrors);
    } else {
      setErrors({});
      console.log("Form data is valid:", consultantsData);
    }
  };

  return (
    <section className="my-6">
      <h1 className="text-2xl font-bold text-neutral-700 text-center">
        Cadastrar Consultor
      </h1>
      <form className="flex flex-col m-9 gap-6" onSubmit={handleSubmit}>
        {consultants.map((consultant, index) => (
          <div key={consultant.id} className="flex flex-col gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2 my-2 flex-grow">
                <Label htmlFor={`nome-${consultant.id}`}>Nome</Label>
                <Input
                  className="transition-all w-full"
                  id={`nome-${consultant.id}`}
                  type="text"
                  name={`nome-${consultant.id}`}
                />
                {errors[index]?.nome && (
                  <span className="text-red-500">
                    {errors[index].nome._errors[0]}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 my-2 flex-grow">
                <Label htmlFor={`CPF-${consultant.id}`}>CPF</Label>
                <Input
                  className="transition-all w-full"
                  id={`CPF-${consultant.id}`}
                  type="text"
                  name={`CPF-${consultant.id}`}
                />
                {errors[index]?.CPF && (
                  <span className="text-red-500">
                    {errors[index].CPF._errors[0]}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 my-2 flex-grow">
                <Label htmlFor={`email-${consultant.id}`}>Email</Label>
                <Input
                  className="transition-all w-full"
                  id={`email-${consultant.id}`}
                  type="email"
                  name={`email-${consultant.id}`}
                  placeholder="egaion@pentago.com.br"
                />
                {errors[index]?.email && (
                  <span className="text-red-500">
                    {errors[index].email._errors[0]}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 my-2 flex-grow">
                <Label htmlFor={`confirmEmail-${consultant.id}`}>
                  Confirmar E-mail
                </Label>
                <Input
                  className="transition-all w-full"
                  id={`confirmEmail-${consultant.id}`}
                  type="email"
                  name={`confirmEmail-${consultant.id}`}
                  placeholder="egaion@pentago.com.br"
                />
                {errors[index]?.confirmEmail && (
                  <span className="text-red-500">
                    {errors[index].confirmEmail._errors[0]}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 my-2 flex-grow">
                <Label htmlFor={`contato-${consultant.id}`}>Telefone</Label>
                <Input
                  className="transition-all w-full"
                  id={`contato-${consultant.id}`}
                  type="text"
                  name={`contato-${consultant.id}`}
                />
                {errors[index]?.contato && (
                  <span className="text-red-500">
                    {errors[index].contato._errors[0]}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-wrap m-3 p-3 gap-3">
              {mockInputsConsultor[0].documentoConsultor.map((input, idx) => {
                const key = Object.keys(input)[0];
                const value = Object.values(input)[0];
                return (
                  <div key={idx} className="flex flex-col gap-2 my-2 flex-grow">
                    <Label htmlFor={`${key}-${consultant.id}`}>{value}</Label>
                    <Input
                      className="transition-all w-full"
                      id={`${key}-${consultant.id}`}
                      type="file"
                      name={`${key}-${consultant.id}`}
                    />
                    {errors[index]?.documentos?.[idx]?.file && (
                      <span className="text-red-500">
                        {errors[index].documentos[idx].file._errors[0]}
                      </span>
                    )}
                  </div>
                );
              })}
              <Separator />
            </div>
          </div>
        ))}
        <div className="w-full flex justify-end mt-4 gap-4">
          <Button
            type="button"
            className="bg-gradient-primary hover:shadow-lg hover:shadow-gray-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-auto disabled:shadow-none w-64"
            onClick={addConsultant}
          >
            Adicionar consultor
          </Button>
          <Button
            type="submit"
            className="bg-gradient-primary hover:shadow-lg hover:shadow-gray-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-auto disabled:shadow-none w-64"
          >
            Cadastrar
          </Button>
        </div>
      </form>
    </section>
  );
}
