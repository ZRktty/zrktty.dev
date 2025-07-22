import type {Metadata} from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider"
import {codersCrux, ibmPLexSans, vinProMono} from "@/app/fonts";


export const metadata: Metadata = {
  title: "Zoltan Rakottyai - Software Engineer & Web Developer",
  description: "Personal website of Zoltan Rakottyai",
};

// ${vinProMono.className} `${ibmPLexSans.variable}

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body
      className={`${ibmPLexSans.variable} ${vinProMono.variable} ${codersCrux.variable} antialiased`}
    >

    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Header/>
      <main className="container mx-auto">
        {children}
      </main>
      <Footer/>
    </ThemeProvider>

    </body>
    </html>
  );
}
