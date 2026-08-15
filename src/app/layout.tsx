import type { Metadata } from "next";
import { Playfair_Display, Poppins, Great_Vibes } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const greatVibes = Great_Vibes({
  variable: "--font-greatvibes",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Shape Up Beauty | Luxury Beauty, Hair, Makeup & Spa",
  description: "Premium Salon & Laser Clinic. Premium unisex salon in Kolhapur offering expert hair styling, makeup, spa, and personalized beauty treatments.",
  openGraph: {
    title: "Shape Up Beauty | Luxury Salon in Kolhapur",
    description: "Premium unisex salon in Kolhapur offering expert hair styling, makeup, spa, and personalized beauty treatments.",
    url: "https://shapeupbeauty.com",
    siteName: "Shape Up Beauty",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

import { SettingsProvider } from "@/components/SettingsProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getSettings } from "@/app/admin/settings/actions";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable} ${greatVibes.variable}`} suppressHydrationWarning>
      <body className="antialiased font-poppins bg-stone-50 dark:bg-neutral-950 text-stone-900 dark:text-stone-100 transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SettingsProvider settings={settings}>
            {children}
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
