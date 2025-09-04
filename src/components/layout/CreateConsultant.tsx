import React, { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  consultantSchema,
  IConsultant,
  MultipleCheckBoxOptions,
} from "@/types/types";
import { useEditalStore } from "@/store/EditalRegister";
import { nanoid } from "nanoid";

import { defineStepper } from "@stepperize/react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { formatCpf, formatPhone } from "@/lib/formatters";
import CheckboxFormMultiplo from "./CheckBoxInputAreaForm";
import LocalidadesForm from "./LocalidadesForm";

const { useStepper, steps, utils } = defineStepper(
  {
    id: "consultantAreaDocuments",
    title: "Informações da Área do Consultor",
    description: "Insira os documentos das áreas atuadas pelo consultor",
  },
  {
    id: "consultor",
    title: "Dados do Consultor",
    description: "Insira os dados do Consultor",
  }
);

export default function CreateConsultant() {
  const stepper = useStepper();
  const currentIndex = utils.getIndex(stepper.current.id);
  const {
    cadastrarConsultor,
    Qualificacao,
    permissaoDeCadastroConsultor,
    alterarPermissaoConsultor,
    consultantAreaDocuments,
    removeConsultantAreaDocuments,
    localidadesDoConsultor,
    removerLocalidadesDoConsultor,
    LocalidadesDisponiveis,
    setConsultantNaturezasPorAreas,
    consultantNaturezasPorAreas,
    removeConsultantNaturezasPorAreas,
  } = useEditalStore();

  const areasPreSelecionadas = Qualificacao.map(({ name, areaId }) => ({
    value: name,
    label: name,
    id: areaId,
  }));

  function handleAreasSubmit(areas: MultipleCheckBoxOptions[]) {
    setConsultantNaturezasPorAreas(areas);
  }

  function handleReset() {
    removeConsultantNaturezasPorAreas();
    alterarPermissaoConsultor(false);
    removeConsultantAreaDocuments();
  }

  const form = useForm<IConsultant>({
    resolver: zodResolver(consultantSchema),
    defaultValues: {
      nome: "",
      email: {
        email: "",
        emailConfirmation: "",
      },
      consultantCPF: undefined,
      comprovanteFormacaoAcademica: undefined,
      comprovanteVinculoCNPJ: undefined,
      registroProfissionalClasse: undefined,
      contato: "",
      CPF: "",
      id: "",
      areas: [],
    },
  });

  const consultantCPFRef = useRef<HTMLInputElement | null>(null);
  const comprovanteVinculoCNPJRef = useRef<HTMLInputElement | null>(null);
  const comprovanteFormacaoAcademicaRef = useRef<HTMLInputElement | null>(null);
  const registroProfissionalClasseRef = useRef<HTMLInputElement | null>(null);
  const arquivosTecnicos = useRef<HTMLInputElement | null>(null);

  function resetConsultantForm() {
    if (arquivosTecnicos.current) arquivosTecnicos.current.value = "";
    if (consultantCPFRef.current) consultantCPFRef.current.value = "";
    if (comprovanteVinculoCNPJRef.current)
      comprovanteVinculoCNPJRef.current.value = "";
    if (comprovanteFormacaoAcademicaRef.current)
      comprovanteFormacaoAcademicaRef.current.value = "";
    if (registroProfissionalClasseRef.current)
      registroProfissionalClasseRef.current.value = "";
    form.reset();
    removeConsultantNaturezasPorAreas();
    removeConsultantAreaDocuments();
    alterarPermissaoConsultor(false);
    removerLocalidadesDoConsultor();
    stepper.prev();
  }

  const handleConsultantAreas = useMemo(() => {
    return consultantNaturezasPorAreas.map(({ id, label }) => ({
      id,
      label,
    }));
  }, [consultantNaturezasPorAreas]);

  const ConsultantForm = () => {
    const form = useForm<IConsultant>({
      resolver: zodResolver(consultantSchema),
      defaultValues: {
        localidades: [],
        nome: "",
        email: {
          email: "",
          emailConfirmation: "",
        },
        consultantCPF: undefined,
        comprovanteFormacaoAcademica: undefined,
        comprovanteVinculoCNPJ: undefined,
        registroProfissionalClasse: undefined,
        contato: "",
        CPF: "",
        id: "",
        areas: [],
      },
    });

    const {
      formState: { errors },
    } = form;

    function onSubmit(data: IConsultant) {
      const uniqueId = nanoid();
      const newConsultant = {
        ...data,
        areas: handleConsultantAreas.map((area) => ({
          ...area,
        })),
        id: uniqueId,
        localidades: localidadesDoConsultor.map((localidade, index) => ({
          idSCLocalidade: localidade.idSCLocalidade,
          prioridade: String(index + 1),
        })),
        areaDocuments: consultantAreaDocuments.map((doc) => ({
          areaId: doc.areaId as string,
          files: doc.turnToBase64,
          areaName: doc.areaName as string,
        })),
      };
      console.log(newConsultant);
      // cadastrarConsultor(newConsultant);

      // toast.success("Consultor cadastrado com sucesso!");
      // resetConsultantForm();
    }

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 overflow-auto px-2  h-5/6"
        >
          {LocalidadesDisponiveis.length > 0 && <LocalidadesForm />}
          <div>
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insira o nome do consultor"
                      {...field}
                      className="transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="CPF"
              render={({ field: { onChange, ...props } }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input
                      onChange={(e) => {
                        const { value } = e.target;
                        e.target.value = formatCpf(value) ?? "";
                        onChange(e);
                      }}
                      placeholder="Insira CPF do consultor"
                      {...props}
                      className="transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insira o email do consultor"
                      {...field}
                      className="transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email.emailConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirme o email do consultor"
                      {...field}
                      className="transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contato"
              render={({ field: { onChange, ...props } }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input
                      onChange={(e) => {
                        const { value } = e.target;
                        e.target.value = formatPhone(value) ?? "";
                        onChange(e);
                      }}
                      placeholder="Insira o telefone para contato do consultor"
                      {...props}
                      className="transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator />
          <div>
            <FormField
              control={form.control}
              name="consultantCPF"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col items-center my-4">
                    <FormLabel>
                      Documentos Pessoais (Carteira de Trabalho e/ou CPF){" "}
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      accept="application/pdf, image/jpeg, image/jpg"
                      type="file"
                      ref={consultantCPFRef}
                      className="transition-all"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          field.onChange(e.target.files[0]);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comprovanteVinculoCNPJ"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col items-center my-4">
                    <FormLabel>Comprovante de Vínculo com PJ</FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      type="file"
                      accept="application/pdf, image/jpeg, image/jpg"
                      ref={comprovanteVinculoCNPJRef}
                      className="transition-all"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          field.onChange(e.target.files[0]);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comprovanteFormacaoAcademica"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col items-center my-4">
                    <FormLabel>Comprovante de Formação Acadêmica</FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      accept="application/pdf, image/jpeg, image/jpg"
                      type="file"
                      multiple
                      ref={comprovanteFormacaoAcademicaRef}
                      className="transition-all"
                      onChange={(e) => {
                        if (e.target.files) {
                          const filesArray = Array.from(e.target.files);
                          field.onChange(filesArray);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="registroProfissionalClasse"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col items-center my-4">
                    <FormLabel>
                      Registro Profissional em Órgão de Classe
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      accept="application/pdf, image/jpeg, image/jpg"
                      type="file"
                      ref={registroProfissionalClasseRef}
                      className="transition-all"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          field.onChange(e.target.files[0]);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex place-content-center mt-3">
              <Button
                className="bg-gradient-primary w-96 hover:shadow-lg hover:shadow-gray-500/40 transition-all"
                type="submit"
                disabled={
                  Object.keys(errors).length > 0 ||
                  (localidadesDoConsultor.length === 0 &&
                    LocalidadesDisponiveis.length > 0)
                }
              >
                Cadastrar Consultor
              </Button>
            </div>
          </div>
        </form>
      </Form>
    );
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Passo {currentIndex + 1} de {steps.length}
          </span>
          <div />
        </div>
      </div>
      <nav aria-label="Create Consultant Steps" className="group my-4">
        <ol className="flex items-center justify-evenly gap-2">
          {stepper.all.map((step, index, array) => (
            <React.Fragment key={step.id}>
              <li className="flex items-center gap-4 flex-shrink-0">
                <Button
                  type="button"
                  role="tab"
                  disabled={index > currentIndex}
                  variant={index <= currentIndex ? "default" : "secondary"}
                  aria-current={
                    stepper.current.id === step.id ? "step" : undefined
                  }
                  aria-posinset={index + 1}
                  aria-setsize={steps.length}
                  aria-selected={stepper.current.id === step.id}
                  className="flex size-10 items-center justify-center rounded-full"
                  onClick={() => stepper.goTo(step.id)}
                >
                  {index + 1}
                </Button>
                <span className="text-sm font-medium">{step.title}</span>
              </li>
              {index < array.length - 1 && (
                <Separator
                  className={`flex-1 ${
                    index < currentIndex ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </ol>
      </nav>
      <div className="space-y-4">
        {stepper.switch({
          consultantAreaDocuments: () => (
            <div>
              <CheckboxFormMultiplo
                labelSelecionados="Áreas selecionadas para o seu consultor à cadastrar:"
                opcoes={areasPreSelecionadas}
                onSubmit={handleAreasSubmit}
                onReset={handleReset}
                opcoesSelecionadas={consultantNaturezasPorAreas}
              />
            </div>
          ),
          consultor: () => <ConsultantForm />,
        })}
        {!stepper.isLast ? (
          <div className="flex justify-end gap-4">
            {stepper.isFirst ?? (
              <Button variant="secondary" onClick={stepper.prev}>
                Voltar
              </Button>
            )}
            <Button
              onClick={stepper.next}
              disabled={!permissaoDeCadastroConsultor}
            >
              {stepper.isLast ? "Finalizar" : "Próximo"}
            </Button>
          </div>
        ) : (
          <div className="flex justify-end gap-4">
            <Button variant="secondary" onClick={stepper.reset}>
              Voltar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
