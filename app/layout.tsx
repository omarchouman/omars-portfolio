import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://omar-chouman.com"),
  title: {
    default: "Omar Chouman — Software Engineer | Systems, Cloud & AI",
    template: "%s | Omar Chouman",
  },
  description:
    "Software engineer focused on building reliable, scalable systems across cloud, AI, and full-stack architecture. Founder of JUSTECH.",
  keywords: [
    "Omar Chouman",
    "software engineer",
    "systems engineer",
    "cloud",
    "AI",
    "microservices",
    "JUSTECH",
    "Laravel",
    "full-stack",
  ],
  authors: [{ name: "Omar Chouman", url: "https://omar-chouman.com" }],
  openGraph: {
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-J6JB0EHFPW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J6JB0EHFPW');
          `}
        </Script>
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
