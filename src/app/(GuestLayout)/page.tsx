"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import signIn from "@/services/signIn";
import { useFormState } from "react-dom";
import React from "react";
import { toast } from "sonner";
import { LoaderIcon, EyeIcon, EyeOffIcon } from "lucide-react";

export default function Login() {
  const [formState, formAction] = useFormState(signIn, { error: null });
  const [formIsSubmitting, setFormIsSubmitting] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  React.useEffect(() => {
    if (formState.error) {
      toast.error(formState.error.message);
      setFormIsSubmitting(false);
    }
  }, [formState.error]);

  return (
    <>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <form
            action={formAction}
            onSubmit={() => setFormIsSubmitting(true)}
            className="grid gap-4"
          >
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                autoFocus
                className="transition-all"
                id="email"
                type="text"
                name="email"
                placeholder="egaion@pentago.com.br"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Senha</Label>
                {/* <Link
                  href="/esquecisenha"
                  className="ml-auto inline-block text-sm underline"
                >
                  Esqueceu sua senha?
                </Link> */}
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="**********"
                  className="pr-10 transition-all"
                />
                <Button
                  variant="link"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOffIcon size={18} />
                  ) : (
                    <EyeIcon size={18} />
                  )}
                </Button>
              </div>
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
          </form>
          <div className="mt-4 text-center text-sm ">
            Ainda não possui uma conta?
            <Link href="/cadastrar" className="underline mx-3 ">
              Cadastre-se
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
