
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link"
import PentagoLogo from '@/assets/Sebrae.svg'


export default function EsqueciSenha() {
  return (
    
    <div className="mx-auto grid h-screen max-w-[1440px] grid-cols-1 place-content-center bg-primary-200 md:grid-cols-2">
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-4">
    <div className="bg-muted block md:hidden size-auto md:m-auto">
      <PentagoLogo className="h-full w-full object-fill dark:brightness-[0.2] dark:grayscale"
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
          <Button type="submit" className="w-full bg-gradient-primary hover:shadow-lg hover:shadow-gray-500/40 transition-all">
            Solicitar Nova senha
          </Button>
          <Link href='/'>
            <Button type="submit"  variant="outline" className="w-full  hover:shadow-lg hover:shadow-gray-500/40 transition-all">
              Voltar
            </Button>
          </Link>
          
        </div>
      </div>
    </div>
    <div className="hidden bg-muted md:flex md:justify-center md:content-center size-full  md:m-auto">
      <PentagoLogo className="h-full xl:w-full object-fill dark:brightness-[0.2] dark:grayscale w-2/3" />
    </div>
  </div>
  )
}
