"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { forgetPasswordSchema, IForgetPassword } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
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

export default function EsqueciSenha() {
  const [formIsSubmitting, setFormIsSubmitting] = useState(false);
  const form = useForm<IForgetPassword>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: { email: "" },
  });
  const router = useRouter();

  async function onSubmit(data: IForgetPassword) {
    setFormIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setFormIsSubmitting(false);
    toast.success("Email Enviado. Favor verificar");
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Insira seu e-mail..."
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
                  "Solicitar nova senha"
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
