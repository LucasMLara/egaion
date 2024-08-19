import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { consultantSchema, IConsultant } from "@/types/types";

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

export default function CreateConsultant() {
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
    },
  });

  async function onSubmit(data: IConsultant) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log(data);
  }
  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
            name="email.email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
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
            name="email.emailConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insira o Email do consultor"
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
                    className="transition-all"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        field.onChange(e.target.files[0]);
                        console.log(e);
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
                    className="transition-all"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        field.onChange(e.target.files[0]);
                        console.log(e);
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
                    className="transition-all"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        field.onChange(e.target.files[0]);
                        console.log(e);
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
                    className="transition-all"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        field.onChange(e.target.files[0]);
                        console.log(e);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="bg-gradient-primary w-full hover:shadow-lg hover:shadow-gray-500/40 transition-all"
            type="submit"
          >
            Inserir Consultor
          </Button>
        </form>
      </Form>
    </section>
  );
}
