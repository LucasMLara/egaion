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

import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRef } from "react";

import { formatCpf, formatPhone } from "@/lib/formatters";

export default function CreateConsultant() {
  const { cadastrarConsultor, vincularAreaConsultor, activeArea } =
    useEditalStore();

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
      areaId: [],
    },
  });

  const consultantCPFRef = useRef<HTMLInputElement | null>(null);
  const comprovanteVinculoCNPJRef = useRef<HTMLInputElement | null>(null);
  const comprovanteFormacaoAcademicaRef = useRef<HTMLInputElement | null>(null);
  const registroProfissionalClasseRef = useRef<HTMLInputElement | null>(null);
  const arquivosTecnicos = useRef<HTMLInputElement | null>(null);

  function resetConsultantForm() {
    form.reset();
    if (arquivosTecnicos.current) arquivosTecnicos.current.value = "";
    if (consultantCPFRef.current) consultantCPFRef.current.value = "";
    if (comprovanteVinculoCNPJRef.current)
      comprovanteVinculoCNPJRef.current.value = "";
    if (comprovanteFormacaoAcademicaRef.current)
      comprovanteFormacaoAcademicaRef.current.value = "";
    if (registroProfissionalClasseRef.current)
      registroProfissionalClasseRef.current.value = "";
  }

  const {
    formState: { errors },
  } = form;

  function onSubmit(data: IConsultant) {
    const uniqueId = nanoid();

    cadastrarConsultor({ ...data, id: uniqueId });
    vincularAreaConsultor(activeArea, uniqueId);
    toast.success("Consultor cadastrado com sucesso!");

    resetConsultantForm();
  }

  return (
    <div>
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
                  <FormLabel>
                    Registro Profissional em Órgão de Classe
                  </FormLabel>
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
            {/* <FormField
              name="arquivosTecnicos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Arquivos Técnicos</FormLabel>
                  <FormControl>
                    <Input
                      multiple
                      accept="application/pdf, image/jpeg, image/jpg"
                      type="file"
                      ref={arquivosTecnicos}
                      className="transition-all"
                      onChange={(e) => {
                        const filesArray = Array.from(e.target.files || []);
                        field.onChange(filesArray);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <div className="flex place-content-center mt-3">
              <Button
                className="bg-gradient-primary w-96 hover:shadow-lg hover:shadow-gray-500/40 transition-all"
                type="submit"
                disabled={Object.keys(errors).length > 0}
              >
                Cadastrar Consultor
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
