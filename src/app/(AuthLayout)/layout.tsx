import DrawerMenu from "@/components/layout/DrawerMenu"
import Header from "@/components/layout/Header"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
          <>
            <Header />
            <DrawerMenu />
              {children}
              {/* <footer className="h-24 w-full bg-neutral-800 bottom-0 right-0 absolute ml-24">a</footer> */}
          </>
  )
}