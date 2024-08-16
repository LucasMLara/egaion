import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function EsqueciSenha() {
  return (
    <>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                className="transition-all"
                id="email"
                type="email"
                placeholder="egaion@pentago.com.br"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-primary hover:shadow-lg hover:shadow-gray-500/40 transition-all"
            >
              Solicitar Nova senha
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
          </div>
        </div>
      </div>
    </>
  );
}
