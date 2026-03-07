import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarFooterWrapper from "@/components/layout/NavbarFooterWrapper";
import { ToastProvider } from "@/context/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastProvider>
          <NavbarFooterWrapper>{children}</NavbarFooterWrapper>
        </ToastProvider>
      </body>
    </html>
  );
}
