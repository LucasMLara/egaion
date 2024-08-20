"use client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoaderIcon } from "lucide-react";
import { PasswordRecoverySchema, IPassWordRecovery } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RecadastrarSenha() {
  const [formIsSubmitting, setFormIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<IPassWordRecovery>({
    resolver: zodResolver(PasswordRecoverySchema),
    defaultValues: { password: { password: "", passwordConfirmation: "" } },
  });

  async function onSubmit(data: IPassWordRecovery) {
    setFormIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setFormIsSubmitting(false);
    toast.success("Senha recadastrada! Por favor, Tente novamente");
    console.log(data);
    router.push("/");
  }
  return (
    <>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-96 gap-6">
          <Form {...form}>
            <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="password.password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Insira sua nova senha"
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
                    <FormLabel>Repita sua senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirme sua senha"
                        {...field}
                        className="transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={formIsSubmitting}
                type="submit"
                className="w-full bg-gradient-primary hover:shadow-lg hover:shadow-gray-500/40 transition-all"
              >
                {formIsSubmitting ? (
                  <LoaderIcon className="animate-spin" />
                ) : (
                  "Recadastrar nova senha"
                )}
              </Button>
              <Link href="/">
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full  hover:shadow-lg hover:shadow-gray-500/40 transition-all"
                >
                  Voltar
                </Button>
              </Link>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
