"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import signUp from "@/services/signup";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { ISignUp, SignUpSchema } from "@/types/types";
import { LoaderIcon } from "lucide-react";
import { formatCnpj, formatPhone } from "@/lib/formatters";

export default function Cadastro() {
  const router = useRouter();

  const form = useForm<ISignUp>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      razaoSocial: "",
      email: {
        email: "",
        emailConfirmation: "",
      },
      password: { password: "", passwordConfirmation: "" },
      CNPJ: "",
      telefone: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(data: ISignUp) {
    try {
      await signUp(data);
      toast.success("Cadastro realizado");
      router.push("/");
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col w-96">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <FormField
              control={form.control}
              name="razaoSocial"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Razão Social</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Empresa XYZ LTDA"
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
                      placeholder="usuário@dominio.com"
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
                      placeholder="usuário@dominio.com"
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
              name="CNPJ"
              render={({ field: { onChange, ...props } }) => (
                <FormItem>
                  <FormLabel>CNPJ</FormLabel>
                  <FormControl>
                    <Input
                      onChange={(e) => {
                        const { value } = e.target;
                        e.target.value = formatCnpj(value) ?? "";
                        onChange(e);
                      }}
                      placeholder="12.345.678/0001-90"
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
              name="telefone"
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
                      placeholder="27999999999"
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
              name="password.password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="*************"
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
              name="password.passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="*************"
                      {...field}
                      className="transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-5 gap-3 flex flex-col">
              <Button
                type="submit"
                disabled={
                  isSubmitting || Object.keys(form.formState.errors).length > 0
                }
                className="w-full bg-gradient-primary hover:shadow-lg hover:shadow-gray-500/40 transition-all"
              >
                {isSubmitting ? (
                  <LoaderIcon className="animate-spin" />
                ) : (
                  "Cadastrar"
                )}
              </Button>
              <Link href="/">
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full hover:shadow-lg hover:shadow-gray-500/40 transition-all"
                >
                  Voltar
                </Button>
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
