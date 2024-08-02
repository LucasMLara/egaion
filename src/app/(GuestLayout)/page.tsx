"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import SebraeLogo from "@/assets/Sebrae.svg";
import signIn from "@/services/signIn";
import { useFormState } from "react-dom";
import React from "react";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";
import { signIn as nextAuthSignIn } from "next-auth/react";

export default function Login() {
  const [formState, formAction] = useFormState(signIn, { error: null });
  const [formIsSubmitting, setFormIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (formState.error) {
      toast.error(formState.error.message);
      setFormIsSubmitting(false);
    }
  }, [formState.error]);

  return (
    <div className="mx-auto grid h-screen max-w-[1440px] grid-cols-1 place-content-center bg-primary-200 md:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <form
            action={formAction}
            onSubmit={() => setFormIsSubmitting(true)}
            className="grid gap-4"
          >
            <div className="bg-muted block md:hidden size-auto md:m-auto">
              <SebraeLogo className="h-full w-full object-fill dark:brightness-[0.2] dark:grayscale" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                className="transition-all"
                id="email"
                type="email"
                name="email"
                placeholder="egaion@pentago.com.br"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/esquecisenha"
                  className="ml-auto inline-block text-sm underline"
                >
                  Esqueceu sua senha ?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                required
                placeholder="**********"
                className="transition-all"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-primary hover:shadow-lg hover:shadow-gray-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-auto disabled:shadow-none"
              disabled={formIsSubmitting}
            >
              {formIsSubmitting ? (
                <LoaderIcon className="animate-spin" />
              ) : (
                "Entrar"
              )}
            </Button>
            <Button
              type="button"
              onClick={async () => {
                await nextAuthSignIn("google");
              }}
            >
              Continuar com Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm ">
            Ainda não possui uma conta?
            <Link href="/cadastrar" className="underline mx-3 ">
              Cadastre-se
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted md:flex md:justify-center md:content-center size-full  md:m-auto">
        <SebraeLogo className="h-full xl:w-full object-fill dark:brightness-[0.2] dark:grayscale w-2/3" />
      </div>
    </div>
  );
}
