import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { LoadingProvider } from "../components/LoadingContext";
import { GlobalLoader } from "../components/GlobalLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PsyClinic | Painel",
  description: "Painel para controlar agendas e consultas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <LoadingProvider>
          <GlobalLoader />
          {children}
          <Toaster
            richColors
            position="top-right"
            toastOptions={{
              className: "px-3 py-2",
            }} />
        </LoadingProvider>
      </body>
    </html>
  );
}
