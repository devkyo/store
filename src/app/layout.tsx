import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import ProductProvider from "@/context/ProductContext";


const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});
const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter", // si quieres usar como variable
});

export const metadata: Metadata = {
    title: "RWS Workshop - Store",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className={inter.variable} suppressHydrationWarning >
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >

                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ProductProvider>
                        {children}

                    </ProductProvider>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
