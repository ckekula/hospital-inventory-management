import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import DashboardWrapper from "./DashboardWrapper";
import SessionProviderWrapper from "@/utils/sessionProviderWrapper";

export const metadata: Metadata = {
  title: "HIMS",
  description: "Sri Lanka Hospital Inventory Management System",
};

const interFont = localFont({
  src: [
    {
      path: './fonts/inter/Inter-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: './fonts/inter/Inter-ExtraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/inter/Inter-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/inter/Inter-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/inter/Inter-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/inter/Inter-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/inter/Inter-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/inter/Inter-ExtraBold.woff2',
      weight: '800',
      style: 'italic',
    },
    {
      path: './fonts/inter/Inter-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-inter',
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={interFont.variable}>
        <SessionProviderWrapper>
          <DashboardWrapper>{children}</DashboardWrapper>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}