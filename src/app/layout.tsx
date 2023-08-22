import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import WagmiProvider from "./lib/wagmi_provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eeethers",
  description: "An exploration of onchain identity",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <WagmiProvider>{children}</WagmiProvider>
      </body>
    </html>
  );
}
