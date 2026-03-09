import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Joel Mathew Jojan | Portfolio",
  description:
    "Computer Science Student at Trinity College Dublin | Incoming SWE Intern at HubSpot | Control Lead at Formula Trinity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrains.variable}>
      <body className="font-mono antialiased min-h-screen">{children}</body>
    </html>
  );
}
