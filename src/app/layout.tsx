import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Barlow } from "next/font/google";
import "./globals.css";
import Widget from "@/components/widget/widget";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "flowidget",
  description: "A ai widget for your next project",
  icons: {
    icon: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
  keywords: ["flowidget", "ai widget", "ai", "widget", "nextjs", "tailwind", "typescript", "javascript", "html", "css"],
  authors: [{ name: "Jay", url: "https://flowidget.vercel.app" }],
  creator: "Jay",
  publisher: "Jay",
  openGraph: {
    title: "flowidget",
    description: "AI widget for your next project",
  },
  twitter: {
    card: "summary_large_image",
    title: "flowidget",
    description: "AI widget for your next project",
    images: ["/project.jpeg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${barlow.className} min-h-screen flex flex-col`}>
        <Widget attrs={{
          "src": "https://widget-bot-ui.vercel.app/widget.js",
          "user": "8693e0d8-fbd1-4ae2-9c64-f8641fcd7d56",       
          "bubbleSize": "sm",

        }} />
        <main className="">
          {children}
        </main>
       
      </body>
    </html>
  );
}
