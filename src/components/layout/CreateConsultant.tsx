import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { consultantSchema, IConsultant } from "@/types/types";
import { useEditalStore } from "@/store/EditalRegister";
import { nanoid } from "nanoid";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import { useEditalInEdition } from "@/store/useEditalInEdition";

export default function CreateConsultant() {
  const { cadastrarConsultor, editalData } = useEditalStore();
  const { setConsultant, editalInEdition } = useEditalInEdition();

  const form = useForm<IConsultant>({
    resolver: zodResolver(consultantSchema),
    defaultValues: {
      nome: editalInEdition.consultant.nome,
      email: {
        email: editalInEdition.consultant.email,
        emailConfirmation: editalInEdition.consultant.email,
      },
      consultantCPF: undefined,
      comprovanteFormacaoAcademica: undefined,
      comprovanteVinculoCNPJ: undefined,
      registroProfissionalClasse: undefined,
      contato: editalInEdition.consultant.telefone,
      CPF: editalInEdition.consultant.cpf,
      id: nanoid(),
    },
  });

  const consultantCPFRef = useRef<HTMLInputElement | null>(null);
  const comprovanteVinculoCNPJRef = useRef<HTMLInputElement | null>(null);
  const comprovanteFormacaoAcademicaRef = useRef<HTMLInputElement | null>(null);
  const registroProfissionalClasseRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editalInEdition?.consultant) {
      form.setValue("nome", editalInEdition.consultant.nome);
      form.setValue("CPF", editalInEdition.consultant.cpf);
      form.setValue("email.email", editalInEdition.consultant.email);
      form.setValue(
        "email.emailConfirmation",
        editalInEdition.consultant.email
      );
      form.setValue("contato", editalInEdition.consultant.telefone);
    }
  }, [editalInEdition, form]);

  function onSubmit(data: IConsultant) {
    console.log("Dados do consultor na submissao", data);
    cadastrarConsultor(data);
    form.reset();
    if (consultantCPFRef.current) consultantCPFRef.current.value = "";
    if (comprovanteVinculoCNPJRef.current)
      comprovanteVinculoCNPJRef.current.value = "";
    if (comprovanteFormacaoAcademicaRef.current)
      comprovanteFormacaoAcademicaRef.current.value = "";
    if (registroProfissionalClasseRef.current)
      registroProfissionalClasseRef.current.value = "";
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insira CPF do consultor"
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insira o telefone para contato do consultor"
                    {...field}
                    className="transition-all"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="consultantCPF"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Documentos Pessoais (Carteira de Trabalho e/ou CPF){" "}
                </FormLabel>
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
                <FormLabel>Comprovante de Vínculo com PJ</FormLabel>
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
                <FormLabel>Comprovante de Formação Acadêmica</FormLabel>
                <FormControl>
                  <Input
                    accept="application/pdf, image/jpeg, image/jpg"
                    type="file"
                    ref={comprovanteFormacaoAcademicaRef}
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
            name="registroProfissionalClasse"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registro Profissional em Órgão de Classe</FormLabel>
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
          <div className="flex justify-end mt-3">
            <Button
              className="bg-gradient-primary w-96 hover:shadow-lg hover:shadow-gray-500/40 transition-all"
              type="submit"
            >
              Cadastrar Consultor
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
