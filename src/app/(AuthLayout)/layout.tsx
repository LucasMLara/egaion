import DrawerMenu from "@/components/layout/DrawerMenu";
import Header from "@/components/layout/Header";
import Content from "./content";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-rows-[auto_1fr] h-svh overflow-y-hidden">
      <Header />
      <div className="grid grid-cols-[auto_1fr] h-full overflow-y-hidden">
        <DrawerMenu />
        <Content>{children}</Content>
      </div>
    </div>
  );
}
