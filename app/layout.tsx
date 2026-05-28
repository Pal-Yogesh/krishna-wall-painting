import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import NavbarFooterWrapper from "@/components/layout/NavbarFooterWrapper";
import { ToastProvider } from "@/context/Toast";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Krishna The Brand Of India",
  description: "Krishna The Brand Of India",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} antialiased`}>
        <ToastProvider>
          <NavbarFooterWrapper>
            {children}
            <div className="fixed  z-40 bottom-4 right-2 md:right-6 flex flex-col gap-4">
              <div className="relative w-14 h-14">
                {/* Ripple Background */}
                <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ripple"></span>

                {/* WhatsApp Button */}
                <span className="absolute inset-0 flex items-center justify-center rounded-full bg-[#25D366] hover:scale-110 duration-300">
                  <Link href="https://wa.me/918588830308">
                    <FaWhatsapp className="text-2xl text-white" />
                  </Link>
                </span>
              </div>
            </div>
          </NavbarFooterWrapper>
        </ToastProvider>
      </body>
    </html>
  );
}
