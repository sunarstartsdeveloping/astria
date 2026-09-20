import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ConsultationProvider } from "@/components/consultation-context";
import { ConsultationModal } from "@/components/consultation-modal";
import { WhatsAppFloatingButton } from "@/components/whatsapp-floating-button";
import { JsonLd } from "@/components/json-ld";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.astria.co.in"),
  title: {
    default: "Astria & Co. — Web Dev & Digital Marketing Agency",
    template: "%s | Astria & Co.",
  },
  description:
    "Astria & Co. is a digital agency in Narnaul & Delhi NCR offering custom web development, Meta ads, marketing automation, and design.",
  keywords: [
    "digital agency Narnaul",
    "web development agency Haryana",
    "Meta ads management Gurugram",
    "marketing automation Delhi NCR",
    "website developer Rewari",
    "graphic design agency",
    "sales funnels",
    "video editing",
  ],
  authors: [{ name: "Astria & Co.", url: "https://www.astria.co.in" }],
  creator: "Astria & Co.",
  publisher: "Astria & Co.",
  alternates: {
    canonical: "https://www.astria.co.in",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.astria.co.in",
    siteName: "Astria & Co.",
    title: "Astria & Co. | Web Development & Digital Marketing Agency",
    description:
      "Premier digital agency in Narnaul & Delhi NCR providing custom web development, Meta ads, marketing automation, and graphic design.",
    images: [
      {
        url: "/logo-mark-green.png",
        width: 512,
        height: 512,
        alt: "Astria & Co. — Diverting World Digitally",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Astria & Co. | Web Development & Digital Marketing Agency",
    description:
      "Premier digital agency in Narnaul & Delhi NCR providing custom web development, Meta ads, marketing automation, and graphic design.",
    images: ["/logo-mark-green.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`dark ${poppins.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[#080908] text-white">
        <JsonLd />
        <ConsultationProvider>
          {children}
          <ConsultationModal />
          <WhatsAppFloatingButton />
        </ConsultationProvider>
      </body>
    </html>
  );
}

