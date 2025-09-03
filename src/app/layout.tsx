import type { Metadata } from "next";
import { ABeeZee } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ToastContainer } from "react-toastify";

const abeeze = ABeeZee({
  variable: "--font-abeeze",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "MeetUsar Dashboard",
  description: "MeetUsar Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${abeeze.className}`}
      >
        <Providers>
          <ToastContainer />
          {children}
        </Providers>
      </body>
    </html>
  );
}
