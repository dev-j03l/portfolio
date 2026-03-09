import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const siteUrl = "https://joeljojan.dev";

export const metadata: Metadata = {
  title: "Joel Mathew Jojan | Portfolio",
  description:
    "Computer Science Student at Trinity College Dublin | Incoming SWE Intern at HubSpot | Control Lead at Formula Trinity",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Joel Mathew Jojan | Portfolio",
    description:
      "Computer Science Student at Trinity College Dublin | Incoming SWE Intern at HubSpot | Control Lead at Formula Trinity",
    url: siteUrl,
    siteName: "Joel Mathew Jojan",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joel Mathew Jojan | Portfolio",
    description:
      "Computer Science Student at Trinity College Dublin | Incoming SWE Intern at HubSpot | Control Lead at Formula Trinity",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrains.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem("archfolio-theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t);})();`,
          }}
        />
      </head>
      <body className="font-mono antialiased min-h-screen">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
