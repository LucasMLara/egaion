"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

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

export default function Cadastro() {
  const [formIsSubmitting, setFormIsSubmitting] = useState(false);
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

  async function onSubmit(data: ISignUp) {
    setFormIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setFormIsSubmitting(false);
    toast.success("Cadastro realizado");
    console.log(data);
    router.push("/");
  }

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col w-96">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col"
            >
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNPJ</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="00000000000000"
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
                name="telefone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="27999999999"
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
                  disabled={formIsSubmitting}
                  className="w-full bg-gradient-primary hover:shadow-lg hover:shadow-gray-500/40 transition-all"
                >
                  {formIsSubmitting ? (
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
    </>
  );
}
