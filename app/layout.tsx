import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { WagmiProviders } from "./wagmi-providers";
import MenuBar from "@/components/menu-bar";

const geistSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Drop Your Resume",
  description: "A simple web app to help you store and share your resume quickly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <WagmiProviders>
            <MenuBar />
            {children}
          </WagmiProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
