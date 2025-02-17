import { Kanit } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/store/Provider";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

const geistSans = Kanit({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistSans.variable} antialiased`}
      >
        <ReduxProvider>
          <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
