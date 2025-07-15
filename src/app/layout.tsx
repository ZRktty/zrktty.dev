import type {Metadata} from "next";
import {IBM_Plex_Sans, Geist_Mono} from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider"

const ibmPLexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
});



const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zoltan Rakottyai - Software Engineer & Web Developer",
  description: "Personal website of Zoltan Rakottyai",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body
      className={`${ibmPLexSans.variable} ${geistMono.variable} antialiased`}
    >

    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Header/>
      {children}
      <Footer/>
    </ThemeProvider>

    </body>
    </html>
  );
}
