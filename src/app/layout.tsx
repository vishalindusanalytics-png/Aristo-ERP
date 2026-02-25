import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ARISTO | Modern Paper Bag ERP",
  description: "Enterprise Resource Planning for Paper Carry Bag Manufacturing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body>
        <div className="full-viewport">
          <Sidebar />
          <main className="main-content">
            <Header />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
