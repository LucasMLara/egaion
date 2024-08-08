import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import SebraeLogo from "@/assets/Sebrae.svg";

export default function Cadastro() {
  //TODO implementar cadastro E COLOCAR "NAMES" NOS INPUTS
  return (
    <>
      <div className="mx-auto grid h-screen max-w-[1440px] grid-cols-1 place-content-center bg-primary-200 md:grid-cols-2">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-4">
              <div className="bg-muted block md:hidden size-auto md:m-auto">
                <SebraeLogo className="h-full w-full object-fill dark:brightness-[0.2] dark:grayscale" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="razaoSocial">Razão Social</Label>
                <Input
                  className="transition-all"
                  id="razaoSocial"
                  type="razaoSocial"
                  required
                />
              </div>
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
              <div className="grid gap-2">
                <Label htmlFor="emailConfirmation">Confirmar Email</Label>
                <Input
                  className="transition-all"
                  id="emailConfirmation"
                  type="emailConfirmation"
                  placeholder="Insira seu email novamente"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="CNPJ">CNPJ</Label>
                <Input
                  className="transition-all"
                  id="CNPJ"
                  type="CNPJ"
                  required
                  placeholder="00000000/0001-00"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contato">Telefone</Label>
                <Input
                  className="transition-all"
                  id="contato"
                  type="contato"
                  required
                  placeholder="(00)0 00000-0000"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="senha">Senha</Label>
                <Input
                  className="transition-all"
                  id="senha"
                  type="senha"
                  required
                  placeholder="*********"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmaSenha">Confirmar Senha</Label>
                <Input
                  className="transition-all"
                  id="confirmaSenha"
                  type="confirmaSenha"
                  required
                  placeholder="*********"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-primary hover:shadow-lg hover:shadow-gray-500/40 transition-all"
              >
                Cadastrar
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
        <div className="hidden bg-muted md:flex md:justify-center md:content-center size-full  md:m-auto">
          <SebraeLogo className="h-full xl:w-full object-fill dark:brightness-[0.2] dark:grayscale w-2/3" />
        </div>
      </div>
    </>
  );
}
