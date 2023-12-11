import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers/NextUiProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

export const metadata: Metadata = {
  title: "Code Academy Food Delivery",
  description: "Code Academy Food Delivery Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
