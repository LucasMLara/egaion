import SebraeLogo from "@/assets/Sebrae.svg";
import Link from "next/link";
import { UserIcon, LogOutIcon } from "lucide-react";
import Shadow from "./Shadow";
import { auth, signOut } from "@/auth";
// import Image from "next/image";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default async function Header() {
  // const session = await auth();
  return (
    <header
      className={`relative w-full h-16 flex justify-between bg-neutral-400 z-50`}
    >
      <div className="h-full w-full flex items-center">
        {/* <Link href="https://sebrae.com.br/sites/PortalSebrae/" target="_blank">
          <SebraeLogo className="size-14 mx-6 hover:scale-110 transition-all" />
        </Link> */}
      </div>
      <div className="h-full w-full flex justify-end items-center">
        {/* <Link href="#">
          <Image
            src={session?.user.image}
            alt={session?.user.name}
            width={20}
            height={20}
          />
          <UserIcon className="mx-3 size-6 hover:scale-110 transition-all hover:stroke-primary-400" />
        </Link> */}
        {/* <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="">
                <UserIcon className="mx-3 size-6 hover:scale-110 transition-all hover:stroke-primary-400" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xl">
                Qual conteúdo iremos acessar ao clicar nesse ícone ? as
                Informações da empresa? Quais dados da empresa podem ser
                exibidos, quais podem ser alterados?
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider> */}
        <form
          className="flex"
          action={async () => {
            "use server";
            await signOut({
              redirectTo: "/",
            });
          }}
        >
          <button type="submit">
            <LogOutIcon className="mx-3 size-6 hover:scale-110 transition-all hover:stroke-primary-400" />
          </button>
        </form>
      </div>
      <Shadow />
    </header>
  );
}
