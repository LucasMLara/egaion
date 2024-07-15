import type { Metadata } from "next";
import { Ubuntu as FontSans } from "next/font/google"  // Change this line
import "./styles/globals.css";

const fontSans = FontSans({
  weight:["300", "400", "500", "700"],
  subsets: ['latin']
})

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
      <body className={fontSans.className}>{children}</body>
    </html>
  );
}
