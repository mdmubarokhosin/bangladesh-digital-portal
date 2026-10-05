import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { AppProviders } from "@/components/app-providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const notoBengali = Noto_Sans_Bengali({
  variable: "--font-noto-bengali",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "বাংলাদেশ জাতীয় ডিজিটাল পোর্টাল | Bangladesh Digital National Portal",
  description:
    "বাংলাদেশের সকল সরকারি তথ্য ও সেবা — এক জায়গায়। Government Information & Services — All in One Place.",
  keywords: [
    "Bangladesh",
    "Government",
    "Digital Bangladesh",
    "সরকারি সেবা",
    "Bangladesh National Portal",
    "e-services",
    "citizen services",
  ],
  authors: [{ name: "Bangladesh Digital National Portal" }],
  openGraph: {
    title: "Bangladesh Digital National Portal — Next Generation",
    description: "Government Information & Services — All in One Place",
    siteName: "Bangladesh Digital National Portal",
    type: "website",
    locale: "bn_BD",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bangladesh Digital National Portal",
    description: "Government Information & Services — All in One Place",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0d5c46" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1410" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoBengali.variable} font-sans antialiased bg-background text-foreground min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AppProviders>{children}</AppProviders>
          <Toaster />
          <SonnerToaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
