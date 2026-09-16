import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ConsultationProvider } from "@/components/consultation-context";
import { ConsultationModal } from "@/components/consultation-modal";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Astria & Co. — Diverting World Digitally | Digital Agency",
  description:
    "Astria & Co. is a modern digital agency offering web development, graphic design, sales funnels, Meta ads management, video editing, and marketing automation.",
  keywords:
    "digital agency, web development, graphic design, Meta ads, marketing automation, sales funnels, video editing",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`dark ${poppins.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[#080908] text-white">
        <ConsultationProvider>
          {children}
          <ConsultationModal />
        </ConsultationProvider>
      </body>
    </html>
  );
}

