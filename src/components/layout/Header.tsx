import SebraeLogo from "@/assets/Sebrae.svg";
import Link from "next/link";
import { UserIcon, LogOutIcon } from "lucide-react";
import Shadow from "./Shadow";
import { signOut } from "@/auth";

export default function Header() {
  return (
    <header
      className={`relative w-full h-16 flex justify-between bg-neutral-400 z-50`}
    >
      <div className="h-full w-full flex items-center">
        <Link href="https://sebrae.com.br/sites/PortalSebrae/" target="_blank">
          <SebraeLogo className="size-14 mx-6 hover:scale-110 transition-all" />
        </Link>
      </div>
      <div className="h-full w-full flex justify-end items-center">
        <Link href="#">
          <UserIcon className="mx-3 size-6 hover:scale-110 transition-all hover:stroke-primary-400" />
        </Link>
        <form
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
