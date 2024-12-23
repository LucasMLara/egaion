import type { Metadata } from "next";
import { Ubuntu as FontSans } from "next/font/google";
import "./styles/globals.css";
import { Toaster } from "sonner";

const fontSans = FontSans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Egaion",
  description: "Pentago - Sebrae Editais",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${fontSans.className} bg-primary-200`}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
