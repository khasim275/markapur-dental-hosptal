import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Markapur Dental | Appointment Enquiry",
  description: "Send an appointment enquiry to Markapur Dental.",
  robots: { index: false, follow: false }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}